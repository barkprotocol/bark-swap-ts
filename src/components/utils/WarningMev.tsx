export default function WarningMev() {
  return (
    <div className="flex items-center bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-sm p-3 text-sm mb-4">
      <span className="material-symbols-rounded text-yellow-700 mr-3">
        warning_amber
      </span>
      <p>
        <strong>Warning:</strong> This order will not be MEV protected. Be cautious with slippage.
      </p>
    </div>
  );
}
