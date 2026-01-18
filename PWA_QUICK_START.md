# Quick PWA Reference

## 🚀 One-Command Setup
```bash
npm install && npm run dev
```

## 📱 Test on Mobile
1. **Android Chrome**: Menu → Install app
2. **iOS Safari**: Share → Add to Home Screen

## 🎨 Your App Icons
- **Logo**: DocVault Logo (from your existing favicon)
- **Favicon**: `/public/favicon.ico`
- **Android Home**: `/public/icon-192x192.png` (192×192)
- **Android Splash**: `/public/icon-512x512.png` (512×512)
- **iOS Home**: `/public/apple-icon.png` (180×180)
- **Adaptive Icons**: Maskable versions included

## 📝 App Details
- **Name**: DocVault - AI Document Fraud Detection
- **Short Name**: DocVault
- **Display Mode**: Standalone (full-screen app)
- **Theme Color**: Black (#000000)
- **Background**: White (#ffffff)

## 🔧 Common Tasks

### Regenerate Icons
```bash
npm run generate-icons
```

### Build for Production
```bash
npm run build
```

### Test Offline (DevTools)
1. Open DevTools (F12)
2. Go to Application tab
3. Check "Offline" checkbox
4. Refresh page

### Check Service Worker
1. DevTools → Application → Service Workers
2. Should show "sw.js" as registered

## 📋 Checklist Before Launch
- [ ] Test install on Android
- [ ] Test install on iOS
- [ ] Test offline functionality
- [ ] Run Lighthouse audit
- [ ] Deploy to HTTPS domain
- [ ] Monitor installs

## 📚 Learn More
- [Next-PWA Docs](https://github.com/shadowwalker/next-pwa)
- [Web App Manifest](https://web.dev/add-manifest/)
- [Service Workers](https://web.dev/service-workers-cache-storage/)
