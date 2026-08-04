# 📱 Quick Mobile Testing Guide

## 🚀 Start Testing in 3 Steps

### Step 1: Start the Server
```bash
npm run dev
```

### Step 2: Open in Browser
```
http://localhost:3000
```

### Step 3: Test Mobile View
**Chrome/Edge**: Press `Ctrl + Shift + M` (Toggle Device Toolbar)  
**Firefox**: Press `Ctrl + Shift + M` (Responsive Design Mode)

---

## 📱 Test These Devices

### Required Tests:
1. **iPhone SE** (375 x 667) - Smallest common screen
2. **iPhone 12/13/14** (390 x 844) - Most popular iPhone
3. **iPad** (768 x 1024) - Tablet portrait
4. **Desktop** (1920 x 1080) - Standard desktop

---

## ✅ Quick Checklist

### Logo:
- [ ] Logo shows as PNG (not SVG)
- [ ] Logo is clear and readable
- [ ] Logo sizes correctly on mobile

### Navigation:
- [ ] Hamburger menu appears on mobile
- [ ] Menu opens and closes smoothly
- [ ] All links work in mobile menu
- [ ] Bottom action bar visible on mobile

### Homepage:
- [ ] Hero text is readable
- [ ] Buttons are easy to tap
- [ ] Review carousel swipes
- [ ] No horizontal scrolling

### Services Page:
- [ ] Service cards stack on mobile
- [ ] Images look good
- [ ] Text is readable
- [ ] Buttons work

### Door Types Page:
- [ ] Door cards display properly
- [ ] Modal opens on mobile
- [ ] Form is easy to fill
- [ ] Table scrolls horizontally

---

## 🎯 Key Things to Look For

### ✅ Good Signs:
- Text is readable without zooming
- Buttons are easy to tap (not too small)
- No content gets cut off
- No horizontal scrolling
- Images fit screen width
- Smooth animations
- Logo is clear

### ❌ Problems (Should NOT happen):
- Text too small to read
- Buttons too small to tap
- Content overflows screen
- Horizontal scrolling needed
- Broken images
- Choppy animations
- Blurry logo

---

## 📞 Test Contact Features

### On Mobile:
1. Tap phone number in bottom bar → Should open phone app
2. Tap "TEXT US" → Should open messages app
3. Tap "Free Quote" → Should go to contact page
4. Check all contact links work

---

## 🔄 Test Responsive Features

### Resize Browser Window:
1. Start at mobile size (375px)
2. Slowly expand to desktop (1920px)
3. Watch elements adapt smoothly
4. No weird jumps or breaks

---

## 📊 Expected Behavior Per Device

### Mobile (< 640px):
- Single column layout
- Hamburger menu
- Bottom action bar
- Stacked buttons
- Large touch targets

### Tablet (640px - 1023px):
- 2-column layouts
- Hamburger menu still
- Bottom action bar visible
- Side-by-side buttons

### Desktop (≥ 1024px):
- Full navigation menu
- Top info bar visible
- Multi-column layouts
- Sticky emergency button in footer
- No bottom action bar

---

## 🎨 Visual Check

### Colors Should Be:
- Orange: #F58220 (primary)
- Black: #111111 (background)
- White: #FFFFFF (text)

### Logo Should Be:
- PNG format
- Clear and sharp
- Proper sizing per device
- No pixelation

---

## 🐛 If Something Looks Wrong

### Clear Cache:
```bash
# Stop server (Ctrl+C)
# Delete .next folder
Remove-Item -Recurse -Force .next

# Restart
npm run dev
```

### Hard Refresh Browser:
- **Chrome/Edge**: Ctrl + Shift + R
- **Firefox**: Ctrl + F5

---

## ✅ All Tests Passed?

If everything looks good:
- ✅ Logo is PNG
- ✅ Mobile menu works
- ✅ Text is readable
- ✅ Buttons are tappable
- ✅ No scrolling issues
- ✅ Forms work
- ✅ Links work

**You're ready to deploy! 🚀**

---

## 📝 Quick Test Script

```bash
# 1. Start server
npm run dev

# 2. Open browser to http://localhost:3000

# 3. Press Ctrl+Shift+M (toggle mobile view)

# 4. Test these pages:
- / (homepage)
- /services
- /door-types
- /contact

# 5. Test at these widths:
- 375px (mobile)
- 768px (tablet)  
- 1920px (desktop)

# 6. Verify:
- Logo is PNG ✓
- Everything responsive ✓
- No errors ✓
```

---

## 🎯 Most Important Tests

### Critical (Must Work):
1. ✅ Logo displays (PNG)
2. ✅ Navigation works
3. ✅ Phone links work
4. ✅ Forms usable
5. ✅ No horizontal scroll

### Important (Should Work):
1. ✅ Carousel swipes
2. ✅ Modal opens
3. ✅ Buttons look good
4. ✅ Text readable
5. ✅ Images fit

---

## 🚀 Ready?

**Start testing now:**
```bash
npm run dev
```

**Then visit:** http://localhost:3000

**Toggle mobile view:** Ctrl + Shift + M

**Have fun testing! 📱✨**

---

**Questions? Check:**
- MOBILE-RESPONSIVE.md (full details)
- RESPONSIVE-UPDATES-COMPLETE.md (summary)
- CURRENT-STATUS.md (project status)
