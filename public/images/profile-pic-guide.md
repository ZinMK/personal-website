# Profile Picture Setup

## How to Add Your Profile Picture:

1. **Place your image** in the `public/images/` folder
2. **Name it** `profile-pic.jpg` (or update the code to use your filename)
3. **Supported formats**: JPG, PNG, WebP

## Recommended Specifications:

- **Size**: 256x256 pixels or larger (will be displayed at 128x128)
- **Format**: JPG for photos, PNG for graphics
- **Aspect ratio**: Square (1:1) works best
- **File size**: Keep under 500KB for fast loading
- **Quality**: High quality, professional headshot recommended

## File Structure:

```
public/images/
├── profile-pic.jpg          ← Your profile picture here
├── desktop-bg.jpg           ← Desktop background
└── profile-pic-guide.md     ← This guide
```

## Alternative Filename:

If you want to use a different filename, update the `src` attribute in `src/components/AboutWindow.tsx`:

```javascript
<img
  src="/images/your-profile-pic.jpg"
  alt="Profile Picture"
  className="w-32 h-32 object-cover rounded"
  // ... rest of the code
/>
```

## Fallback:

If no image is found, the component will automatically show a user icon as a fallback.

## Tips:

- **Professional appearance**: Use a clear, well-lit headshot
- **Background**: Simple, uncluttered background
- **Expression**: Friendly, approachable expression
- **Resolution**: High enough to look crisp on retina displays
- **File optimization**: Compress the image for web use
