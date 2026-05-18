# Image Setup Guide

## Directory Structure

Create these folders for your images:

```
public/
├── images/
│   ├── projects/
│   │   ├── dairyflow.png
│   │   ├── dairyflow-full.png
│   │   ├── bookcycle.png
│   │   ├── bookcycle-full.png
│   │   ├── lifeos.png
│   │   └── lifeos-full.png
│   └── team/
│       ├── member1.jpg
│       ├── member2.jpg
│       └── member3.jpg
```

## Adding Project Images

1. Place your project images in `public/images/projects/`
2. Update the image paths in `data/projects.ts`:
   ```ts
   image: '/images/projects/your-project-name.png',
   modalImage: '/images/projects/your-project-name-full.png',
   ```

## Image Recommendations

### Project Images
- Size: 1400x800px (16:9 ratio)
- Format: PNG or JPG
- For modal: Full-size screenshot (2000x1200px)

### Testimonial Avatar Images
- Currently using: `https://i.pravatar.cc/` (auto-generated avatars)
- To use custom images: Place in `public/images/avatars/` and update `data/testimonials.ts`

## How to Update Images

1. **Projects**: Edit `data/projects.ts` and update the `image` and `modalImage` fields
2. **Testimonials**: Edit `data/testimonials.ts` and update the `image` field
3. Files automatically hot-reload in development mode

## Current Setup

- Projects use a mix of Unsplash URLs and local files
- Testimonials use placeholder avatars from pravatar.cc
- Replace these with your own images as needed
