import Image from "next/image";
import { useCallback } from "react";

interface InverterButtonProps {
  onInvert: () => void;
  icon?: string;
  isLoading?: boolean;
}

export default function InverterButton({
  onInvert,
  icon = "swap_vert",
  isLoading = false,
}: InverterButtonProps) {
  // Memoize the onInvert callback to avoid unnecessary re-renders
  const handleClick = useCallback(() => {
    if (!isLoading) {
      onInvert();
    }
  }, [onInvert, isLoading]);

  return (
    <div className="flex justify-center items-center mb-4"> {/* Added mb-4 for spacing */}
      <button
        className={`relative flex items-center justify-center h-14 w-14 rounded-full border border-gray-800 bg-white text-gray-800 hover:bg-gray-900 hover:text-white transition-colors duration-300 ease-in-out shadow-md ${
          isLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        }`}
        onClick={handleClick}
        disabled={isLoading} // Button is disabled when loading
        aria-label={isLoading ? "Loading, please wait..." : "Invert amounts"}
      >
        {isLoading ? (
          <div className="absolute flex items-center justify-center w-full h-full">
            <Image
              className="animate-spin"
              width={40}
              height={40}
              src="https://ucarecdn.com/b065ba1f-6279-4677-ae8f-0ebc1facb68d/bark_icon.png"
              alt="Loading indicator"
            />
          </div>
        ) : (
          <span className="material-symbols-rounded text-3xl">{icon}</span>
        )}
      </button>
    </div>
  );
}
