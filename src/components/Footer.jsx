import React from "react";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="mx-auto max-w-5xl px-4 py-8">

        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">

          {/* Left */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-blue-500">
              AIRFIBER
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Fast and reliable internet for your home.
            </p>

            <a
                href="https://website.airfiberphilippines.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Check our Website
              </a>
          </div>

          {/* Legal Pages */}
          <div className="flex flex-col gap-3 text-center md:text-left">

            <Link
              to="/privacy-policy"
              className="group"
            >
              <p className="text-sm font-semibold text-slate-700 group-hover:text-blue-600">
                Privacy Policy
              </p>

              <p className="text-xs text-slate-400">
                How we collect, use, and protect your information.
              </p>
            </Link>

            <Link
              to="/User-Data-Deletion"
              className="group"
            >
              <p className="text-sm font-semibold text-slate-700 group-hover:text-blue-600">
                User Data Deletion
              </p>

              <p className="text-xs text-slate-400">
                Learn how to request deletion of your stored data.
              </p>
            </Link>

            <Link
              to="/Terms-Of-Service"
              className="group"
            >
              <p className="text-sm font-semibold text-slate-700 group-hover:text-blue-600">
                Terms of Service
              </p>

              <p className="text-xs text-slate-400">
                Terms and conditions for using our services.
              </p>
            </Link>

          </div>

          {/* Right */}
          <div className="text-center md:text-right">
            <h3 className="font-bold text-slate-800">
              Imus & Tanza Office
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              B3 L39 Carissa Phase 3 Brgy. Bagtas Tanza, Cavite
            </p>

            <p className="text-sm text-slate-500">
              DITO: 0993-473-7029
            </p>

            <p className="text-sm text-slate-500">
              SMART: 0961-447-4024
            </p>

            <a
              href="https://www.facebook.com/profile.php?id=61592589234955"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-slate-600 hover:text-blue-600"
            >
              <FaFacebook className="text-blue-600" />
              Facebook
            </a>
          </div>

        </div>

        <div className="mt-6 border-t border-slate-200 pt-5 text-center text-sm text-slate-400">
          © 2026 AirFiber. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;