import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <h2 className="text-white text-2xl font-bold mb-3">ShopZone</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your one-stop destination for the latest fashion, accessories, and
              lifestyle products at the best prices.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {["f", "in", "tw", "yt"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-9 h-9 rounded-full bg-gray-700 hover:bg-gray-500 flex items-center justify-center text-xs font-bold text-white transition-colors duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-base mb-4 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["Home", "Shop", "About Us", "Contact", "Blog"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-base mb-4 uppercase tracking-wider">
              Categories
            </h3>
            <ul className="space-y-2">
              {["Men", "Women", "Kids", "Footwear", "Accessories", "Sale"].map(
                (cat) => (
                  <li key={cat}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {cat}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-base mb-4 uppercase tracking-wider">
              Newsletter
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to get the latest deals and offers directly in your
              inbox.
            </p>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 rounded-lg bg-gray-700 text-sm text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-white transition"
              />
              <button className="w-full px-4 py-2.5 bg-white text-gray-900 text-sm font-semibold rounded-lg hover:bg-gray-200 active:scale-95 transition-all duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-500 text-center sm:text-left">
              © 2024 ShopZone. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {["Privacy Policy", "Terms of Service", "Refund Policy"].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-xs text-gray-500 hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
