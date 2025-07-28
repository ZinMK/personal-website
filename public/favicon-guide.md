# Favicon (Tab Icon) Setup Guide

## How to Change the Browser Tab Icon:

### **Option 1: Replace the existing favicon.ico**

1. **Create your icon**:

   - Size: 16x16, 32x32, or 48x48 pixels (16x16 is most common)
   - Format: ICO, PNG, or SVG
   - Design: Simple, recognizable design that works at small sizes

2. **Replace the file**:
   - Replace `public/favicon.ico` with your new icon
   - Keep the same filename: `favicon.ico`

### **Option 2: Use a different filename**

1. **Add your icon** to the `public/` folder:

   - Example: `public/my-icon.png` or `public/my-icon.svg`

2. **Update the HTML** in `index.html`:
   ```html
   <link rel="icon" type="image/png" href="/my-icon.png" />
   <!-- or for SVG -->
   <link rel="icon" type="image/svg+xml" href="/my-icon.svg" />
   ```

### **Option 3: Multiple favicon sizes (recommended)**

1. **Create multiple sizes**:

   - `favicon-16x16.png` (16x16)
   - `favicon-32x32.png` (32x32)
   - `apple-touch-icon.png` (180x180 for iOS)

2. **Update HTML** with multiple links:
   ```html
   <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
   <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
   <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
   ```

## **Recommended Icon Ideas:**

- **Windows 95 style**: Classic computer monitor or folder icon
- **Your logo**: Personal brand or initials
- **Portfolio theme**: Code symbol, briefcase, or user icon
- **Retro style**: Pixel art or vintage computer icon

## **Icon Creation Tools:**

- **Online**: favicon.io, realfavicongenerator.net
- **Design**: Figma, Canva, Photoshop
- **Convert**: Convert PNG/JPG to ICO format

## **File Formats:**

- **ICO**: Traditional favicon format (supports multiple sizes)
- **PNG**: Modern, good quality, widely supported
- **SVG**: Scalable, crisp at any size

## **Testing:**

After changing the favicon:

1. **Hard refresh** your browser (Ctrl+F5 or Cmd+Shift+R)
2. **Clear cache** if the old icon persists
3. **Check different browsers** for compatibility

## **Current Setup:**

The site currently uses `/favicon.ico` as the tab icon. Replace this file to change the icon.
