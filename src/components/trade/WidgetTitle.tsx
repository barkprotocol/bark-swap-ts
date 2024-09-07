import Image from "next/image";

export default function WidgetTitle() {
  return (
    <div className="flex relative">
      <div className="text-purple font-bold flex items-center text-3xl mb-2 md:mb-4 select-none">
        Urani
        <Image
          src="/assets/logos/space/space_logo_tiny.png"
          className="w-12 h-12 mx-4 spin"
          alt=""
          width={48}
          height={48}
        />
        Swap
      </div>
      <div className="absolute -top-9 right-1/3 md:top-0 md:-right-20">
        <span className="ml-2 p-2 bg-purple text-white text-xs rounded-xl font-semibold shadow-md">
          v1 (alpha)
        </span>
      </div>
    </div>
  );
}
