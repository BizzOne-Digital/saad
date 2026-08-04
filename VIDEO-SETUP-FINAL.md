# Video Setup Guide - Homepage Only

## ✅ What's Done

The video section has been added **ONLY to the homepage** with:
- ✅ Auto-play on scroll (starts playing when user scrolls to it)
- ✅ Mute/unmute button (bottom right)
- ✅ Side-by-side layout (content left, video right - like BizzOne Digital)
- ✅ Professional design with orange accents
- ✅ Feature icons (Trophy, Rocket)
- ✅ Mobile responsive

## 📹 How to Add Your Video

### Step 1: Create Videos Folder
```bash
# In your project root folder
mkdir public\videos
```

### Step 2: Add Your Video File
Place your video file in `public/videos/` and name it:
```
garage-work.mp4
```

**OR** if you have a different name, update `app/page.tsx` line 21:
```tsx
<VideoPlayer 
  videoSrc="/videos/YOUR-VIDEO-NAME.mp4"  // Change this
  title="Our Work In Motion"
  subtitle="Since day one, we've helped 500+ customers with their garage door needs. From installations to repairs, our team delivers premium work that feels even better."
/>
```

## 🎥 Video Requirements

- **Format**: MP4 (recommended) or WEBM
- **Size**: Keep under 20MB for fast loading
- **Length**: 30-60 seconds recommended
- **Aspect Ratio**: 16:9 (1920x1080 or 1280x720)
- **Quality**: 720p or 1080p

## 📍 Video Location

The video section appears on **homepage only**, positioned after:
- Hero Section
- Trust Strip  
- Services Showcase
- **[VIDEO SECTION HERE]** ← New!
- Premium Product
- Before/After
- Why Choose
- Process Section
- Recent Projects
- Reviews
- Service Areas
- Emergency CTA

## 🎨 Video Section Features

1. **Auto-play**: Video starts playing when user scrolls to it
2. **Muted by default**: Users can click unmute button
3. **Loops continuously**: Video repeats automatically
4. **Content Section**: Left side has:
   - "Our Work In Motion" badge
   - Main heading
   - Description text
   - Award-Winning Service icon
   - Fast & Reliable icon
5. **Video Player**: Right side has:
   - Auto-playing video
   - Mute/unmute button (bottom right)
   - Orange border on hover
   - Glass effect styling

## 🔧 Customization

To change the text, edit `app/page.tsx`:

```tsx
<VideoPlayer 
  videoSrc="/videos/garage-work.mp4"
  title="Our Work In Motion"  // Change badge text
  subtitle="Your custom text here. You can write multiple sentences."  // Change main text
/>
```

## 📱 Mobile Responsive

- On mobile: Content stacks (content on top, video below)
- On desktop: Side by side (content left, video right)
- Mute button scales appropriately
- All text is readable on small screens

## 🚫 Videos Removed From

- ❌ Services page (no video)
- ❌ All other pages (no videos)
- ✅ Homepage only (has video)

## 🎬 Video Not Playing?

If video doesn't autoplay:

1. **Check browser**: Some browsers block autoplay
2. **Check file path**: Make sure video is in `public/videos/`
3. **Check file name**: Must match exactly (case-sensitive)
4. **Check console**: Open browser DevTools and check for errors
5. **Try different browser**: Chrome usually allows autoplay

## 📝 Notes

- Video will be muted by default (required for autoplay)
- Users can click the speaker icon to unmute
- Video loops automatically
- Video only loads when user scrolls to that section (performance optimization)
- If video file is missing, placeholder image shows instead

---

**Need help?** Check browser console for errors or contact support.
