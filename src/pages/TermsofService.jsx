import React from "react";

function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <a href="/" className="text-2xl font-bold text-blue-600">
            AIRFIBER
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <h1 className="text-4xl font-bold text-slate-900">
            Terms of Service
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Last updated: August 17, 2026
          </p>

          <p className="mt-8 leading-7 text-slate-600">
            These Terms of Service govern your use of the AirFiber website,
            online customer services, Statement of Account tools, and automated
            customer service features.
          </p>

          {/* 1 */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-slate-900">
              1. Use of Our Services
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              You may use our website and online services for legitimate
              AirFiber customer transactions, account inquiries, billing
              information, service concerns, and other customer-related
              purposes.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              You agree not to misuse, interfere with, damage, or attempt to
              gain unauthorized access to our website, servers, customer
              accounts, or systems.
            </p>
          </section>

          {/* 2 */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-slate-900">
              2. Customer Information
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              When using certain AirFiber services, you may be required to
              provide information used to identify your customer account.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              You are responsible for providing accurate information and for
              keeping account-related information reasonably secure.
            </p>
          </section>

          {/* 3 */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-slate-900">
              3. Statements of Account and Billing Information
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              AirFiber may provide Statements of Account, outstanding balances,
              payment references, and other billing information through our
              website or customer service systems.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Customers should contact AirFiber if they believe any displayed
              billing or account information is incorrect.
            </p>
          </section>

          {/* 4 */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-slate-900">
              4. Facebook Messenger Services
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              AirFiber may provide automated customer service through Facebook
              Messenger. These features may allow customers to request account
              information, receive Statements of Account, receive billing
              reminders, or receive service advisories.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Facebook and Messenger are services operated by Meta Platforms
              and are also subject to Meta's own terms and policies.
            </p>
          </section>

          {/* 5 */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-slate-900">
              5. Service Availability
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              We aim to keep our online services available and accurate.
              However, we cannot guarantee that the website, automated systems,
              or third-party services will always be available without
              interruption or errors.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Maintenance, technical problems, internet outages, third-party
              platform issues, or other circumstances may temporarily affect
              availability.
            </p>
          </section>

          {/* 6 */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-slate-900">
              6. Prohibited Activities
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              You may not use our services to:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600">
              <li>Access another customer's account without authorization</li>
              <li>Attempt to bypass security systems</li>
              <li>Submit false or misleading information</li>
              <li>Interfere with or disrupt our systems</li>
              <li>Use our services for unlawful activities</li>
            </ul>
          </section>

          {/* 7 */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-slate-900">
              7. Privacy
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Your use of our services is also subject to our{" "}
              <a
                href="/privacy-policy"
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                Privacy Policy
              </a>
              , which explains how AirFiber collects and processes personal
              information.
            </p>
          </section>

          {/* 8 */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-slate-900">
              8. Changes to These Terms
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              AirFiber may update these Terms of Service when our services,
              policies, or legal requirements change.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Updates will be published on this page together with a revised
              "Last updated" date.
            </p>
          </section>

          {/* 9 */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-slate-900">
              9. Contact Us
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              If you have questions regarding these Terms of Service, contact
              AirFiber through our official customer service channels.
            </p>

            <div className="mt-5 rounded-xl bg-slate-50 p-5">
              <p className="font-semibold text-slate-900">
                AirFiber Philippines
              </p>

              <p className="mt-2 text-slate-600">
                Website:{" "}
                <a
                  href="https://airfiberphilippines.com"
                  className="text-blue-600 hover:text-blue-700"
                >
                  airfiberphilippines.com
                </a>
              </p>

              <p className="mt-1 text-slate-600">
                Hotline: 0993-473-7029
              </p>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-8 text-center text-sm text-slate-500">
          © 2026 AirFiber Philippines. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default TermsOfService;