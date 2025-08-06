
import { ChevronRight } from 'lucide-react';

const HeaderLocation = () => {
  return (
    <div className="flex items-center bg-black bg-opacity-40 px-2 py-1 rounded-full space-x-1">
      <img
        src="https://flagcdn.com/us.svg"
        alt="USA"
        className="h-4 w-4 rounded-full object-cover"
      />
      <span className="text-white text-xs font-medium">NY</span>
      <ChevronRight className="h-3.5 w-3.5 text-white" />
    </div>
  );
};

export default HeaderLocation;
