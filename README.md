# Retail Shop Website

A beautiful, modern retail shop website built with Next.js, React, and Tailwind CSS.

## Features

- 🏠 Beautiful home page with hero section, about, and featured products
- 📦 Products page with grid layout
- 🔧 Simple admin page for product management
- 📱 Fully responsive design
- 💬 WhatsApp and Call integration
- 🖼️ Image upload support (Cloudinary or URL)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB (optional - falls back to JSON file if not available)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (optional for MongoDB):
Create a `.env.local` file:
```
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

### Contact Information

**IMPORTANT:** Update the contact information in these files:
- `app/page.tsx` - Update `PHONE_NUMBER` and `WHATSAPP_NUMBER` constants (lines 5-6)
- `components/Navbar.tsx` - Update `PHONE_NUMBER` constant (line 5)
- `components/Footer.tsx` - Update `PHONE_NUMBER` and `WHATSAPP_NUMBER` constants (lines 3-4)
- `components/ProductCard.tsx` - Update `WHATSAPP_NUMBER` constant (line 10)

### Shop Information

Update shop name, tagline, and about section in `app/page.tsx`:
- Shop name: Currently "Rashmi Traders"
- Tagline: Line 15 (currently "Trusted Retail & Wholesale Supplier")
- About section: Lines 60-70

### Images

#### Store Images
Place your store images in the `public/images/` folder:
- `store-interior-1.jpg` - Main store interior (used in About section)
- `store-interior-2.jpg` - Store shelves with products (used in Showcase section)  
- `store-interior-3.jpg` - Another interior view (used in Services section)

**Image Requirements:**
- Recommended size: 1200x800px or larger
- Format: JPG, PNG, or WebP
- Optimize images for web (use tools like TinyPNG or ImageOptim)

#### Product Images
- Product images can be added via URL in the admin panel
- Use direct image URLs or Cloudinary links
- If an image fails to load, a placeholder will be shown automatically
- For best results, use images with aspect ratio 1:1 (square) or 4:3

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables if using MongoDB/Cloudinary
4. Deploy!

### Other Platforms

Build the project:
```bash
npm run build
npm start
```

## Tech Stack

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- MongoDB (with JSON fallback)
- Cloudinary (optional)

## License

MIT

