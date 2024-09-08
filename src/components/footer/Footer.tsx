import { FaTwitter, FaTelegramPlane, FaMediumM } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-transparent text-white py-8 lg:py-12">
      <div className="mx-auto w-full max-w-screen-lg px-4">
        {/* Footer Links */}
        <div className="grid grid-cols-2 gap-8 sm:gap-12 md:grid-cols-4 mb-6">
          {/* Add links or sections here */}
        </div>

        {/* Social Media and Back to Trade */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
          <a
            href="https://www.trade.barkprotocol.net"
            className="text-sm sm:text-base text-gray-400 hover:text-gray-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="font-semibold">Back to trade</span>
          </a>

          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a
              href="https://github.com/barkprotocol"
              className="text-gray-400 hover:text-gray-300 text-lg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Developers"
            >
              Developers
            </a>
            <a
              href="https://trade.barkprotocol.net/terms/conditions"
              className="text-gray-400 hover:text-gray-300 text-lg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Terms"
            >
              Terms
            </a>
            <a
              href="https://trade.barkprotocol.net/terms/privacy"
              className="text-gray-400 hover:text-gray-300 text-lg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Privacy"
            >
              Privacy
            </a>
          </div>
        </div>

        {/* Follow Us */}
        <div className="text-center mb-6">
          <span className="block text-xl font-semibold mb-2">Follow Us</span>
          <div className="flex justify-center space-x-6">
            <a
              href="https://twitter.com/barkprotocol"
              className="text-white hover:text-black-400 text-3xl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://t.me/barkprotocol"
              className="text-white hover:text-black-400 text-3xl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Telegram"
            >
              <FaTelegramPlane />
            </a>
            <a
              href="https://medium.com/@barkprotocol"
              className="text-white hover:text-black-400 text-3xl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Medium"
            >
              <FaMediumM />
            </a>
          </div>
        </div>

        {/* Copyright and Terms Link */}
        <div className="text-center text-sm text-gray-400">
          <span>&copy; {new Date().getFullYear()} BARK Protocol. All rights reserved.</span>
          <a
            href="https://trade.barkprotocol.net/terms/conditions"
            className="text-gray-400 hover:text-gray-600 ml-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
