import Image from "next/image";
import { architype_bayer } from "@/app/fonts/config";
import { useMediaQuery } from "@mantine/hooks";

export default function Placeholder() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="flex flex-col items-center bg-sand-50 p-6 md:p-12 min-h-screen">
      <h1
        className={`${architype_bayer.className} tracking-tighter font-medium text-6xl md:text-[8rem] text-black-800 md:pb-4`}
      >
        BarkSwap
      </h1>

      <Image
        src="https://ucarecdn.com/b065ba1f-6279-4677-ae8f-0ebc1facb68d/bark_icon.png"
        alt="BARK Logo"
        className="rotate-12 -mt-8 md:-mt-24"
        width={isDesktop ? 400 : 200}
        height={isDesktop ? 262 : 100} // Adjust height for better proportions
        priority
      />

      <h2 className="font-bold text-center text-lg md:text-2xl text-sand-700 p-4 max-w-xl md:max-w-3xl tracking-wide md:leading-10">
        Toxic-MEV minimization at the application layer.
      </h2>

      <h2 className="font-bold text-center text-lg md:text-2xl text-sand-700 pb-4 max-w-xl md:max-w-3xl tracking-wide md:leading-10">
        <a
          href="https://whitepaper.barkprotocol.net/roadmap"
          className="text-black-600 hover:underline"
          aria-label="View our roadmap for the public launch"
        >
          Please follow our roadmap for our public launch.
        </a>
      </h2>

      <div className="text-center">
        <h3 className="font-bold text-black-600 text-xl md:text-3xl px-6 md:px-12 uppercase tracking-wider">
          Cannot wait?
        </h3>

        <h3 className="font-bold text-black-600 text-xl md:text-3xl px-6 md:px-12 uppercase tracking-wider">
          Become an MEV Agent operator
        </h3>

        <h3 className="font-bold text-black-600 text-xl md:text-3xl px-6 md:px-12 uppercase tracking-wider">
          and get earlier private access.
        </h3>
      </div>
    </div>
  );
}
