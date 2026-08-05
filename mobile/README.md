# Pridally Mobile (demo build)

A minimal React Native (Expo) client for the same Django backend the website
uses (`https://pridally-backend.onrender.com`). Built for showing clients a
working mobile app, not a full feature-parity port.

## What it does

- Sign up / sign in (real JWT auth against the live backend)
- Dashboard with today's check-in status and the five health categories
- Daily check-in form (mood, energy, sleep, exercise, water, notes) that
  reads/writes the same `DailyCheckIn` records the website uses
- Profile screen with account info and sign out

## Run it instantly (no APK needed, best for a live demo)

```bash
cd mobile
npm install   # already done
npm start
```

Scan the QR code with the **Expo Go** app (iOS App Store / Google Play) on
your phone. The app talks to the live backend, so signup/login and
check-ins are real.

## Build an installable Android APK

This sandbox has no Java/Android SDK, and producing a signed APK requires
either a full local Android toolchain or Expo's cloud build service
(EAS Build), which needs a (free) Expo account login — something only you
can do interactively. From your own machine:

```bash
cd mobile
npm install -g eas-cli
eas login                                   # one-time, opens a browser
eas build --platform android --profile preview
```

That builds in Expo's cloud (~10-15 min) and gives you a download link for
a `.apk` you can send straight to a client's phone — no Play Store needed.
The `preview` profile in `eas.json` is already configured to output an APK
instead of an `.aab`.

## Notes

- Points at the same production backend as the website
  (`src/lib/api.ts`) — no separate backend setup needed.
- `app.json` sets `android.package` to `com.pridally.mobile`; change it if
  you want a different app ID before building.
