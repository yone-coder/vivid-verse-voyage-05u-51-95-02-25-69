// BackButton.tsx
import { ICON_SIZE, ICON_STROKE_WIDTH } from './constants';

const BackButton = ({ progress }: BackButtonProps) => (
  <div className="rounded-full transition-all duration-700"
    style={{ backgroundColor: `rgba(0, 0, 0, ${0.1 * (1 - progress)})` }}>
    <button className="h-8 w-8 rounded-full flex items-center justify-center p-1 transition-all duration-700">
      <ChevronLeft
        size={ICON_SIZE}
        strokeWidth={ICON_STROKE_WIDTH}
        className="transition-all duration-700"
        style={{
          color: progress > 0.5 
            ? `rgba(75, 85, 99, ${0.7 + (progress * 0.3)})` 
            : `rgba(255, 255, 255, ${0.9 - (progress * 0.2)})`
        }}
      />
    </button>
  </div>
);