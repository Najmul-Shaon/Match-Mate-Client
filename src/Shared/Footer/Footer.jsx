import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-primary text-black py-12 mt-24">
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        <div className="bg-white shadow-lg rounded-2xl border border-secondary p-8">
          {/* Brand Logo */}
          <h2 className="text-4xl font-bold text-accent tracking-wide mb-4">
            Match Mate
          </h2>

          {/* Navigation Links */}
          <nav className="mb-6">
            <ul className="flex flex-col md:flex-row justify-center gap-8 text-lg font-semibold">
              {["Home", "Biodatas", "About", "Contact", "Dashboard"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      // to={`/${item.toLowerCase()}`}
                      to={`/${item === "Home" ? "" : item.toLowerCase()}`}
                      className="hover:text-[#AC0404] transition duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-5 text-2xl mb-6">
            {[
              {
                icon: FaFacebookF,
                href: "https://www.facebook.com/najmulshaonnhs",
              },
              { icon: FaGithub, href: "https://github.com/Najmul-Shaon" },

              {
                icon: FaLinkedin,
                href: "https://www.linkedin.com/in/najmul-shaon",
              },
            ].map(({ icon: Icon, href }, index) => (
              <a
                key={index}
                href={href}
                className="bg-[#D4AF37] p-3 rounded-full text-white hover:bg-[#AC0404] transition duration-300"
              >
                <Icon />
              </a>
            ))}
          </div>

          {/* Decorative Border */}
          <div className="h-1 w-full bg-gradient-to-r from-[#AC0404] via-[#D4AF37] to-[#AC0404] rounded-full mb-4"></div>

          {/* Copyright */}
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Match Mate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
