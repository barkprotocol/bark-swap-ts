export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-4"></div>
        </div>
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between">
          <a
            href="https://www.trade.barkprotocol.net"
            rel="noopener noreferrer"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm sm:text-base text-orange-400">
                <b>Back to trade</b>
              </span>
            </div>
          </a>
          <div className="flex flex-col sm:flex-row items-center order-2 sm:order-1">
            <div className="flex sm:justify-center items-center mb-8 sm:mb-0">
              <a
                href="https://github.com/barkprotocol"
                className="text-white hover:text-orange-400 text-sm sm:text-base sm:mr-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  <b>Developers</b>
                </span>
              </a>

              <a
                href="https://trade.barkprotocol.net/terms/conditions"
                target="_blank"
                className="text-white hover:text-orange-400 text-sm sm:text-base mr-4"
              >
                <span>
                  <b>Terms</b>
                </span>
              </a>

              <a
                href="https://trade.barkprotocol.net/terms/privacy"
                target="_blank"
                className="text-white hover:text-orange-400 text-sm sm:text-base mr-4"
              >
                <span>
                  <b>Privacy</b>
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-sm mt-4">
          <span>&copy; {new Date().getFullYear()} BARK Protocol. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
