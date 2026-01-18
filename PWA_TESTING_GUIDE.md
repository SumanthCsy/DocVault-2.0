# PWA Testing Guide for DocVault

## Pre-Launch Checklist

### 1. Development Testing
- [ ] Run `npm run dev`
- [ ] Open http://localhost:3000
- [ ] Check favicon appears in browser tab
- [ ] No console errors
- [ ] All pages load correctly

### 2. Logo/Favicon Verification
- [ ] Favicon visible in browser tab
- [ ] Open DevTools → Elements → Check `<head>`
- [ ] Verify these meta tags exist:
  ```html
  <link rel="manifest" href="/manifest.json">
  <link rel="icon" href="/favicon.ico">
  <link rel="apple-touch-icon" href="/apple-icon.png">
  <meta name="theme-color" content="#000000">
  ```

### 3. Manifest Testing
- [ ] DevTools → Application → Manifest
- [ ] Verify:
  - ✓ Name: "DocVault - AI Document Fraud Detection"
  - ✓ Short Name: "DocVault"
  - ✓ Display: "standalone"
  - ✓ All icons listed (192, 512, maskable variants)
  - ✓ All icons have correct paths

### 4. Service Worker Testing
- [ ] DevTools → Application → Service Workers
- [ ] In **production build** (`npm run build && npm start`):
  - [ ] Service worker appears as "Registered and active"
  - [ ] No errors in console
  - [ ] Status shows "running"

### 5. Offline Testing
1. Build for production:
   ```bash
   npm run build
   npm start
   ```
2. In DevTools → Network tab:
   - [ ] Check "Offline" checkbox
   - [ ] Refresh page (Ctrl+R or Cmd+R)
   - [ ] Page loads from service worker cache
   - [ ] Status shows "(from ServiceWorker)"

3. In DevTools → Application → Service Workers:
   - [ ] Enable "Offline" mode
   - [ ] Navigate between pages
   - [ ] All pages still load

4. Uncheck "Offline" to go back online:
   - [ ] Page still works normally
   - [ ] Service worker updates cache

### 6. Icon Testing

#### Favicon (Browser Tab)
1. Open app
2. Check browser tab - should show DocVault Logo
3. Try multiple browsers (Chrome, Edge, Firefox, Safari)

#### In DevTools
1. DevTools → Application → Manifest
2. Verify icons section shows:
   ```
   icon-192x192.png (192x192) - purpose: any
   icon-512x512.png (512x512) - purpose: any
   icon-192x192-maskable.png (192x192) - purpose: maskable
   icon-512x512-maskable.png (512x512) - purpose: maskable
   ```

### 7. Installation Testing

#### Android (Chrome/Edge/Samsung Browser)
1. Open app in browser
2. Look for "Install" icon in address bar (or menu)
3. Tap "Install app"
4. Verify installation popup shows:
   - [ ] App name: "DocVault"
   - [ ] Correct logo displayed
   - [ ] "Install" button available
5. Tap Install
6. Verify on home screen:
   - [ ] Icon appears (should be DocVault Logo)
   - [ ] Label: "DocVault"
   - [ ] Tap opens app in standalone mode (no browser UI)

#### iOS (Safari 11.3+)
1. Open app in Safari
2. Tap Share button (bottom of screen)
3. Scroll and tap "Add to Home Screen"
4. Verify popup shows:
   - [ ] App name: "DocVault"
   - [ ] Correct apple-icon.png displayed
5. Tap "Add"
6. Verify on home screen:
   - [ ] Icon appears (should be DocVault Logo)
   - [ ] Label: "DocVault"
   - [ ] Tap opens app in full-screen mode
   - [ ] Status bar shows "black-translucent"

### 8. Lighthouse Audit

1. DevTools → Lighthouse tab
2. Select "Mobile" (most important for PWA)
3. Run audit on all categories
4. For PWA, verify:
   - [ ] Manifest exists
   - [ ] Icons present (all sizes)
   - [ ] Service worker registered
   - [ ] HTTPS (for production)
   - [ ] Screenshot/loading gif present (optional)

Expected Lighthouse PWA Score: 90+

### 9. Performance Testing

1. **Desktop (Production Build)**:
   ```bash
   npm run build
   npm start
   ```
   - [ ] Page loads in < 3 seconds
   - [ ] Favicon loads in < 1 second
   - [ ] No "blocking" resources

2. **Mobile (Chrome DevTools)**:
   - [ ] Throttle to "Slow 4G"
   - [ ] Check page still loads
   - [ ] Favicon appears even on slow connection

### 10. Cross-Browser Testing

| Browser | Desktop | Mobile | Install | Offline |
|---------|---------|--------|---------|---------|
| Chrome  | ✓ Test  | ✓ Test | ✓ Test  | ✓ Test  |
| Edge    | ✓ Test  | ✓ Test | ✓ Test  | ✓ Test  |
| Firefox | ✓ Test  | ✓ Test | ✓ Test  | ✓ Test  |
| Safari  | ✓ Test  | ✓ Test | ✓ Test  | ✓ Test  |

