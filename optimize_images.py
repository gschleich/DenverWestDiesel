#!/usr/bin/env python3
"""
Image optimization script for Denver West Diesel website.
Creates optimized web and mobile versions of all used images.
"""

import os
from PIL import Image
import sys

# Images to optimize with their usage context
IMAGES_TO_OPTIMIZE = {
    # Hero carousel images (large background images)
    'open_hoods.jpg': {'type': 'hero', 'web_width': 1920, 'mobile_width': 768},
    'white_truck.jpg': {'type': 'hero', 'web_width': 1920, 'mobile_width': 768},
    'trucks_side.jpg': {'type': 'hero', 'web_width': 1920, 'mobile_width': 768},
    'shop_vehicles.jpg': {'type': 'hero', 'web_width': 1920, 'mobile_width': 768},
    'Mechanical1.png': {'type': 'hero', 'web_width': 1920, 'mobile_width': 768},
    'Mechanical2.png': {'type': 'hero', 'web_width': 1920, 'mobile_width': 768},
    'Mechanical3.png': {'type': 'hero', 'web_width': 1920, 'mobile_width': 768},
    'Mechanical4.png': {'type': 'hero', 'web_width': 1920, 'mobile_width': 768},
    'Mechanical5.png': {'type': 'hero', 'web_width': 1920, 'mobile_width': 768},
    # About section image
    'DWDTeamEdit.png': {'type': 'content', 'web_width': 1400, 'mobile_width': 768},
    # Logo
    'DWDaltlogo4.png': {'type': 'logo', 'web_width': 400, 'mobile_width': 300},
    # Favicon
    'DenverD.png': {'type': 'icon', 'web_width': 180, 'mobile_width': 180},
}

def optimize_image(input_path, output_path, max_width, quality=85, format='JPEG'):
    """Optimize a single image."""
    try:
        with Image.open(input_path) as img:
            # Convert RGBA to RGB if needed for JPEG
            if format == 'JPEG' and img.mode in ('RGBA', 'LA', 'P'):
                # Create white background
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                background.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
                img = background
            elif img.mode != 'RGB' and format == 'JPEG':
                img = img.convert('RGB')
            
            # Calculate new dimensions maintaining aspect ratio
            if img.width > max_width:
                ratio = max_width / img.width
                new_height = int(img.height * ratio)
                img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
            else:
                # Don't upscale, but still optimize
                pass
            
            # Save optimized image
            if format == 'JPEG':
                img.save(output_path, format='JPEG', quality=quality, optimize=True, progressive=True)
            elif format == 'PNG':
                # For PNG, use optimize flag and reduce colors if possible
                img.save(output_path, format='PNG', optimize=True, compress_level=9)
            elif format == 'WEBP':
                img.save(output_path, format='WEBP', quality=quality, method=6)
            
            # Get file sizes
            original_size = os.path.getsize(input_path)
            new_size = os.path.getsize(output_path)
            reduction = ((original_size - new_size) / original_size) * 100
            
            print(f"  ✓ {os.path.basename(output_path)}: {original_size/1024/1024:.2f}MB → {new_size/1024/1024:.2f}MB ({reduction:.1f}% reduction)")
            return True
    except Exception as e:
        print(f"  ✗ Error optimizing {input_path}: {e}")
        return False

def main():
    assets_dir = 'assets'
    web_dir = os.path.join(assets_dir, 'web')
    mobile_dir = os.path.join(assets_dir, 'mobile')
    
    # Create directories
    os.makedirs(web_dir, exist_ok=True)
    os.makedirs(mobile_dir, exist_ok=True)
    
    print("Starting image optimization...\n")
    
    for filename, config in IMAGES_TO_OPTIMIZE.items():
        input_path = os.path.join(assets_dir, filename)
        
        if not os.path.exists(input_path):
            print(f"⚠ Warning: {filename} not found, skipping...")
            continue
        
        print(f"Processing {filename}...")
        
        # Determine output format
        original_ext = os.path.splitext(filename)[1].lower()
        if original_ext == '.png' and config['type'] in ('hero', 'content'):
            # Convert large PNGs to WebP for better compression
            web_format = 'WEBP'
            mobile_format = 'WEBP'
            web_ext = '.webp'
            mobile_ext = '.webp'
        elif original_ext == '.png':
            # Keep PNGs for logos/icons
            web_format = 'PNG'
            mobile_format = 'PNG'
            web_ext = '.png'
            mobile_ext = '.png'
        else:
            # Convert JPGs to WebP for better compression
            web_format = 'WEBP'
            mobile_format = 'WEBP'
            web_ext = '.webp'
            mobile_ext = '.webp'
        
        # Web version (higher quality)
        web_filename = os.path.splitext(filename)[0] + web_ext
        web_path = os.path.join(web_dir, web_filename)
        web_quality = 90 if config['type'] == 'hero' else 85
        optimize_image(input_path, web_path, config['web_width'], quality=web_quality, format=web_format)
        
        # Mobile version (lower quality, smaller size)
        mobile_filename = os.path.splitext(filename)[0] + mobile_ext
        mobile_path = os.path.join(mobile_dir, mobile_filename)
        mobile_quality = 80 if config['type'] == 'hero' else 75
        optimize_image(input_path, mobile_path, config['mobile_width'], quality=mobile_quality, format=mobile_format)
        
        print()
    
    print("Image optimization complete!")
    print(f"\nOptimized images saved to:")
    print(f"  - {web_dir}/ (web/desktop versions)")
    print(f"  - {mobile_dir}/ (mobile versions)")

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nOptimization cancelled by user.")
        sys.exit(1)
    except Exception as e:
        print(f"\n\nError: {e}")
        sys.exit(1)

