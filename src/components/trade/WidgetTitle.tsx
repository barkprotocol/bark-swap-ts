import Image from "next/image";

export default function WidgetTitle() {
  return (
    <div className="flex flex-col items-center text-center p-6">
      {/* Logo */}
      <div className="relative w-24 h-24 bg-gray-100 rounded-full border border-gray-300 flex items-center justify-center mb-6">
        <Image
          src="https://ucarecdn.com/b065ba1f-6279-4677-ae8f-0ebc1facb68d/bark_icon.png"
          alt="BARK logo"
          className="w-20 h-20 object-cover transition-transform transform hover:scale-105"
          width={80} // Consistent with the class
          height={80} // Consistent with the class
        />
      </div>
      <div className="text-4xl font-bold mb-3 text-gray-800 dark:text-gray-200">
        BARK
      </div>
      <div className="text-2xl font-semibold mb-4 text-gray-600 dark:text-gray-400">
        {/* Subtitle if needed */}
      </div>
      <div className="text-lg text-gray-500 dark:text-gray-300">
        Seamlessly trade and mint SPL tokens with ease.
      </div>
    </div>
  );
}
