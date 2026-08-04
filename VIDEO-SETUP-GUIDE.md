# Video Setup Guide

I've added a professional video section to your homepage! Here's how to add your video file.

## ✅ What's Been Added

1. **VideoSection Component** (`components/home/VideoSection.tsx`)
   - Professional video player with custom thumbnail
   - Play button overlay
   - Statistics display below video
   - Smooth animations

2. **Homepage Integration** (`app/page.tsx`)
   - Video section added after Services Showcase
   - Positioned prominently on the homepage

## 🎬 How to Add Your Video

### Step 1: Prepare Your Video File

**Recommended Video Specs:**
- **Format:** MP4 (H.264 codec)
- **Resolution:** 1920x1080 (Full HD) or 1280x720 (HD)
- **Aspect Ratio:** 16:9 (standard widescreen)
- **Duration:** 1-3 minutes (shorter is better for web)
- **File Size:** Under 50MB (compress if larger)

### Step 2: Create Videos Folder

Create a folder for your video:
```
public/
  └── videos/
      └── garage-door-video.mp4
```

### Step 3: Add Your Video File

1. **Copy your video** to: `public/videos/garage-door-video.mp4`
2. **Optional:** Also add WebM version for better browser support: `public/videos/garage-door-video.webm`

### Step 4: (Optional) Customize Video Thumbnail

To change the video thumbnail preview:

Edit `components/home/VideoSection.tsx` line 34:
```tsx
backgroundImage: "url('/your-video-thumbnail.jpg')",
```

**To create a thumbnail:**
1. Take a screenshot from your video at an interesting moment
2. Save as `public/video-thumbnail.jpg`
3. Update the path in the code above

## 🎥 Video Compression (If Needed)

If your video is too large (over 50MB):

### Option 1: Online Compressor (Easy)
1. Go to: https://www.freeconvert.com/video-compressor
2. Upload your video
3. Select "Strong compression"
4. Download compressed video

### Option 2: HandBrake (Professional)
1. Download: https://handbrake.fr/
2. Open your video
3. Select "Fast 1080p30" preset
4. Click "Start Encode"

### Option 3: FFmpeg (Command Line)
```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output.mp4
```

## 📁 File Structure

```
public/
  └── videos/
      ├── garage-door-video.mp4    (Main video - required)
      ├── garage-door-video.webm   (Alternative format - optional)
      └── video-thumbnail.jpg      (Custom thumbnail - optional)
```

## 🎨 Video Section Features

### Current Design:
- ✅ Large video player (16:9 aspect ratio)
- ✅ Custom play button overlay
- ✅ Video thumbnail preview
- ✅ Full screen controls when playing
- ✅ Close button to stop video
- ✅ Statistics below video (500+ Installations, 15+ Years, 100% Satisfaction)
- ✅ Smooth animations
- ✅ Mobile responsive

### Positioning:
The video appears after the Services Showcase section, making it prominent but not intrusive.

## 🎯 Customization Options

### Change Video Title/Description

Edit `components/home/VideoSection.tsx` around line 48:

```tsx
<h3 className="text-2xl font-bold mb-2">Your Custom Title</h3>
<p className="text-white/70">Your custom description</p>
```

### Change Section Heading

Edit line 20:

```tsx
<h2 className="text-4xl md:text-5xl font-bold mb-6">
  Your Custom <span className="text-gradient-orange">Heading</span>
</h2>
```

### Change Statistics

Edit lines 93-109 to update the numbers and labels:

```tsx
<div className="text-3xl font-bold text-orange mb-2">Your Number</div>
<div className="text-white/70">Your Label</div>
```

### Use YouTube/Vimeo Instead

If you want to embed a YouTube or Vimeo video instead:

Replace the video player code (lines 56-63) with:

**YouTube:**
```tsx
<iframe
  className="w-full h-full"
  src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
/>
```

**Vimeo:**
```tsx
<iframe
  className="w-full h-full"
  src="https://player.vimeo.com/video/YOUR_VIDEO_ID"
  title="Vimeo video player"
  frameBorder="0"
  allow="autoplay; fullscreen; picture-in-picture"
  allowFullScreen
/>
```

## 📱 Mobile Optimization

The video section is fully responsive:
- ✅ Scales to fit mobile screens
- ✅ Play button adjusts size
- ✅ Touch-friendly controls
- ✅ Maintains aspect ratio

## 🚀 Performance Tips

1. **Compress your video** - Keep under 50MB
2. **Use poster image** - Shows thumbnail before playing
3. **Lazy load** - Video only loads when scrolled into view
4. **Multiple formats** - Provide both MP4 and WebM for browser compatibility

## 🔧 Troubleshooting

### Video not showing:
- Check file path: `public/videos/garage-door-video.mp4`
- Verify file name matches exactly (case-sensitive)
- Ensure video is in MP4 format
- Check file permissions

### Video too slow to load:
- Compress video to under 50MB
- Use lower resolution (720p instead of 1080p)
- Use online compression tool

### Play button not working:
- Check browser console for errors (F12)
- Ensure video file exists
- Try a different browser

### Video not playing on mobile:
- Add `playsInline` attribute (already included)
- Ensure video is compressed
- Test on actual mobile device (not just responsive mode)

## 🎬 Video Content Suggestions

Good video content for garage door business:
- ✅ Time-lapse of installation
- ✅ Before/After transformations
- ✅ Team introduction
- ✅ Product showcase
- ✅ Customer testimonials
- ✅ Service process walkthrough

## 📊 Video Best Practices

**Duration:**
- Ideal: 60-90 seconds
- Maximum: 3 minutes
- Attention span drops after 90 seconds

**Content:**
- Start with compelling hook (first 3 seconds)
- Show real work, not stock footage
- Include captions (many watch with sound off)
- End with clear call-to-action

**Technical:**
- Resolution: 1920x1080 or 1280x720
- Frame rate: 30fps
- Format: MP4 (H.264)
- Audio: AAC codec, 128kbps

## ✨ Result

Your homepage now has:
- ✅ Professional video section
- ✅ Custom play button
- ✅ Beautiful animations
- ✅ Statistics display
- ✅ Mobile responsive
- ✅ Fast loading

Just add your video file to `public/videos/garage-door-video.mp4` and you're done!

---

## Quick Start:

1. Put your video in: `public/videos/garage-door-video.mp4`
2. (Optional) Add thumbnail: `public/video-thumbnail.jpg`
3. Refresh your browser
4. The video appears on the homepage after services section! 🎉
