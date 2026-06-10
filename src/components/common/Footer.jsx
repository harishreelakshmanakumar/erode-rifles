"use client";

import { Instagram, Youtube, Facebook, MapPin, Phone, Mail } from "lucide-react";
import { useRouter } from "@/context/RouterContext";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Shop", path: "/shop" },
  { label: "Training", path: "/training" },
  { label: "Contact", path: "/contact" },
];

const categoryLinks = [
  { label: "Air Rifles", path: "/shop", category: "Air Rifles" },
  { label: "Air Pistols", path: "/shop", category: "Air Pistols" },
  { label: "Pellets", path: "/shop", category: "Pellets" },
  { label: "Accessories", path: "/shop", category: "Accessories" },
];

export default function Footer() {
  const { navigate } = useRouter();

  const handleNavClick = (path, params = {}) => {
    navigate(path, params);
  };

  return (
    <footer className="bg-white border-t border-erode-black mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: About */}
          <div>
            <h3 className="font-heading text-2xl font-bold text-erode-black tracking-wider mb-4">
              ERODE RIFLES
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Your premier destination for premium air rifles, air pistols,
              pellets, and shooting accessories in Erode, Tamil Nadu.
              Professional training programs available for all skill levels.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-erode-black rounded text-erode-black hover:bg-erode-black hover:text-white transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-erode-black rounded text-erode-black hover:bg-erode-black hover:text-white transition-colors duration-200"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-erode-black rounded text-erode-black hover:bg-erode-black hover:text-white transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="font-heading text-lg font-bold text-erode-black tracking-wider mb-4">
              NAVIGATION
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => handleNavClick(link.path)}
                    className="text-sm text-gray-600 hover:text-erode-green transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h4 className="font-heading text-lg font-bold text-erode-black tracking-wider mb-4">
              CATEGORIES
            </h4>
            <ul className="space-y-3">
              {categoryLinks.map((link) => (
                <li key={link.category}>
                  <button
                    onClick={() => handleNavClick(link.path, { category: link.category })}
                    className="text-sm text-gray-600 hover:text-erode-green transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-heading text-lg font-bold text-erode-black tracking-wider mb-4">
              CONTACT US
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-erode-green mt-0.5 flex-shrink-0" />
                <div>
                  <a
                    href="tel:+919994893337"
                    className="text-sm text-gray-600 hover:text-erode-green transition-colors duration-200"
                  >
                    +91 9994893337
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-erode-green mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:contact@eroderifles.com"
                  className="text-sm text-gray-600 hover:text-erode-green transition-colors duration-200"
                >
                  contact@eroderifles.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-erode-green mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">
                  Opp SDS Gaden, Therku Pallam Road, Keel Thindal, Tamil Nadu 638012
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; 2025 Erode Rifles. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNavClick("/privacy")}
              className="text-xs text-gray-500 hover:text-erode-green transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => handleNavClick("/terms")}
              className="text-xs text-gray-500 hover:text-erode-green transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
