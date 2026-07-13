"use client";

import { useRef, useState } from "react";

export default function FlyerCard({ item }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const play = () => {
    setIsPlaying(true);
    videoRef.current?.play();
  };

  const stop = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleTap = () => (isPlaying ? stop() : play());

  const hasDiscount = item.wasPrice && item.wasPrice > item.price;
  const savings = hasDiscount ? (item.wasPrice - item.price).toFixed(2) : null;

  return (
    <div
      className="group relative overflow-hidden rounded-sm border border-cream-dark bg-white"
      onMouseEnter={play}
      onMouseLeave={stop}
    >
      <button
        type="button"
        onClick={handleTap}
        className="relative block aspect-square w-full overflow-hidden"
        aria-label={`Preview ${item.name}`}
      >
        <img
          src={item.image}
          alt={item.name}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            isPlaying ? "opacity-0" : "opacity-100"
          }`}
        />

        {item.video && (
          <video
            ref={videoRef}
            src={item.video}
            muted
            loop
            playsInline
            preload="none"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              isPlaying ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {item.video && !isPlaying && (
          <span className="absolute bottom-2 right-2 rounded-full bg-navy/70 p-1.5 text-cream sm:hidden">
            ▶
          </span>
        )}

        {hasDiscount && (
          <span className="absolute left-2 top-2 rounded-full bg-gold px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-navy">
            Save ${savings}
          </span>
        )}
      </button>

      <div className="p-3">
        <p className="text-sm font-medium text-ink leading-snug">{item.name}</p>
        <p className="text-[11px] text-ink/50">{item.unit}</p>

        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-lg font-semibold text-navy">
            ${item.price.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-ink/40 line-through">
              ${item.wasPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}