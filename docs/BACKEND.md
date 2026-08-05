# Pridally — Backend

Living document. Covers the Django app structure, data models, and full
REST API surface. Secrets/keys/auth-hardening are out of scope here (see
`SECURITY.md`); deployment topology is in `ARCHITECTURE.md` §4.

---

## 1. Project layout

```
backend/
├── core/
│   ├── settings.py     # INSTALLED_APPS, DRF, SIMPLE_JWT, CORS, DATABASES
│   ├── urls.py         # ALL routing lives here — no per-app urls.py
│   ├── wsgi.py / asgi.py
├── apps/
│   ├── users/           # CustomUser, UserProfile, auth/onboarding
│   ├── health/          # DailyCheckIn, HealthGoal, HealthMetric
│   └── appointments/    # Doctor, DoctorAppointment, Prescription
```

**Routing convention:** this project registers every ViewSet on one
`DefaultRouter` in `core/urls.py`, rather than each app having its own
`urls.py` + `include()`. Worth knowing before assuming an app's API
doesn't exist just because its own directory has no `urls.py` — check
`core/urls.py`'s router registrations first.

## 2. Auth

- `POST /api/auth/signup/` — `UserSignUpView` (`AllowAny`) — creates a
  `CustomUser` + an empty `UserProfile` in one call.
- `POST /api/auth/token/` — JWT obtain (email + password → access +
  refresh).
- `POST /api/auth/token/refresh/` — exchange refresh token for a new
  access token.
- Every other endpoint below requires `Authorization: Bearer <access>`
  (`IsAuthenticated` is the DRF default, per `settings.py`).

## 3. Full endpoint reference

### `apps.users`

| Endpoint | Method | Notes |
|---|---|---|
| `/api/users/me/` | GET | Current user (detail serializer, includes nested profile) |
| `/api/users/{id}/` | GET/PUT/PATCH | Standard user detail/update (scoped to self — `get_queryset` filters to `request.user`) |
| `/api/users/change_password/` | POST | `old_password` + `new_password` + confirm |
| `/api/users/complete_onboarding/` | POST | Sets `onboarding_completed=True` only — **does not currently accept `health_pathway` in the same call** (see §5) |
| `/api/profiles/me/` | GET/PUT | Get-or-create current user's `UserProfile` (height, weight, blood type, notification prefs, allergies, medications, medical conditions) |

### `apps.health`

| Endpoint | Method | Notes |
|---|---|---|
| `/api/checkins/` | GET/POST | List/create check-ins (scoped to self) |
| `/api/checkins/{id}/` | GET/PUT/PATCH | `responses` is a `JSONField` — this is how the 5 category cards' answers are stored, per `mobile/PROJECT_DOCUMENTATION.md` §7 |
| `/api/checkins/today/` | GET | 404 if no check-in exists yet for today — mobile's `checkinsApi.today()` already relies on this |
| `/api/checkins/weekly/` / `/api/checkins/monthly/` | GET | Last 7 / 30 days — this is what feeds the Calendar tab (§3.9 of `UI_UX_DESIGN.md`) without any new backend work |
| `/api/checkins/stats/` | GET | Mood/energy mode, avg sleep, total exercise minutes over 30 days |
| `/api/goals/`, `/api/goals/active/`, `/api/goals/{id}/update_progress/` | — | Health goals — not yet used by any client, available if needed |
| `/api/metrics/`, `/api/metrics/by_type/` | — | Blood pressure/heart rate/etc. point-in-time readings — not yet used by any client |

### `apps.appointments`

| Endpoint | Method | Notes |
|---|---|---|
| `/api/doctors/` | GET (read-only) | List all doctors — standard `ListModelMixin`, so **paginated** (`PAGE_SIZE=10`, response is `{count, next, previous, results}`), unlike the custom `@action` endpoints below which return plain arrays |
| `/api/doctors/by_specialty/?specialty=` | GET | Filter by specialty |
| `/api/doctors/available/` | GET | Doctors available today (by weekday) |
| `/api/appointments/` | GET/POST | List/create (scoped to self via `get_queryset`) |
| `/api/appointments/{id}/` | GET/PUT/PATCH | |
| `/api/appointments/upcoming/` / `/api/appointments/past/` | GET | Pre-filtered lists — directly matches the Upcoming/Past split in `UI_UX_DESIGN.md` §3.11 |
| `/api/appointments/{id}/cancel/` | POST | |
| `/api/appointments/{id}/reschedule/` | POST | `appointment_date` / `appointment_time` in body |
| `/api/appointments/{id}/complete/` | POST | Sets status + optional `doctor_notes` |
| `/api/appointments/{id}/rate/` | POST | `rating` (1–5) + `review`; also recomputes the doctor's `average_rating` |
| `/api/appointments/stats/` | GET | Total/completed/upcoming/cancelled counts |

**Confirmed already fully built** — nothing here needs new backend code
for the mobile Appointments screen (§3.11). This corrects an earlier
mistaken claim in `UI_UX_DESIGN.md` that the API didn't exist.

