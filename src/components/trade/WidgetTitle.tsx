import Image from "next/image";

export default function WidgetTitle() {
  return (
    <div className="relative flex items-center">
      <div className="text-black font-bold flex items-center text-3xl mb-2 md:mb-4 select-none">
        BARK
        <Image
          src="/assets/logos/bark/bark_logo_tiny.png"
          alt="BARK logo with a spinning effect" // Improved alt text for accessibility
          className="w-12 h-12 mx-4 spin" // Ensure 'spin' class is defined in your CSS
          width={48}
          height={48}
        />
        Swap
      </div>
      <div className="absolute -top-6 right-1/3 md:top-0 md:right-0">
        <span className="ml-2 p-2 bg-black text-white text-xs rounded-xl font-semibold shadow-md">
          v1 (alpha)
        </span>
      </div>
    </div>
  );
}