### 11. Theme Color Testing

1. DevTools → Application → Manifest
2. Check `theme_color`: #000000
3. Open app on Android:
   - [ ] Status bar should be dark (theme color applied)
   - [ ] Address bar should be dark
4. Check manifest.json for correct colors:
   ```json
   "theme_color": "#000000",
   "background_color": "#ffffff"
   ```

### 12. Metadata Testing

1. Open page source (Ctrl+U / Cmd+U)
2. Verify in `<head>`:
   ```html
   <title>DocVault - AI Document Fraud Detection</title>
   <meta name="description" content="...">
   <meta name="theme-color" content="#000000">
   <meta name="apple-mobile-web-app-capable" content="yes">
   <meta name="apple-mobile-web-app-title" content="DocVault">
   <link rel="manifest" href="/manifest.json">
   <link rel="apple-touch-icon" href="/apple-icon.png">
   ```

### 13. Reusability Testing

1. Install app on Android
2. Force close the app (Settings → Apps → DocVault → Force Stop)
3. Open app again - should load from cache
4. Go offline
5. Click home button, then open DocVault again
6. App should load even offline

### 14. Updates Testing

1. Make a change to app
2. Rebuild: `npm run build`
3. Restart server: `npm start`
4. Refresh app in browser
5. Service worker should update cache
6. Verify changes appear (may need hard refresh: Ctrl+Shift+R)

## Common Issues & Fixes

### Issue: Manifest not found
**Solution**: Check manifest path in layout.tsx is `/manifest.json` (with leading slash)

### Issue: Icons not showing in install prompt
**Solution**:
1. Clear browser cache
2. Check icon files exist in `/public`
3. Verify manifest.json references correct paths
4. Uninstall and reinstall app

### Issue: Service worker not registering
**Solution**:
1. Must be HTTPS (production) or localhost (development)
2. Check DevTools for service worker errors
3. Clear cache and hard refresh (Ctrl+Shift+R)

### Issue: Offline not working
**Solution**:
1. Build for production (`npm run build`)
2. Check Service Worker is active in DevTools
3. Ensure you've visited the page online first (to cache)
4. Hard refresh browser

### Issue: Wrong icon on home screen
**Solution**:
1. Delete app from home screen
2. Clear browser cache (Settings → Clear cache)
3. Hard refresh (Ctrl+Shift+R)
4. Reinstall app

## Testing on Real Devices

### Android Phone/Tablet
1. Connect to PC with USB cable
2. Enable Developer Mode
3. Enable USB Debugging
4. Open Chrome on device
5. Type address: chrome://inspect
6. Click device → open website
7. Test installation and offline

### iPhone/iPad
1. Connect to Mac with USB cable
2. Open Safari
3. Go to website
4. Test installation via Share → Add to Home Screen
5. Test offline mode

## Deployment Checklist

Before deploying to production:

- [ ] All tests pass locally
- [ ] No console errors
- [ ] Lighthouse PWA score 90+
- [ ] Service worker working offline
- [ ] Icons display correctly on all platforms
- [ ] manifest.json is valid
- [ ] HTTPS enabled
- [ ] favicon.ico in place
- [ ] apple-icon.png in place
- [ ] All icon sizes generated
- [ ] No mixed content warnings
- [ ] Page title correct
- [ ] Meta descriptions set
- [ ] Theme colors correct

## Quick Test Script

```bash
# Run all checks
echo "Starting PWA tests..."

# 1. Check files exist
echo "✓ Checking files..."
test -f public/favicon.ico && echo "  ✓ favicon.ico"
test -f public/manifest.json && echo "  ✓ manifest.json"
test -f public/icon-192x192.png && echo "  ✓ icon-192x192.png"
test -f public/icon-512x512.png && echo "  ✓ icon-512x512.png"

# 2. Build
echo "✓ Building..."
npm run build

# 3. Start server
echo "✓ Starting server..."
npm start

# Then manually test in browser:
# http://localhost:3000 - Check favicon
# DevTools > Application > Manifest - Check manifest
# DevTools > Application > Service Workers - Check SW
```

## Success Criteria

Your PWA is production-ready when:

- ✅ Favicon shows in browser tab
- ✅ Icons visible in install prompt
- ✅ App installs to home screen
- ✅ Same logo across all platforms
- ✅ Works offline
- ✅ Lighthouse PWA score 90+
- ✅ No console errors
- ✅ Fast load times (< 3s)
- ✅ Responsive on all devices
- ✅ Theme colors apply correctly
- ✅ Service worker updates work
- ✅ All meta tags present

When all are ✅, you're ready to announce PWA capability to users!