## 4. Data model summary

- `apps.users.CustomUser` — email-based auth (`USERNAME_FIELD = 'email'`),
  `health_pathway` (`fitness`/`nutrition`/`mental_health`/`general`),
  `onboarding_completed` boolean — this is exactly what the goal-based
  onboarding screen (`UI_UX_DESIGN.md` §3.6) needs.
- `apps.users.UserProfile` — one-to-one, height/weight/blood type,
  `notification_enabled`, `theme_preference`, allergies/medications/
  medical conditions.
- `apps.health.DailyCheckIn` — one per `(user, check_in_date)` (unique
  together), structured mood/energy/sleep/exercise/water fields plus a
  flexible `responses` JSONField for the 5 health-category questions.
- `apps.appointments.Doctor` — name/specialty/availability/rating.
- `apps.appointments.DoctorAppointment` — type (in-person/video/phone),
  status lifecycle (scheduled → completed/cancelled/rescheduled/no_show),
  optional rating/review, linked `Prescription`s.

## 5. Known gaps (real, found while writing this doc)

- **No `Doctor` seed data.** **Resolved (2026-08-05).** Added
  `apps/appointments/management/commands/seed_doctors.py` — one doctor
  per specialty (8 total), keyed on email via `get_or_create` so it's
  safe to re-run. Wired into `entrypoint.sh` to run automatically after
  `migrate` on every boot, so no manual admin step is needed on Render.
  Verified locally against `backend/db.sqlite3`: first run creates all
  8, second run creates 0 (idempotent, confirmed). **Takes effect in
  production on the next deploy** — this hasn't been pushed/deployed
  yet.
- **`complete_onboarding` doesn't take `health_pathway`.** It only flips
  the boolean. For the one-time onboarding screen (§3.6), the mobile
  client will need two calls — `PATCH /api/users/{id}/` with
  `health_pathway`, then `POST /api/users/complete_onboarding/` — or
  this action could be extended to accept `health_pathway` in the same
  request body. **Resolved (2026-08-04):** the mobile pathway-setup
  screen uses the two-call sequence — no backend change made, to avoid a
  deploy dependency for that screen. Revisit only if partial-failure
  between the two calls becomes a real observed problem.
- `HealthGoal` and `HealthMetric` are fully built but unused by any
  client today — not a gap, just noting they exist if a future feature
  wants goal-tracking or point-in-time vitals.
- **`DailyCheckIn.check_in_date` can't be backfilled — this is a data
  model constraint, not just a missing endpoint.** The field is
  `models.DateField(auto_now_add=True)` and the serializer marks it
  read-only, so every check-in a user creates is always dated "today,"
  no matter what date is sent. There is no way, via the current API, to
  create or edit a check-in for a past date. Found while building the
  mobile Calendar tab (`docs/UI_UX_DESIGN.md` §3.9), which originally
  assumed a missed day could be tapped to retroactively fill it in —
  that's not possible without a model change (e.g. making the field a
  normal editable `DateField` with a default of today, keeping the
  existing `unique_together = ('user', 'check_in_date')` constraint).
- **No password-reset ("forgot password") endpoint exists.** Confirmed
  by grep — nothing named reset/forgot anywhere in `backend/`. Would need
  an email-based reset flow (request-reset endpoint that emails a
  token/link, confirm-reset endpoint that accepts the token + new
  password) — none of that infrastructure (outbound email sending)
  exists yet either. Blocks the "Forgot password?" link in
  `UI_UX_DESIGN.md` §3.4 from being built as anything other than a
  non-functional placeholder, so it was deliberately left out of the
  mobile sign-in screen rather than built to link nowhere.

---

## Changelog

- **2026-08-04** — Initial backend doc: routing convention (centralized
  router in `core/urls.py`, no per-app `urls.py`), auth endpoints, full
  endpoint reference for all three apps, data model summary. Corrected
  an earlier mistaken claim (in `UI_UX_DESIGN.md`) that the appointments
  API didn't exist — it's fully built. Found two real gaps: no `Doctor`
  seed data, and `complete_onboarding` doesn't yet accept
  `health_pathway` in the same call.
- **2026-08-04** — Added a third known gap while building the mobile
  sign-in screen: no password-reset endpoint or outbound-email
  infrastructure exists at all — needed before a real "Forgot password?"
  flow can be built.
- **2026-08-04** — Added a fourth known gap while building the mobile
  Calendar tab: `DailyCheckIn.check_in_date` is `auto_now_add=True` and
  read-only in the serializer, so past days can never be backfilled via
  the API as it stands today — a model change, not just new mobile UI.
- **2026-08-05** — Resolved the `Doctor` seed-data gap: added
  `seed_doctors` management command (8 doctors, one per specialty),
  wired into `entrypoint.sh` to run on every boot. Not yet deployed —
  needs a git push before it reaches production.
