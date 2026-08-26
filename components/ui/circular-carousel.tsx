"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CarouselItem {
  id: string;
  title: string;
  description: string;
  tag?: string;
  image?: string;
}

export interface CircularCarouselProps {
  items: CarouselItem[];
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

const VISIBLE_COUNT = 5;
const RADIUS_X = 155;
const RADIUS_Y = 60;

function getItemPosition(index: number, activeIndex: number, total: number) {
  const offset = index - activeIndex;
  const half = Math.floor(VISIBLE_COUNT / 2);
  let adjustedOffset = offset;

  if (offset > half) adjustedOffset = offset - total;
  if (offset < -half) adjustedOffset = offset + total;

  if (Math.abs(adjustedOffset) > half * 2) return null;

  const angle = (adjustedOffset / VISIBLE_COUNT) * Math.PI;
  const x = Math.sin(angle) * RADIUS_X;
  const y = -Math.cos(angle) * RADIUS_Y;

  const distance = Math.abs(adjustedOffset);
  const maxDistance = half + 1;
  const scale = distance === 0 ? 1.22 : Math.max(0.65, 0.85 - (distance / maxDistance) * 0.25);
  const opacity = Math.max(0.4, 1 - (distance / maxDistance) * 0.55);
  const zIndex = VISIBLE_COUNT - distance;

  return { x, y, scale, opacity, zIndex, adjustedOffset };
}

export function CircularCarousel({
  items,
  activeIndex: controlledIndex,
  onActiveChange,
  autoPlay = true,
  autoPlayInterval = 3500,
  className,
}: CircularCarouselProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const activeIndex = controlledIndex ?? internalIndex;
  const total = items.length;

  const goTo = useCallback(
    (index: number) => {
      const newIndex = ((index % total) + total) % total;
      if (controlledIndex === undefined) {
        setInternalIndex(newIndex);
      }
      onActiveChange?.(newIndex);
    },
    [total, controlledIndex, onActiveChange],
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (!autoPlay || isHovered || isFocused) return;
    intervalRef.current = setInterval(next, autoPlayInterval);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay, autoPlayInterval, isHovered, isFocused, next]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    const el = containerRef.current;
    el?.addEventListener("keydown", handler);
    return () => el?.removeEventListener("keydown", handler);
  }, [next, prev]);

  const activeItem = items[activeIndex];

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Circular carousel"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={cn(
        "relative flex flex-col items-center justify-center gap-6 outline-none py-4 w-full overflow-hidden select-none",
        className,
      )}
    >
      {/* Circular track */}
      <div className="relative h-[290px] w-full max-w-sm flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => {
            const pos = getItemPosition(i, activeIndex, total);
            if (!pos) return null;

            const isActive = i === activeIndex;

            return (
              <motion.button
                key={item.id || i}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  x: pos.x,
                  y: pos.y,
                  scale: pos.scale,
                  opacity: pos.opacity,
                  zIndex: pos.zIndex,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => goTo(i)}
                aria-label={item.title}
                aria-selected={isActive}
                role="option"
                className={cn(
                  "absolute left-1/2 top-1/2 flex h-40 w-48 -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col justify-between overflow-hidden rounded-xl border transition-all duration-300 text-left p-4",
                  isActive
                    ? "border-matte-gold bg-graphite text-ivory shadow-[0_20px_50px_-12px_rgba(139,38,53,0.4)]"
                    : "border-ivory/80 bg-alva-white text-graphite shadow-sm hover:border-matte-gold/60",
                )}
                style={{ transformOrigin: "center center" }}
              >
                {item.image && (
                  <div className="absolute inset-0 z-0 opacity-20 transition-opacity group-hover:opacity-30">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="relative z-10 flex w-full items-center justify-between">
                  {item.tag && (
                    <span className={cn(
                      "rounded-full px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider",
                      isActive
                        ? "bg-alva-red/90 text-ivory"
                        : "bg-ivory text-warm-gray"
                    )}>
                      {item.tag}
                    </span>
                  )}
                </div>

                <div className="relative z-10 w-full mt-auto">
                  <h3
                    className={cn(
                      "font-serif font-semibold leading-tight transition-colors duration-300 line-clamp-1",
                      isActive ? "text-ivory text-base" : "text-graphite text-sm",
                    )}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-1 line-clamp-2 text-[11px] leading-relaxed transition-colors duration-300 font-light",
                      isActive ? "text-ivory/80" : "text-warm-gray",
                    )}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>

        {/* Center indicator counter */}
        {activeItem && (
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 opacity-15"
          >
            <span className="font-serif text-6xl font-bold tracking-tight text-graphite">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
          </motion.div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 z-20 mt-2">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={prev}
          aria-label="Previous item"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory bg-alva-white text-graphite hover:border-matte-gold hover:text-alva-red shadow-sm transition-colors"
        >
          <ChevronLeft className="size-4" />
        </motion.button>

        {/* Dot indicators */}
        <div className="flex items-center gap-1.5" role="tablist">
          {items.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              onClick={() => goTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === activeIndex
                  ? "w-5 bg-alva-red"
                  : "w-1.5 bg-warm-gray/30 hover:bg-warm-gray/60",
              )}
              aria-label={`Go to item ${i + 1}`}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={next}
          aria-label="Next item"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory bg-alva-white text-graphite hover:border-matte-gold hover:text-alva-red shadow-sm transition-colors"
        >
          <ChevronRight className="size-4" />
        </motion.button>
      </div>
    </div>
  );
}

export default CircularCarousel;
