#!/usr/bin/env node

/**
 * Replace Assistant Pastor Image
 * 
 * Converts and replaces the Assistant Pastor image with the new one.
 */

import sharp from 'sharp';
import { existsSync, copyFileSync } from 'fs';
import { join } from 'path';

const NEW_IMAGE = join(process.cwd(), 'public/images/new_AssistantPastor.jpg');
const BACKUP_IMAGE = join(process.cwd(), 'public/images/AsstPastor_Olise.backup.webp');
const OUTPUT_IMAGE = join(process.cwd(), 'public/images/AsstPastor_Olise.webp');

async function main() {
  console.log('Replacing Assistant Pastor image...\n');

  // Verify new image exists
  if (!existsSync(NEW_IMAGE)) {
    throw new Error(`New image not found: ${NEW_IMAGE}`);
  }

  // Backup current image if it exists and backup doesn't
  if (existsSync(OUTPUT_IMAGE) && !existsSync(BACKUP_IMAGE)) {
    console.log('Backing up current image...');
    copyFileSync(OUTPUT_IMAGE, BACKUP_IMAGE);
    console.log(`✓ Backup created: ${BACKUP_IMAGE}\n`);
  }

  // Get image metadata to calculate crop
  const image = sharp(NEW_IMAGE);
  const imgMetadata = await image.metadata();
  const width = imgMetadata.width!;
  const height = imgMetadata.height!;
  
  console.log(`Original dimensions: ${width}x${height}`);
  
  // Zoom in and crop to show more of the hat
  // Crop from top to include more hat, focus on upper portion
  // Target is 500x500 (square) to match existing format
  const targetSize = 500;
  
  // Calculate crop: zoom in to show hat and face clearly
  // Need to include: hat (top), face (middle) - zoomed in for better visibility
  // The image is 1284x1532, we want to zoom in to show hat + face clearly
  // Use a smaller crop to zoom in - approximately from top to just below face
  const cropTop = 0; // Start from very top to include full hat
  const cropWidth = width; // Full width (1284)
  // Use 70% of width (899px) to zoom in and show hat and face clearly
  const cropHeight = Math.round(width * 0.70); // Zoomed in to show hat and face clearly
  
  // Center horizontally (no horizontal crop needed)
  const cropLeft = 0;
  
  console.log(`Cropping to show hat: ${cropLeft},${cropTop} ${cropWidth}x${cropHeight}`);
  console.log('Zooming in and converting to WebP format...');
  
  // Extract and resize with cover to focus on head/hat, crop body
  await image
    .extract({
      left: cropLeft,
      top: cropTop,
      width: cropWidth,
      height: Math.min(cropHeight, height)
    })
    .resize(targetSize, targetSize, {
      fit: 'cover', // Use cover to fill the square, but crop intelligently
      position: 'top' // Align to top to show hat, face will be in the visible area
    })
    .webp({ quality: 90 })
    .toFile(OUTPUT_IMAGE);

  const outputMetadata = await sharp(OUTPUT_IMAGE).metadata();
  console.log(`✓ Image replaced successfully!`);
  console.log(`  File: ${OUTPUT_IMAGE}`);
  console.log(`  Dimensions: ${outputMetadata.width}x${outputMetadata.height}`);
  console.log(`  Format: ${outputMetadata.format}\n`);
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});



