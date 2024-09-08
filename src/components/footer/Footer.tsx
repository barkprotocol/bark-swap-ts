export default function Footer() {
  return (
    <footer className="bg-black text-white py-6 lg:py-8">
      <div className="mx-auto w-full max-w-screen-xl px-4">
        <div className="md:flex md:justify-between">
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-4">
            {/* You can add footer links or sections here */}
          </div>
        </div>
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between mt-6">
          <a
            href="https://www.trade.barkprotocol.net"
            className="text-sm sm:text-base text-sand-400 hover:text-sand-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center">
              <span className="font-semibold">Back to trade</span>
            </div>
          </a>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="https://github.com/barkprotocol"
              className="text-white hover:text-sand-400 text-sm sm:text-base"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="font-semibold">Developers</span>
            </a>

            <a
              href="https://trade.barkprotocol.net/terms/conditions"
              className="text-white hover:text-sand-400 text-sm sm:text-base"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="font-semibold">Terms</span>
            </a>

            <a
              href="https://trade.barkprotocol.net/terms/privacy"
              className="text-white hover:text-orange-400 text-sm sm:text-base"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="font-semibold">Privacy</span>
            </a>
          </div>
        </div>
        <div className="text-center text-sm mt-4 text-sand-400">
          <span>&copy; {new Date().getFullYear()} BARK Protocol. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
