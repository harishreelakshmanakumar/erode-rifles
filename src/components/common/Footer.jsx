"use client";

import { Instagram, Youtube, Facebook, MapPin, Phone, Mail, ArrowUp } from "lucide-react";
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
    window.scrollTo(0, 0);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-erode-black mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: About */}
          <div>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-widest mb-4">
              ERODE RIFLES
            </h3>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Your premier destination for premium air rifles, air pistols,
              pellets, and shooting accessories in Erode, Tamil Nadu.
              Professional training programs available for all skill levels.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/eroderifles"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/20 rounded-lg text-white/60 hover:bg-erode-green hover:text-erode-black hover:border-erode-green transition-all duration-200 flex items-center justify-center"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/20 rounded-lg text-white/60 hover:bg-erode-green hover:text-erode-black hover:border-erode-green transition-all duration-200 flex items-center justify-center"
                aria-label="YouTube"
              >
                <Youtube size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/20 rounded-lg text-white/60 hover:bg-erode-green hover:text-erode-black hover:border-erode-green transition-all duration-200 flex items-center justify-center"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="font-heading text-sm font-bold text-white/40 tracking-widest mb-4 uppercase">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => handleNavClick(link.path)}
                    className="text-sm text-white/70 hover:text-erode-green transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h4 className="font-heading text-sm font-bold text-white/40 tracking-widest mb-4 uppercase">
              Categories
            </h4>
            <ul className="space-y-3">
              {categoryLinks.map((link) => (
                <li key={link.category}>
                  <button
                    onClick={() => handleNavClick(link.path, { category: link.category })}
                    className="text-sm text-white/70 hover:text-erode-green transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-heading text-sm font-bold text-white/40 tracking-widest mb-4 uppercase">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-erode-green mt-0.5 flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:+919994893337"
                    className="text-sm text-white/70 hover:text-erode-green transition-colors duration-200"
                  >
                    +91 9994893337
                  </a>
                  <a
                    href="tel:+919842991959"
                    className="text-sm text-white/70 hover:text-erode-green transition-colors duration-200"
                  >
                    +91 9842991959
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-erode-green mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:contact@eroderifles.com"
                  className="text-sm text-white/70 hover:text-erode-green transition-colors duration-200"
                >
                  contact@eroderifles.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-erode-green mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/70">
                  Opp SDS Gaden, Therku Pallam Road, Keel Thindal, Tamil Nadu 638012
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; 2025 Erode Rifles. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNavClick("/privacy")}
              className="text-xs text-white/40 hover:text-erode-green transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => handleNavClick("/terms")}
              className="text-xs text-white/40 hover:text-erode-green transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
          </div>
          <button
            onClick={scrollToTop}
            className="w-8 h-8 border border-white/20 rounded-lg text-white/40 hover:bg-erode-green hover:text-erode-black hover:border-erode-green transition-all duration-200 flex items-center justify-center cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
