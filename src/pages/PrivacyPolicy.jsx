import React from "react";

function PrivacyPolicy() {
  const businessName = "AIRFIBER INTERNET SHOP"; // Replace with exact DTI/SEC registered name
  const privacyEmail = "airfiberhotline@gmail.com"; // Replace with real email

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <a
            href="/"
            className="text-2xl font-bold text-blue-600"
          >
            AIRFIBER
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Privacy Policy
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Last updated: August 17, 2026
          </p>

          <p className="mt-8 leading-7 text-slate-600">
            {businessName}, operating under the AirFiber brand
            ("AirFiber", "we", "our", or "us"), respects your privacy and is
            committed to protecting the personal information of our customers
            and website users.
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            This Privacy Policy explains what information we may collect, how
            we use it, how we protect it, and the choices and rights available
            to you when using our website, internet services, customer account
            services, and automated messaging services.
          </p>

          {/* Information We Collect */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-slate-900">
              1. Information We Collect
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Depending on the services you use, AirFiber may collect or
              process information such as:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600">
              <li>Name</li>
              <li>Customer or account number</li>
              <li>Contact number</li>
              <li>Service or installation address</li>
              <li>Internet subscription or plan information</li>
              <li>Billing and statement information</li>
              <li>Payment reference information</li>
              <li>
                Meta Messenger identifiers, such as your Page-Scoped User ID
                (PSID)
              </li>
              <li>
                Messages or commands sent to our automated Messenger service
                when necessary to process your request
              </li>
              <li>
                Technical information necessary for the security and operation
                of our website and services
              </li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-slate-900">
              2. How We Use Your Information
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              We may use your information for purposes including:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600">
              <li>Providing and maintaining your AirFiber internet service</li>
              <li>Identifying and managing customer accounts</li>
              <li>Generating and providing Statements of Account (SOA)</li>
              <li>Processing customer service requests</li>
              <li>
                Sending billing reminders, service advisories, and other
                service-related communications
              </li>
              <li>
                Responding to commands and requests sent through our automated
                Messenger service
              </li>
              <li>Verifying customer information when necessary</li>
              <li>
                Maintaining the security, reliability, and proper operation of
                our systems
              </li>
              <li>Complying with applicable laws and legal obligations</li>
            </ul>
          </section>

          {/* Meta Messenger */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-slate-900">
              3. Meta Messenger and Facebook
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              AirFiber may provide automated customer service features through
              Facebook Messenger. When you communicate with our Facebook Page,
              we may receive a Page-Scoped User ID (PSID) and information
              contained in messages you send to us.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              We use this information to identify your Messenger conversation,
              associate your Messenger account with your AirFiber customer
              account where applicable, respond to customer requests, provide
              billing information, and send service-related notifications.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Your use of Facebook and Messenger is also subject to Meta's own
              privacy policies and terms. Meta operates independently from
              AirFiber and may process information according to its own
              policies.
            </p>
          </section>

          {/* Sharing */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-slate-900">
              4. Sharing of Information
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              AirFiber does not sell customer personal information.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              We may share or allow processing of information only when
              necessary with trusted service providers that help us operate
              our website, databases, hosting infrastructure, communications,
              and customer service systems.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              We may also disclose information when required by law, legal
              process, government authorities, or when reasonably necessary to
              protect AirFiber, our customers, or others from fraud, abuse, or
              security threats.
            </p>
          </section>

          {/* Storage and Security */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-slate-900">
              5. Data Storage and Security
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              We use reasonable administrative, organizational, and technical
              safeguards designed to protect personal information against
              unauthorized access, alteration, disclosure, loss, or misuse.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              However, no internet-based system or method of electronic storage
              can be guaranteed to be completely secure.
            </p>
          </section>

          {/* Retention */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-slate-900">
              6. Data Retention
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              We retain personal information only for as long as reasonably
              necessary to provide our services, maintain business and billing
              records, fulfill the purposes described in this Privacy Policy,
              resolve disputes, maintain security, and comply with applicable
              legal and regulatory requirements.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Information that is no longer required will be deleted,
              anonymized, or securely disposed of when appropriate and subject
              to applicable legal requirements.
            </p>
          </section>

          {/* Rights */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-slate-900">
              7. Your Privacy Rights
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Subject to applicable Philippine data protection laws, you may
              have rights regarding your personal information, including the
              right to:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600">
              <li>Be informed about how your information is processed</li>
              <li>Request access to your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>
                Object to certain processing of your personal information
              </li>
              <li>
                Request deletion or blocking of information when legally
                applicable
              </li>
              <li>
                Withdraw consent where processing is based on your consent
              </li>
              <li>
                Raise concerns regarding the handling of your personal
                information
              </li>
            </ul>
          </section>

          {/* Data Deletion */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-slate-900">
              8. Requesting Data Deletion
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              You may request deletion of personal information associated with
              our website or Messenger services by contacting AirFiber using
              the contact information below.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Some information may need to be retained when required for legal,
              billing, security, fraud-prevention, or legitimate business
              purposes.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              You may also view our{" "}
              <a
                href="/data-deletion"
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                User Data Deletion Instructions
              </a>{" "}
              for more information.
            </p>
          </section>

          {/* Third Party Services */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-slate-900">
              9. Third-Party Services
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Our services may interact with third-party platforms and service
              providers, including Meta Platforms and technology providers used
              for hosting, databases, and infrastructure.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              These third parties may process information according to their
              own privacy policies and applicable agreements.
            </p>
          </section>

          {/* Changes */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-slate-900">
              10. Changes to This Privacy Policy
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              We may update this Privacy Policy from time to time to reflect
              changes in our services, technology, legal requirements, or
              business practices.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Any updated version will be posted on this page together with a
              revised "Last updated" date.
            </p>
          </section>

          {/* Contact */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-slate-900">
              11. Contact Us
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              If you have questions, concerns, or requests regarding your
              personal information or this Privacy Policy, you may contact:
            </p>

            <div className="mt-5 rounded-xl bg-slate-50 p-5">
              <p className="font-semibold text-slate-900">{businessName}</p>

              <p className="mt-2 text-slate-600">
                Brand: AirFiber Philippines
              </p>

              <p className="mt-1 text-slate-600">
                Website:{" "}
                <a
                  href="https://airfiberphilippines.com"
                  className="text-blue-600 hover:text-blue-700"
                >
                  airfiberphilippines.com
                </a>
              </p>

              <p className="mt-1 text-slate-600">
                Email:{" "}
                <a
                  href={`mailto:${privacyEmail}`}
                  className="text-blue-600 hover:text-blue-700"
                >
                  {privacyEmail}
                </a>
              </p>

              <p className="mt-1 text-slate-600">
                Hotline: 0993-473-7029
              </p>
            </div>
          </section>

          {/* Philippine Privacy Law */}
          <section className="mt-10 border-t border-slate-200 pt-8">
            <p className="text-sm leading-6 text-slate-500">
              AirFiber processes personal information in accordance with
              applicable Philippine laws and regulations, including Republic
              Act No. 10173, otherwise known as the Data Privacy Act of 2012,
              and applicable regulations and issuances of the National Privacy
              Commission.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-8 text-center text-sm text-slate-500">
          © 2026 AirFiber Philippines. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default PrivacyPolicy;