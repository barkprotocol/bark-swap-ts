import Image from "next/image";

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
  return (
    <div className="text-center -my-6 text-xs flex justify-center items-center">
      <button
        className="shadow-lg rounded-xl text-3xl text-gray-800 border-2 border-gray-800 bg-white hover:text-white hover:bg-gray-800 hover:border-white transition-all h-12 w-12 flex items-center justify-center z-10"
        onClick={onInvert}
        disabled={isLoading}
        aria-label={isLoading ? "Loading..." : "Invert Amounts"}
      >
        {isLoading ? (
          <Image
            className="block spinning"
            width={35}
            height={35}
            src="https://ucarecdn.com/b065ba1f-6279-4677-ae8f-0ebc1facb68d/bark_icon.png"
            alt="Loading..."
          />
        ) : (
          <span className="material-symbols-rounded text-3xl block p-2">
            {icon}
          </span>
        )}
      </button>
    </div>
  );
}
