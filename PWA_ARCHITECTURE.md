# DocVault PWA Architecture

## Icon & Logo Flow

```
Source: DocVault Logo.ico
         ↓
    ┌────────────────────────────────────┐
    │     Icon Generation Script         │
    │   (scripts/generate-icons.js)      │
    └────────────────────────────────────┘
         ↓
    ┌────────────────────────────────────────────────────┐
    │            Generated Assets                        │
    ├────────────────────────────────────────────────────┤
    │                                                    │
    │  favicon.ico              ← Browser Tab           │
    │  │                                                 │
    │  ├─ apple-icon.png        ← iOS Home Screen      │
    │  │                           (180×180)            │
    │  │                                                 │
    │  ├─ icon-192x192.png      ← Android Home         │
    │  │                           (192×192)            │
    │  │                                                 │
    │  ├─ icon-512x512.png      ← Android Splash       │
    │  │                           (512×512)            │
    │  │                                                 │
    │  ├─ icon-192x192-maskable ← Adaptive Icon        │
    │  │                                                 │
    │  └─ icon-512x512-maskable ← Adaptive Icon        │
    │                                                    │
    └────────────────────────────────────────────────────┘
         ↓
    Configuration Files
         ↓
    ┌────────────────────────────────────┐
    │     manifest.json                  │
    │  (App metadata & icons list)       │
    └────────────────────────────────────┘
         ↓
    ┌────────────────────────────────────┐
    │     app/layout.tsx                 │
    │  (Metadata, viewport, PWA tags)    │
    └────────────────────────────────────┘
         ↓
    ┌────────────────────────────────────┐
    │     next.config.mjs                │
    │  (next-pwa configuration)          │
    └────────────────────────────────────┘
         ↓
    ┌────────────────────────────────────────────────────┐
    │              PWA Output                            │
    ├────────────────────────────────────────────────────┤
    │  • Installable app on home screen                 │
    │  • Same logo across all platforms                 │
    │  • Offline functionality via Service Worker       │
    │  • Native app experience                          │
    │  • Browser tab with favicon                       │
    │  • iOS: Home screen with apple icon              │
    │  • Android: Adaptive icons                        │
    └────────────────────────────────────────────────────┘
```

## Platform-Specific Display

```
┌──────────────────────────────────────────────────────────────┐
│                   SAME LOGO EVERYWHERE                       │
└──────────────────────────────────────────────────────────────┘

Browser Tab:
┌─────────────────────────────────────────┐
│ 🔒 favicon.ico  docvault.app           │
└─────────────────────────────────────────┘
       ↑
    favicon.ico (32×32)

iOS Home Screen:
┌───────────────────────────────────┐
│   ┌─────────────┐                 │
│   │  📦 Logo    │  DocVault       │
│   └─────────────┘                 │
└───────────────────────────────────┘
       ↑
    apple-icon.png (180×180)

Android Home Screen:
┌────────────────────────────────┐
│   ┌─────────────┐              │
│   │  📦 Logo    │              │
│   └─────────────┘              │
│    DocVault                     │
└────────────────────────────────┘
       ↑
    icon-192x192.png

Android Splash Screen:
┌────────────────────────────────┐
│                                │
│        ┌──────────────┐       │
│        │   📦 Logo    │       │
│        └──────────────┘       │
│        DocVault               │
│                                │
└────────────────────────────────┘
       ↑
    icon-512x512.png
    (shown during app launch)

All Adaptive Icons:
┌────────────────────────────────┐
│        ┌──────────┐            │
│        │ 📦 Logo  │            │
│        └──────────┘            │
│   (Adaptive background)        │
└────────────────────────────────┘
       ↑
    *-maskable.png versions
    (Android 5.0+)
```

## File Structure

```
DocVault/
├── public/
│   ├── favicon.ico                    # Browser tab icon
│   ├── apple-icon.png                 # iOS (180×180)
│   ├── icon-192x192.png               # Android home screen
│   ├── icon-512x512.png               # Android splash screen
│   ├── icon-192x192-maskable.png      # Android adaptive icon
│   ├── icon-512x512-maskable.png      # Android adaptive icon
│   ├── manifest.json                  # PWA manifest
│   ├── sw.js                          # Service worker
│   └── images/
│       └── DocVault Logo.ico          # Source icon (original)
│
├── app/
│   ├── layout.tsx                     # PWA metadata + viewport
│   └── globals.css
│
├── scripts/
│   └── generate-icons.js              # Icon generation script
│
├── next.config.mjs                    # PWA configuration
├── package.json                       # Dependencies + scripts
│
└── Documentation/
    ├── PWA_IMPLEMENTATION_COMPLETE.md
    ├── PWA_SETUP.md
    ├── PWA_QUICK_START.md
    └── PWA_ICON_SETUP.md
```

## Service Worker Flow

```
User Visit
    ↓
Browser checks Service Worker registration
    ↓
sw.js registers (if not already)
    ↓
┌──────────────────────────────────┐
│   Service Worker Active          │
├──────────────────────────────────┤
│                                  │
│  Installation Event              │
│  └─ Cache static assets          │
│                                  │
│  Fetch Event                     │
│  └─ Serve from cache             │
│  └─ If offline, serve cached     │
│                                  │
│  Activation Event                │
│  └─ Clean old caches             │
│                                  │
└──────────────────────────────────┘
    ↓
App runs offline if available
```

## Manifest.json Configuration

```json
{
  "name": "DocVault - AI Document Fraud Detection",
  "short_name": "DocVault",
  "icons": [
    // This is why all icons use the same DocVault Logo
    // - icon-192x192.png
    // - icon-512x512.png
    // - icon-192x192-maskable.png
    // - icon-512x512-maskable.png
  ],
  "display": "standalone",      // Full-screen app
  "start_url": "/",             // Opens at homepage
  "scope": "/",                 // Entire app is PWA scope
  "theme_color": "#000000",     // Header color
  "background_color": "#ffffff" // Loading screen color
}
```

## Installation Flow

### Android:
```
User opens app in Chrome
    ↓
Chrome detects PWA (manifest.json)
    ↓
"Install" button appears
    ↓
User taps "Install app"
    ↓
App installs to home screen
    ↓
Opens in standalone mode
    ↓
Shows icon-192x192.png on home screen
    ↓
Shows icon-512x512.png as splash screen
    ↓
Uses icon-*-maskable.png for adaptive display
```

### iOS:
```
User opens app in Safari
    ↓
Taps Share button
    ↓
Selects "Add to Home Screen"
    ↓
App installs to home screen
    ↓
Shows apple-icon.png (180×180)
    ↓
Opens in full-screen mode
```

## Same Logo Guarantee

Every platform uses the same source image:
```
DocVault Logo.ico (source)
        ↓
   [Resized & converted]
        ↓
┌───────┬───────┬───────┬───────┬────────┐
│ 32×32 │180×180│192×192│512×512│Maskable│
│Favicon│ iOS   │Android│Splash │Android │
└───────┴───────┴───────┴───────┴────────┘
        ↓
All use the same logo
```

This ensures brand consistency across:
- Web browser (favicon)
- iOS home screen
- Android home screen
- App drawer
- Splash screen
- Adaptive icons
