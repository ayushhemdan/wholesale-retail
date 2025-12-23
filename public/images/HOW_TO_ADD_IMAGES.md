# How to Add Your Store Images

## Quick Steps:

1. **Take photos of your store** (or use the ones you already have)

2. **Name the images:**
   - `store-interior-1.jpg` - Main store interior (hanging snacks view)
   - `store-interior-2.jpg` - Store shelves with products  
   - `store-interior-3.jpg` - Another interior view

3. **Place them in this folder:** `public/images/`

4. **Image requirements:**
   - Format: JPG, PNG, or WebP
   - Size: 1200x800px or larger (will be automatically resized)
   - File size: Try to keep under 500KB for faster loading

## Alternative: Use Image URLs

If you prefer to host images online (Cloudinary, Imgur, etc.):

1. Upload your images to an image hosting service
2. Get the direct image URLs
3. Update the image paths in `app/page.tsx`:
   - Line 151: About section image
   - Lines 112-119: Showcase gallery images
   - Lines 241-243: Services section images

## Current Status

Right now, the website will show placeholder images until you add your store images. The placeholders are grocery store images that match the theme.

