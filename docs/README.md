# Pridally — Documentation Index

Documentation is split by concern into separate living documents, each
updated (with its own Changelog) as that part of the system changes,
rather than one combined document. This keeps security-sensitive material
out of documents that get read/shared for general design/dev purposes.

| Document | Covers | Status |
|---|---|---|
| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | System components, data flow, deployment topology, how web/mobile/backend fit together | Written |
| [`UI_UX_DESIGN.md`](./UI_UX_DESIGN.md) | Design system, screens/flows, visual language | Written, all decisions resolved |
| `FRONTEND.md` | Web (Next.js) app structure and conventions | Not started |
| [`BACKEND.md`](./BACKEND.md) | Django app structure, models, API surface | Written |
| `SECURITY.md` | Secrets, keys, auth hardening, cybersecurity measures | Not started — **never commit actual secret values here or anywhere in the repo**; this doc should describe *practices* (rotation policy, where secrets are stored, threat model) not the secrets themselves |
| [`../mobile/PROJECT_DOCUMENTATION.md`](../mobile/PROJECT_DOCUMENTATION.md) | Mobile (Expo/React Native) app specifics — pre-existing, kept where it already lives | Written |

Each document is a living doc: update the relevant section *and* its
Changelog in the same change that motivated it, not after the fact.
