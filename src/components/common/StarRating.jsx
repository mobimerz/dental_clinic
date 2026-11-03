import { Star } from "lucide-react";

export default function StarRating({ value = 5, size = "h-4 w-4", className = "" }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} role="img" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span key={i} className={`relative inline-block ${size}`}>
            <Star className={`absolute inset-0 ${size} text-star/30`} fill="currentColor" strokeWidth={0} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className={`${size} text-star`} fill="currentColor" strokeWidth={0} />
            </span>
          </span>
        );
      })}
    </span>
  );
}
