interface WidgetTabsProps {
  selectedTab: "market" | "limit";
  setSelectedTab: (tab: "market" | "limit") => void;
}

export default function WidgetTabs({
  selectedTab,
  setSelectedTab,
}: WidgetTabsProps) {
  return (
    <div className="w-full mb-6">
      <div className="flex border-b border-gray-300 bg-gray-50 rounded-t-lg">
        <button
          className={`flex-1 text-base font-semibold py-3 px-4 transition-colors duration-300 ease-in-out rounded-t-lg focus:outline-none ${
            selectedTab === "market"
              ? "text-black bg-white border-b-2 border-black shadow-md"
              : "text-gray-600 hover:text-black hover:bg-gray-100"
          }`}
          role="tab"
          aria-selected={selectedTab === "market"}
          aria-controls="market-content"
          id="market-tab"
          onClick={() => setSelectedTab("market")}
          aria-label="Market Order tab"
        >
          Market Order
        </button>
        <button
          className={`flex-1 text-base font-semibold py-3 px-4 transition-colors duration-300 ease-in-out rounded-t-lg focus:outline-none ${
            selectedTab === "limit"
              ? "text-black bg-white border-b-2 border-black shadow-md"
              : "text-gray-600 hover:text-black hover:bg-gray-100"
          }`}
          role="tab"
          aria-selected={selectedTab === "limit"}
          aria-controls="limit-content"
          id="limit-tab"
          onClick={() => setSelectedTab("limit")}
          aria-label="Limit Order tab"
        >
          Limit Order
        </button>
      </div>
    </div>
  );
}
