export default function WarningMev() {
  return (
    <div className="flex items-center bg-yellow-50 text-yellow-800 border border-yellow-300 rounded-md p-4 text-sm">
      <span className="material-symbols-rounded text-yellow-800 mr-3">
        warning_amber
      </span>
      <p>
        <strong>Warning:</strong> This order will not be MEV protected. Be cautious with slippage.
      </p>
    </div>
  );
}
