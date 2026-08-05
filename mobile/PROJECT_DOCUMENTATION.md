# Pridally Mobile — Project Documentation

Living document describing how this app was built, what it's made of, and
how to run/build it. Updated whenever the app changes.

---

## 1. What this is

A mobile client (Android/iOS) for Pridally, built to demo the same product
as the website (`app/`, `src/` at the repo root) on a phone. It's a
deliberately minimal build — enough real, working functionality to show
clients on a device — not a full port of every web feature.

It talks to the **same live Django backend** the website uses
(`https://pridally-backend.onrender.com`). There is no separate mobile
backend or mock data — signup, login, and check-ins are real API calls
against the production database.

## 2. Technology stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Expo (React Native), SDK 54** | Fastest path to a real Android/iOS app from one JS/TS codebase; no need to hand-write native Android/iOS projects. Lets us preview instantly on a phone via Expo Go instead of compiling a full app for every change. SDK 54 is targeted specifically for compatibility with the current Expo Go app. |
| Language | **TypeScript** | Matches the web app's stack; catches API-shape mismatches at compile time. |
| Navigation | **React Navigation** (`@react-navigation/native`, `native-stack`, `bottom-tabs`) | Standard RN navigation library. Auth stack (Login/Signup) when logged out, bottom-tab app (Dashboard/Check-in/Profile) when logged in. |
| Local storage | **@react-native-async-storage/async-storage** | Mobile equivalent of the web app's `localStorage`, used to persist JWT access/refresh tokens between app launches. |
| HTTP | Native `fetch` (no axios) | Same pattern as the web app's `src/lib/api.ts`; kept dependency-free. |
| Backend | **Django REST Framework** (unchanged, existing repo `backend/`) | Reused as-is — same models, same JWT auth (`djangorestframework-simplejwt`), same endpoints the website calls. |
| Date/time picker | **@react-native-community/datetimepicker** (added 2026-08-04) | Native calendar/clock UI for the appointment-booking form (`BookAppointmentScreen.tsx`) — chosen over plain text date/time fields for a better native feel. Adds a config plugin (`app.json`'s `plugins`), so it's the one dependency in this project that isn't purely-JS. |

Through 2026-08-04, no native modules were added. As of the appointment
booking screen, one is: **@react-native-community/datetimepicker**, which
does include real native iOS/Android code — but it ships an Expo config
plugin, so EAS Build still compiles it in during the normal cloud build.
The app is still on Expo's **managed workflow** (no `ios/`/`android/`
project folders checked into the repo) — that only changes if a future
native module has no config plugin at all (see §9's two paths).

### Why React Native (not plain "React"), and why it's a legitimate choice for a healthcare app

**React** (the web library) and **React Native** are different frameworks
that only share a programming model (components, JSX, hooks). React Native
does not render a webview or HTML/CSS — it renders real native Android/iOS
UI widgets, driven by JS logic. This is the same category of tool as
Flutter, not a browser wrapped in an app shell (that older, different
approach is Cordova/PhoneGap-style WebView wrapping).

For a healthcare/health-data app specifically, the UI framework choice
(native Kotlin vs. Flutter vs. React Native) has little bearing on
compliance — what actually matters for handling sensitive health data is
backend-side: encryption in transit/at rest, access controls, audit
logging, and (for US HIPAA scope) a compliant host + signed BAA. Those are
independent of the mobile framework. React Native is used in production by
apps at real scale (Instagram, Discord, Coinbase, several telehealth/
wellness apps), so it's not a "demo-only" technology — the existing
Expo/React Native codebase can carry through to the Play Store production
build without a rewrite.

## 3. Project structure

```
mobile/
├── App.tsx                      # Root: SafeAreaProvider + AuthProvider + Navigation
├── app.json                     # Expo config (app name, android package id, icons)
├── eas.json                     # Cloud build profiles (EAS Build) — "preview" outputs an .apk
├── src/
│   ├── lib/api.ts                # API client: fetch wrapper, JWT storage/refresh, typed endpoints
│   ├── lib/healthMetrics.ts      # Health category → questions config (mirrors web's HealthContext.tsx)
│   ├── lib/streak.ts             # dateKey/computeStreak — shared by Dashboard and Calendar
│   ├── contexts/AuthContext.tsx  # Current user, login/signup/logout, session bootstrap
│   ├── theme/colors.ts           # Palette mirrored from the website's app/globals.css
│   ├── screens/
│   │   ├── AuthLandingScreen.tsx # Brand screen, entry point of the auth
│   │   │                         # stack — "Create Account" / "Sign In"
│   │   ├── LoginScreen.tsx
│   │   ├── SignupScreen.tsx      # 3-step wizard (email → password → name),
│   │   │                         # per docs/UI_UX_DESIGN.md §3.5
│   │   ├── DashboardScreen.tsx   # Today's check-in status + 5 tappable health categories
│   │   ├── CheckInScreen.tsx     # General mood/energy/sleep/exercise/water/notes form,
│   │   │                         # plus a per-category question view when opened from a
│   │   │                         # Dashboard health card (route param `category`)
│   │   ├── ProfileScreen.tsx     # Account info + sign out
│   │   ├── PathwaySetupScreen.tsx # One-time, post-signup: pick a
│   │   │                          # health_pathway; gates Navigation
│   │   │                          # until onboarding_completed is true
│   │   ├── AppointmentsScreen.tsx # Upcoming/past lists, nested (not a
│   │   │                          # tab) — reached from Dashboard/Profile
│   │   ├── BookAppointmentScreen.tsx # Doctor picker, type, date/time,
│   │   │                          # reason/notes → creates an appointment
│   │   ├── CalendarScreen.tsx     # Current-month grid, streak +
│   │   │                          # completion stats, tap-a-day detail
│   │   ├── AssistantScreen.tsx    # "LiLo" — scripted keyword-response
│   │   │                          # chatbot, ported from web's
│   │   │                          # HealthChatbot.tsx (not real AI)
│   │   └── OnboardingCarouselScreen.tsx # First-launch-ever, 3 slides,
│   │                              # skippable; shown once (AsyncStorage flag)
│   └── Navigation.tsx            # Onboarding carousel gate → auth stack
│                                  # → pathway setup → main tab navigator
```

`src/lib/api.ts` is a direct port of the website's `src/lib/api.ts`
(`../../src/lib/api.ts` at repo root), swapping `localStorage` for
`AsyncStorage` since React Native has no browser storage.

## 4. What "Expo Go" is (and why it matters here)

**Expo Go** is a free app (on the iOS App Store / Google Play) that can
load and run an Expo project instantly, straight from source — no
compiling, no App Store review, no cable required. You run `npm start` on
a laptop, it prints a QR code, and scanning that QR code on a phone with
Expo Go installed opens the actual running app in seconds.

This is the fastest way to demo the app to a client: no APK to send, no
install step beyond having Expo Go already on their phone, and any code
change on the laptop shows up on the phone almost immediately (hot
reload).

The trade-off: Expo Go is a *shared* runtime app, not the client's own
branded app — the phone's home screen will show "Expo Go", and the app
only runs while Expo Go has it loaded. For something the client can
install permanently under its own name/icon, you need an actual **.apk**
(see below), which is a real standalone Android app.

## 5. How to run it

### Live demo via Expo Go (no build step)
```bash
cd mobile
npm install   # first time only
npm start
```
Scan the QR code with Expo Go. Requires the phone and laptop on the same
network (or use Expo's tunnel mode if not).

### Producing an installable .apk
Local building isn't possible in this environment (no Java/Android SDK
installed), so APKs are produced via **EAS Build**, Expo's cloud build
service:
```bash
cd mobile
npx eas-cli login                           # one-time, your Expo account
npx eas-cli build --platform android --profile preview
```
The `preview` profile in `eas.json` is configured with
`"buildType": "apk"` so it produces a directly-installable `.apk` (rather
than the Play-Store-only `.aab` format).

What actually happens when you run that command:
1. **Project linking (one-time).** The first build links this local repo
   to a project on Expo's servers under the `pridally` account
   (`eas init`), writing an `extra.eas.projectId` into `app.json`. All
   future builds for this app reuse that same project.
2. **Upload.** The CLI zips up the project source (~400 MB, mostly
   `node_modules`) and uploads it to EAS Build.
3. **Cloud compile.** Expo's servers run the actual Android build
   (generating a signing keystore automatically the first time, since no
   `keytool`/Android SDK is installed locally) and produce a signed
   `.apk`. Takes roughly 10–15 minutes end-to-end; you can watch progress
   at `https://expo.dev/accounts/pridally/projects/pridally-mobile`.
4. **Output.** The CLI prints an install page URL with a QR code (e.g.
   `https://expo.dev/accounts/pridally/projects/pridally-mobile/builds/<build-id>`)
   plus a direct `.apk` download link
   (`https://expo.dev/artifacts/eas/<hash>.apk`). Either link can be sent
   to anyone — no Expo Go, no dev server, no laptop needed on their end.

**Installing it (recipient's side):** since this isn't distributed via
Google Play, Android shows an "unknown source" warning. The recipient
taps through it (Settings → allow install from this source) the first
time, same as any sideloaded APK — this is expected, not a sign of a
broken build.

**Expiry:** each build's artifact download link is only valid for a
limited time from creation (`expirationDate` in `eas build:list`
output — 14 days on this project's plan); after that the link 404s and a
fresh `eas build` is needed to get a new one. Re-running the build
command is the only way to refresh it — there's no way to "extend" an
existing build's link.

Check on any build (including ones started earlier) without opening the
dashboard:
```bash
npx eas-cli build:list --platform android --limit 1 --json --non-interactive
```
`status` will be `IN_PROGRESS`, `FINISHED`, or `ERRORED`; on `FINISHED`,
`artifacts.applicationArchiveUrl` is the direct `.apk` link.

## 6. Backend integration

- Base URL is hardcoded to the production backend in `src/lib/api.ts`
  (`https://pridally-backend.onrender.com`) — same instance the deployed
  website uses.
- Auth: JWT access/refresh tokens (`djangorestframework-simplejwt`),
  stored in `AsyncStorage`, auto-refreshed on a 401 the same way the web
  client does.
- Endpoints used: `/api/auth/signup/`, `/api/auth/token/`,
  `/api/auth/token/refresh/`, `/api/users/me/`, `/api/checkins/*`.
- The backend is on Render's free tier, so the first request after a
  period of inactivity can take 30–50 seconds (cold start) — worth
  mentioning before a client demo so a slow first load isn't mistaken for
  a bug. **Decision (2026-08-04): staying on the free tier for now**;
  revisit upgrading to a paid Render tier (removes cold starts, ~$7+/mo)
  before public launch when there's real user traffic to justify it.

### Communication patterns: what's used now vs. what future features need

The app only needs plain REST today (request → JSON response), which is
what `src/lib/api.ts` does. Other patterns exist for different needs, and
the current Django backend can support all of them without new
infrastructure:

| Need | Pattern | How the existing backend would support it |
|---|---|---|
| Auth, check-ins, dashboard, appointments | REST over HTTP | Already built (DRF) |
| Chatbot (server-initiated pushes, e.g. streaming/typing indicators) | WebSockets | **Django Channels** — added to the same Django project, not a new service |
| Check-in reminder notifications | Push notifications (FCM) | A Python FCM client (e.g. `pyfcm`) called from existing Django views; separate from REST, one-way, wakes the app even when closed |
| Polling (fallback, not usually needed) | Repeated REST calls on a timer | No change needed — just calling existing endpoints periodically |

No GraphQL or gRPC needed — the data shape doesn't call for it.

## 7. Health categories (Dashboard cards)

The 5 cards on the Dashboard (Mental / Sexual / Reproductive / Physical /
Social Health) are tappable and functional, mirroring the web app's
`HealthContext.tsx` + `DailyCheckIn.tsx` feature:

- `src/lib/healthMetrics.ts` holds the same category → questions config as
  web (same question ids, so answers are readable by either client).
  Each category has 2–3 questions of type `scale` (rendered as a row of
  numeric chips), `boolean` (Yes/No chips), or `text` (multiline input).
- Tapping a card (`DashboardScreen.tsx`) navigates to the `CheckIn` tab
  with a `category` route param (the metric id, e.g. `sexual_health`).
- `CheckInScreen.tsx` detects that param and swaps to a category-specific
  view instead of the general mood/energy/sleep form; answers are saved
  as key/value pairs into `DailyCheckIn.responses` (a `JSONField` on the
  backend, `backend/apps/health/models.py`) via the new
  `checkinsApi.upsertTodayResponses()` (`src/lib/api.ts`), which merges
  into today's check-in the same way the web client does — no new
  backend endpoints were needed.
- Each card shows a live completion percentage (answered / total
  questions for that category, computed client-side from today's
  `responses`), same idea as web's per-section progress bar.

## 8. Known gaps vs. the website

- No doctor/appointment scheduling screen (backend supports it —
  `backend/apps/appointments/` — just not wired up on mobile yet)
- No health calendar / weekly stats view
- No chatbot
- No onboarding flow (health pathway selection)

**Decision (2026-08-04): the Play Store launch target is full feature
parity with the website** — these four gaps are to be closed before public
launch, not shipped as fast-follow updates. Backend support already exists
for appointments; calendar/stats, chatbot, and onboarding are additive
mobile work on top of the current structure.

## 9. Future: adding native sensor integration (Health Connect / HealthKit / wearables)

Not needed today (all health data is self-reported via check-in forms),
but if step count, heart rate, or wearable data is added later, the app
does **not** need to change frameworks. Two paths, depending on the
specific library:

1. **Library has an Expo config plugin (the common case):**
   `npx expo install <library>`, add it to `app.json`'s `plugins` array,
   and EAS Build compiles the native code in during the cloud build — no
   Android Studio/Xcode needed locally, no change to existing screens.
   Applies to most Health Connect (Android) / HealthKit (iOS) libraries.
2. **No plugin exists yet (rarer):** run `npx expo prebuild` to generate
   real `android/`/`ios/` folders (moves from "managed" to "bare"
   workflow), then hand-wire the native module or write a small custom
   config plugin. All existing JS/TS code, screens, and backend
   integration carry over unchanged — only that one sensor's native
   bridging is affected.

Some wearables (Fitbit, Oura, Whoop) don't need on-device native code at
all — they sync to the vendor's cloud, and the app just calls their REST
API the same way it calls the Django backend today.

## 10. Roadmap to Play Store production (gaps beyond app code)

Building a real installable native app (what EAS Build already produces,
see section 5) does **not** require a Play Store account — that's only
needed for public distribution. Before that distribution step, still
outstanding:

- **Google Play Developer account** ($25 one-time) — needs to be created
  by the account/business owner directly at
  play.google.com/console; cannot be created on someone else's behalf.
- **Privacy Policy URL** — mandatory for any Play Store app, and Pridally
  is in the health category so it also needs the **Data Safety** section
  filled out (what health data is collected, how it's stored/shared). No
  privacy policy page exists on the site yet as of 2026-08-04.
- **Account deletion support** — Play Store policy requires apps with
  account creation to offer in-app account deletion, not just sign-out.
- **Production build format** — Play Store requires a signed `.aab`
  (Android App Bundle), not the `.apk` the `preview` EAS profile
  currently produces. Needs the `production` profile in `eas.json`
  (already present) with a real keystore that's backed up and controlled
  long-term, not treated as disposable like the preview build's
  auto-generated one.
- **Backend hosting** — see the Render free-tier decision in section 6;
  revisit before public launch.

---

## Changelog

- **2026-08-04** — Initial build: auth (signup/login/logout), dashboard,
  daily check-in form, profile screen. Expo SDK 57, React Navigation,
  AsyncStorage-backed JWT auth against the live Django backend. EAS build
  profile added for APK output.
- **2026-08-04** — Downgraded from Expo SDK 57 to **SDK 54** for
  compatibility with the currently published Expo Go app (`expo@54.0.36`,
  `react-native@0.81.5`, `react@19.1.0`, plus matching peer versions of
  `react-native-screens`, `react-native-safe-area-context`, and
  `expo-status-bar`). Verified with `expo-doctor` (18/18 checks pass).
- **2026-08-04** — Linked the app to a real EAS project
  (`@pridally/pridally-mobile`, id `fee014b6-84e5-4e17-a912-eb942d1ae861`)
  and ran the first cloud build via the `preview` profile, producing a
  shareable, sideloadable `.apk` for demoing to people who can't run the
  dev environment themselves. Documented the full build → share → install
  flow, including the 14-day artifact link expiry, in section 5.
- **2026-08-04** — Made the Dashboard's 5 health category cards
  functional: added `src/lib/healthMetrics.ts` (ported from web's
  `HealthContext.tsx`), made the cards tappable with a live completion %,
  and extended `CheckInScreen.tsx` + `checkinsApi` (new
  `upsertTodayResponses`) to collect and save per-category answers into
  `DailyCheckIn.responses` — no backend changes required. See section 7.
- **2026-08-04** — Replaced all placeholder Expo branding assets
  (`icon.png`, `splash-icon.png`, `android-icon-foreground.png`,
  `android-icon-background.png`, `android-icon-monochrome.png`,
  `favicon.png`) with the Pridally caterpillar mascot
  (`public/lilo_image.png` at the repo root), generated at the correct
  size/format for each (square icon on white, transparent adaptive-icon
  foreground within the safe zone, solid `#7C3AED` adaptive background,
  black silhouette for the Android 13+ monochrome icon). Verified with
  `expo-doctor` (18/18 checks pass). Removed from "Known gaps" in
  section 8.
- **2026-08-04** — Documented (no code change) the rationale for staying
  on React Native/Expo for a healthcare app, the future path for native
  sensor integration (Expo config plugins vs. `prebuild`), the
  communication patterns available beyond REST (WebSockets via Django
  Channels for a future chatbot, FCM push for reminders) and that the
  existing Django backend covers all of them without new infra, and a
  Play Store production roadmap (Play Developer account, privacy policy +
  Data Safety disclosure, account deletion, signed `.aab`, backend
  hosting). Decisions recorded: full feature parity with the website is
  the launch target (closes section 8's gaps before public launch, not
  after), and the backend stays on Render's free tier for now, to be
  revisited before public launch.
- **2026-08-04** — Rebuilt `SignupScreen.tsx` as a 3-step progressive
  wizard (email → password/confirm with live checklist validation →
  first/last name), replacing the old single-scroll form, per the
  decided design in `docs/UI_UX_DESIGN.md` §3.5. Added: step-dot
  progress indicator, back-chevron that steps back (or exits to Login
  from step 1), keyboard "next" chaining between fields, password
  show/hide toggle, and routing of backend field errors (email taken →
  back to step 1; password error → back to step 2) instead of a single
  generic error banner. `AuthContext.signup()` / `authApi.signup()` are
  unchanged — same payload shape, only the UI collecting it changed.
  Verified with `tsc --noEmit` (no errors) and `expo-doctor`
  (18/18 checks pass).
- **2026-08-04** — Built `AuthLandingScreen.tsx` per
  `docs/UI_UX_DESIGN.md` §3.3: brand mark (`assets/icon.png`) + tagline,
  "Create Account" (primary) and "Sign In" (secondary) buttons. Made it
  the auth stack's `initialRouteName` in `Navigation.tsx` (was `Login`).
  Changed `LoginScreen.tsx` and `SignupScreen.tsx`'s back-chevron
  (step 1) to call `navigation.goBack()` instead of hardcoding a target
  screen, so back always returns to whichever screen actually preceded
  it in the stack (Auth Landing normally, or the other auth screen if
  reached via a cross-link). This unblocks the back-chevron that was
  deliberately deferred when Login/Signup were built. Verified with
  `tsc --noEmit` (no errors) and `expo-doctor` (18/18 checks pass).
- **2026-08-04** — Redesigned `LoginScreen.tsx` per
  `docs/UI_UX_DESIGN.md` §3.4: password show/hide toggle, keyboard
  "next" chaining from email to password, disabled-state submit button.
  Deliberately left out two things the design doc describes: a
  back-chevron (nothing to go back to yet — Login is still the auth
  stack's initial screen until the Auth Landing screen from §3.3 gets
  built) and a "Forgot password?" link (no backend password-reset
  endpoint exists at all — see `docs/BACKEND.md` §5 — so it would've
  linked nowhere). `AuthContext.login()` / `authApi.login()` unchanged.
  Verified with `tsc --noEmit` (no errors) and `expo-doctor`
  (18/18 checks pass).
- **2026-08-04** — Built `PathwaySetupScreen.tsx` per
  `docs/UI_UX_DESIGN.md` §3.6: single-choice screen (fitness / nutrition
  / mental_health / general), matching the backend's `health_pathway`
  field exactly. Added `usersApi.updateHealthPathway()` and
  `usersApi.completeOnboarding()` to `src/lib/api.ts`. Wired it into
  `Navigation.tsx` as a gate between the auth stack and the main tabs:
  `!user` → auth stack, `user && !user.onboarding_completed` → this
  screen, else → main tabs — so every new signup lands here exactly
  once, automatically, with no new navigation route needed (it re-renders
  into the main tabs the moment `refreshUser()` picks up
  `onboarding_completed: true`). **Implementation choice:** used the
  existing two-call sequence (`PATCH health_pathway` then
  `POST complete_onboarding`) rather than extending the backend action to
  take both in one call (the alternative noted in `docs/BACKEND.md` §5) —
  avoids a backend deploy dependency for this screen; worth revisiting if
  partial-failure between the two calls ever becomes a real issue.
  Verified with `tsc --noEmit` (no errors) and `expo-doctor`
  (18/18 checks pass).
- **2026-08-04** — Redesigned `DashboardScreen.tsx` per
  `docs/UI_UX_DESIGN.md` §3.7: header now shows a tappable avatar
  (initial-letter circle → navigates to the Profile tab), a streak card
  (🔥 N-day streak, computed client-side from `checkinsApi.monthly()` by
  walking back from today while a check-in exists for each date — hidden
  entirely at 0 to avoid a discouraging "🔥 0-day streak"), and an
  upcoming-appointment teaser card fed by a new
  `appointmentsApi.upcoming()` (real data, the endpoint already existed
  server-side per `docs/BACKEND.md`). Also added `checkinsApi.monthly()`
  to `src/lib/api.ts` (the backend endpoint existed, the mobile client
  just hadn't wrapped it yet). Kept the existing flat progress bars for
  the 5 category cards rather than circular rings from the mockup — that
  would need a new `react-native-svg` dependency, and the call was to
  skip it for now. The appointment card is **not tappable yet** — its
  destination screen (§3.11) isn't built — and there's no bell/
  notifications icon — no push-notification infrastructure or
  notification center exists to open. Verified with `tsc --noEmit`
  (no errors) and `expo-doctor` (18/18 checks pass).
- **2026-08-04** — Built the Appointments screen (§3.11): `AppointmentsScreen.tsx`
  (Upcoming/Past lists via the existing `appointmentsApi.upcoming()` /
  new `appointmentsApi.past()`) and `BookAppointmentScreen.tsx` (doctor
  picker, appointment-type chips, date/time via a newly-added
  `@react-native-community/datetimepicker`, reason/notes → new
  `appointmentsApi.create()`). Also added `doctorsApi.list()` — note it
  unwraps DRF's default pagination envelope (`{results: [...]}`) since
  `/api/doctors/` is a standard `ListModelMixin` list, unlike the custom
  `@action`-based endpoints elsewhere that return plain arrays; only the
  first page (10 doctors) is fetched, fine while the roster is small.
  Restructured `Navigation.tsx`: the signed-in area is now a
  `RootStack` (`MainTabs` | `Appointments` | `BookAppointment`) wrapping
  the tab navigator, so Appointments/BookAppointment are reachable from
  any tab via `navigation.navigate(...)` (React Navigation bubbles
  unresolved route names up to parent navigators) without being tabs
  themselves. Wired up: the Dashboard's upcoming-appointment card is now
  tappable (was deferred when the dashboard was built), and Profile got
  a new "Appointments" link row. **Not yet verified in Expo Go** — the
  date/time picker is the project's first dependency with real native
  code (via a config plugin); if it doesn't render in Expo Go, a fresh
  EAS/dev-client build will be needed to test it, not just `npm start`.
  Verified with `tsc --noEmit` (no errors) and `expo-doctor`
  (18/18 checks pass).
- **2026-08-04** — Added `CalendarScreen.tsx` as a new tab (Dashboard |
  Check-in | **Calendar** | Profile) per `docs/UI_UX_DESIGN.md` §3.9:
  current-month grid (✓ checked-in / ✗ missed / today ring), a streak +
  this-month completion-rate stat row, and a tap-a-day detail panel
  (real answers, "no check-in recorded," or a "Start today's check-in"
  button, depending on the day). **Scope correction found while
  building:** the original design assumed tapping a missed day could
  retroactively fill it in — not possible, since
  `DailyCheckIn.check_in_date` is `auto_now_add=True` and read-only
  server-side (new gap, `docs/BACKEND.md` §5). Also scoped to the
  current month only, no prev/next — the backend has no arbitrary-month
  query (`monthly()` covers the last 30 days, which is enough for "this
  month" but nothing further back). Refactored `categoryProgress` into
  `healthMetrics.ts` and `dateKey`/`computeStreak` into a new
  `src/lib/streak.ts`, removing the duplicate copies that had been
  local to `DashboardScreen.tsx`, so Calendar reuses the same logic.
  Verified with `tsc --noEmit` (no errors) and `expo-doctor`
  (18/18 checks pass).
- **2026-08-04** — Added `AssistantScreen.tsx` as a new tab (Dashboard |
  Check-in | Calendar | **Assistant** | Profile) per
  `docs/UI_UX_DESIGN.md` §3.10's decision to ship scripted, not
  LLM-backed. "LiLo" (named after the site's caterpillar mascot) is a
  straight port of the web's `HealthChatbot.tsx` keyword-matching
  branches (sleep/stress/exercise/nutrition/progress/motivation/tips),
  adapted to mobile's real data instead of web's local mock: the
  "analyze my progress" branch now reports actual last-7-day check-in
  count from `checkinsApi.monthly()` and today's status from
  `checkinsApi.today()`, rather than a fabricated stat. No backend
  changes, no conversation persistence (matches web — refreshing loses
  history, same limitation, not a regression). Chat message bubbles,
  suggestion chips that fill the input on tap (not auto-send, matching
  web), and a simulated "typing…" delay before the bot reply.
  Verified with `tsc --noEmit` (no errors) and `expo-doctor`
  (18/18 checks pass).
- **2026-08-04** — Added `OnboardingCarouselScreen.tsx` per
  `docs/UI_UX_DESIGN.md` §3.2: 3 swipeable slides (what Pridally does,
  privacy reassurance, the 5 health categories), a top-right "Skip"
  visible at every slide, and a dot indicator. Uses plain RN
  `ScrollView` with `pagingEnabled` for the swipe paging — no new
  dependency needed. Gated in `Navigation.tsx` ahead of the existing
  auth/onboarding/main-tabs chain via a device-local AsyncStorage flag
  (`pridally_has_seen_onboarding_carousel`) checked once at boot,
  alongside the existing auth-loading check — shown once ever per
  device install, independent of login state (logging out does not
  re-show it). This completes every screen in `docs/UI_UX_DESIGN.md`
  §3.2–§3.12. Verified with `tsc --noEmit` (no errors) and
  `expo-doctor` (18/18 checks pass).
- **2026-08-05** — Expanded `DashboardScreen.tsx` with more of the data
  already being collected, beyond what §3.7 originally scoped: today's
  check-in card now also shows sleep/exercise/water when set (previously
  only mood/energy), and a new "Last 30 days" section shows check-in
  count, average mood, average energy, average sleep, and total exercise
  minutes. All from `checkinsApi.stats()` — the backend endpoint
  (`/api/checkins/stats/`) already existed and was simply unused by any
  client until now; no backend changes. Updated `checkinsApi.stats()` in
  `src/lib/api.ts` to catch the endpoint's 404 (no check-ins in the last
  30 days) and return `null`, same pattern as `checkinsApi.today()` —
  the section hides itself entirely rather than showing an error or a
  broken empty state for brand-new accounts. Verified with
  `tsc --noEmit` (no errors) and `expo-doctor` (18/18 checks pass).
