interface WidgetTabsProps {
  selectedTab: "market" | "limit";
  setSelectedTab: (tab: "market" | "limit") => void;
}

export default function WidgetTabs({
  selectedTab,
  setSelectedTab,
}: WidgetTabsProps) {
  return (
    <div className="flex w-full font-bold text-xl mb-4">
      <div className="flex w-full border-b border-gray-300">
        <div
          className={`cursor-pointer text-base flex items-center px-4 py-2 ${
            selectedTab === "market"
              ? "text-black-medium border-b-2 border-gray-medium"
              : "text-gray-600"
          }`}
          role="tab"
          aria-selected={selectedTab === "market"}
          onClick={() => setSelectedTab("market")}
        >
          Market Order
        </div>
        <div
          className={`cursor-pointer text-base flex items-center px-4 py-2 ${
            selectedTab === "limit"
              ? "text-black-medium border-b-2 border-gray-medium"
              : "text-gray-600"
          }`}
          role="tab"
          aria-selected={selectedTab === "limit"}
          onClick={() => setSelectedTab("limit")}
        >
          Limit Order
        </div>
      </div>
    </div>
  );
}
