"use client";

import { useRef, useState } from "react";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const { addToCart } = useCart();

  const play = () => {
    if (!product.video) return;

    setIsPlaying(true);
    videoRef.current?.play().catch(() => {
      setIsPlaying(false);
    });
  };

  const stop = () => {
    setIsPlaying(false);

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handlePreview = () => {
    if (!product.video) return;

    if (isPlaying) {
      stop();
    } else {
      play();
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price) || 0,
      quantity: 1,
      image: product.image,
    });
  };

  return (
    <div
      className="group relative h-full overflow-hidden rounded-sm border border-cream-dark bg-white"
      onMouseEnter={play}
      onMouseLeave={stop}
    >
      <button
        type="button"
        onClick={handlePreview}
        className="relative block aspect-square w-full overflow-hidden"
        aria-label={`Preview ${product.name}`}
      >
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              isPlaying && product.video
                ? "opacity-0"
                : "opacity-100"
            }`}
          />
        )}

        {product.video && (
          <video
            ref={videoRef}
            src={product.video}
            muted
            loop
            playsInline
            preload="none"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              isPlaying ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {product.video && !isPlaying && (
          <span className="absolute bottom-2 right-2 rounded-full bg-navy/70 p-1.5 text-cream sm:hidden">
            ▶
          </span>
        )}

        {!product.image && !product.video && (
          <div className="flex h-full items-center justify-center bg-cream-dark px-3">
            <span className="text-center text-sm font-medium text-ink/60">
              {product.category}
            </span>
          </div>
        )}
      </button>

      <div className="flex min-h-[132px] flex-col p-3">
        <p className="line-clamp-2 min-h-[40px] text-sm font-medium leading-snug text-ink">
          {product.name}
        </p>

        <p className="text-[11px] text-ink/50">
          {product.unit}
        </p>

        <div className="mt-1.5">
          <span className="text-lg font-semibold text-navy">
            ${(Number(product.price) || 0).toFixed(2)}
          </span>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-auto w-full rounded-sm bg-navy py-1.5 text-[10px] font-semibold text-cream transition-colors hover:bg-navy/90"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}