import { Leaf } from "lucide-react"
import { cn } from "@/lib/utils"

interface LeafRatingProps {
  value: number
  onChange: (val: number) => void
}

export function LeafRating({ value, onChange }: LeafRatingProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="transition-transform hover:scale-110 focus:outline-none"
        >
          <Leaf
            className={cn(
              "h-8 w-8 transition-colors",
              star <= value
                ? "fill-green-500 text-green-500"
                : "fill-transparent text-zinc-300"
            )}
          />
        </button>
      ))}
    </div>
  )
}
