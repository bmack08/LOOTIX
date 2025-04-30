'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: {
    url: string;
    preview_url: string;
  }[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square rounded-lg overflow-hidden">
        <Image
          src={images[selectedImage]?.url || '/images/product-placeholder.jpg'}
          alt="Product Image"
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
        />
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              key={image.url}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square rounded-md overflow-hidden border-2 transition-colors ${
                selectedImage === index
                  ? 'border-lootix-gold'
                  : 'border-transparent hover:border-lootix-silver'
              }`}
            >
              <Image
                src={image.preview_url}
                alt={`Product Image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 10vw, 20vw"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 