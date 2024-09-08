import Image from "next/image";

export default function WidgetTitle() {
  return (
    <div className="flex flex-col items-center text-center">
      <Image
        src="https://ucarecdn.com/b065ba1f-6279-4677-ae8f-0ebc1facb68d/bark_icon.png"
        alt="BARK logo" // Simplified alt text for clarity
        className="w-14 h-14 mb-4 spin" // Consistent size and margin for spacing
        width={56} // Slightly smaller size for a refined look
        height={56} // Slightly smaller size for a refined look
      />
      <div className="text-4xl font-bold mb-1">BARK</div> {/* Main title with margin */}
      <div className="text-2xl font-semibold mb-1 text-gray-700">
        {/* Subtitle if needed */}
      </div>
      <div className="text-base text-sand-400 mb-4">
        Seamlessly trade and mint SPL tokens with ease.
      </div>
    </div>
  );
}
