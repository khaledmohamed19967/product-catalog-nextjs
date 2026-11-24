"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/shared/lib/cn";

export interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const labelId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  if (images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-lg border border-border bg-surface-muted text-sm text-muted-foreground">
        <div className="flex flex-col items-center gap-2 px-4 text-center">
          <ImageOff className="size-6" aria-hidden />
          <span>No image available</span>
        </div>
      </div>
    );
  }

  const safeIndex = Math.min(activeIndex, images.length - 1);
  const activeImage = images[safeIndex] ?? images[0];
  const activeFailed = failedImages[safeIndex] === true;

  return (
    <div className="space-y-3">
      <div
        className="relative aspect-square overflow-hidden rounded-lg border border-border bg-surface-muted"
        aria-labelledby={labelId}
      >
        <p id={labelId} className="sr-only">
          {alt}
        </p>
        {activeImage && !activeFailed ? (
          <Image
            key={activeImage}
            src={activeImage}
            alt={alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            onError={() => {
              setFailedImages((current) => ({ ...current, [safeIndex]: true }));
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Image unavailable
          </div>
        )}
      </div>

      {images.length > 1 ? (
        <ul className="grid grid-cols-4 gap-2 sm:grid-cols-5" aria-label="Product image gallery">
          {images.map((image, index) => {
            const selected = index === safeIndex;
            const failed = failedImages[index] === true;

            return (
              <li key={`${image}-${index}`}>
                <button
                  type="button"
                  aria-label={`Show image ${index + 1} of ${images.length}`}
                  aria-pressed={selected}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "relative aspect-square w-full overflow-hidden rounded-md border bg-surface-muted transition-colors",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                    selected
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-border-strong",
                  )}
                >
                  {!failed ? (
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="96px"
                      className="object-cover"
                      onError={() => {
                        setFailedImages((current) => ({ ...current, [index]: true }));
                      }}
                    />
                  ) : (
                    <span className="flex h-full items-center justify-center text-[10px] text-muted-foreground">
                      N/A
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
