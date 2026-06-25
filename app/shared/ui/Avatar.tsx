import { useState } from "react";
import { FALLBACK_COLORS } from "~/shared/constants/fallback-colors";
import { SIZE_CLASSES } from "~/shared/constants/size-classes";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getColorByName(name: string) {
  const index = name.charCodeAt(0) % FALLBACK_COLORS.length;
  return FALLBACK_COLORS[index];
}

interface AvatarProps {
  src: string;
  name: string;
  size?: "sm" | "md" | "lg";
}

export function Avatar({ src, name, size = "md" }: AvatarProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const sizeClass = SIZE_CLASSES[size];
  const colors = getColorByName(name);

  if (hasError || !src) {
    return (
      <div
        className={`${sizeClass} rounded-full flex items-center justify-center font-semibold flex-shrink-0 select-none`}
        style={{ backgroundColor: colors.bg, color: colors.color }}
        aria-label={name}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <div className={`${sizeClass} relative flex-shrink-0`}>
      {!isLoaded && <div className="bg-skeleton animate-pulse rounded-full" />}
      <img
        src={src}
        alt={name}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full rounded-full object-cover transition-opacity ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
