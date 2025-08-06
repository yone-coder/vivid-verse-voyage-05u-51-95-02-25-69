
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success: "border-transparent bg-green-500 text-white hover:bg-green-600",
        warning: "border-transparent bg-yellow-500 text-white hover:bg-yellow-600",
        info: "border-transparent bg-blue-500 text-white hover:bg-blue-600",
        orange: "border-transparent bg-orange-500 text-white hover:bg-orange-600",
        red: "border-transparent bg-red-500 text-white hover:bg-red-600",
        // AliExpress-specific badge styles
        aliPrice: "border-transparent bg-red-600 text-white font-bold hover:bg-red-700",
        aliNew: "border-transparent bg-green-600 text-white font-bold hover:bg-green-700",
        aliHot: "border-transparent bg-orange-600 text-white font-bold hover:bg-orange-700",
        aliDiscount: "border-transparent bg-yellow-600 text-white font-bold hover:bg-yellow-700",
        aliShipping: "border-transparent bg-blue-600 text-white font-bold hover:bg-blue-700",
        aliSuper: "border-transparent bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

/* AliExpress-specific utility for hiding scrollbars while allowing scrolling */
const globalStyles = `
  .no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .no-scrollbar::-webkit-scrollbar {
    display: none;  /* Chrome, Safari, Opera */
  }
`;

// Add global styles via a style tag in the document head
if (typeof document !== 'undefined') {
  const styleTag = document.createElement('style');
  styleTag.textContent = globalStyles;
  document.head.appendChild(styleTag);
}

export { Badge, badgeVariants }
