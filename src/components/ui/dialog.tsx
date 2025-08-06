
import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStartY, setDragStartY] = React.useState(0);
  const [translateY, setTranslateY] = React.useState(0);
  const contentRef = React.useRef<HTMLDivElement>(null);
  
  const handleDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStartY(e.clientY);
    if (contentRef.current) {
      contentRef.current.style.transition = 'none';
    }
    
    // Prevent default to avoid text selection during drag
    e.preventDefault();
  };
  
  const handleDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const deltaY = e.clientY - dragStartY;
    if (deltaY > 0) { // Only allow dragging down
      setTranslateY(deltaY);
    }
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
    
    if (contentRef.current) {
      contentRef.current.style.transition = 'transform 0.3s ease';
    }
    
    // If dragged more than 150px down, close the dialog
    if (translateY > 150) {
      // Find and click the closest DialogClose component
      const closeButton = contentRef.current?.querySelector('[data-close-dialog="true"]');
      if (closeButton instanceof HTMLElement) {
        closeButton.click();
      }
    }
    
    // Reset translation
    setTranslateY(0);
  };
  
  // Add event listeners for when user releases outside the drag handle
  React.useEffect(() => {
    const handlePointerUp = () => {
      if (isDragging) {
        handleDragEnd();
      }
    };
    
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging]);

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={(node) => {
          if (node) {
            // @ts-ignore - we need to merge the refs
            contentRef.current = node;
            // Forward the ref if one is provided
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }
        }}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
          className
        )}
        style={{
          transform: `translate(-50%, -50%) translateY(${translateY}px)`,
        }}
        {...props}
      >
        <div 
          className="absolute left-0 right-0 top-0 flex justify-center"
          onPointerDown={(e) => e.stopPropagation()}
        >
          {/* Drag handle */}
          <div 
            className="w-12 h-1.5 bg-gray-300 rounded-full my-2 cursor-grab active:cursor-grabbing" 
            onPointerDown={handleDragStart}
            onPointerMove={handleDrag}
            onPointerUp={handleDragEnd}
          />
        </div>
        {children}
        
        {/* Hidden close button that can be triggered programmatically */}
        <DialogPrimitive.Close className="hidden" data-close-dialog="true">
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
})
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
