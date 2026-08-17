import React from "react";

function UserdataDeletion() {
  const deletionEmail = "YOUR_EMAIL@airfiberphilippines.com";
  const facebookPageUrl = "YOUR_FACEBOOK_PAGE_URL";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <a href="/" className="text-2xl font-bold text-blue-600">
            AIRFIBER
          </a>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            User Data Deletion
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Last updated: August 17, 2026
          </p>

          <p className="mt-8 leading-7 text-slate-600">
            AirFiber respects your privacy. You may request the deletion of
            personal information associated with your AirFiber account or our
            Facebook Messenger services.
          </p>

          {/* How to Request */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-slate-900">
              How to Request Data Deletion
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              To request deletion of your data, send us a message using either
              of the following methods:
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-semibold text-slate-900">
                  Send Us an Email
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Send your data deletion request to:
                </p>

                <a
                  href={`mailto:${deletionEmail}`}
                  className="mt-2 inline-block font-medium text-blue-600 hover:text-blue-700"
                >
                  {deletionEmail}
                </a>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-semibold text-slate-900">
                  Message Our Facebook Page
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  You may also send the same request through our official
                  AirFiber Facebook Page.
                </p>

                <a
                  href={facebookPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block font-medium text-blue-600 hover:text-blue-700"
                >
                  AirFiber Facebook Page
                </a>
              </div>
            </div>
          </section>

          {/* Request Format */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-slate-900">
              Data Deletion Request Format
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Please include the following information in your email or
              Facebook message so we can identify and verify your account.
            </p>

            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-6">
              <p className="font-semibold text-slate-900">
                Subject: Data Deletion Request
              </p>

              <div className="mt-5 space-y-3 text-slate-700">
                <p>
                  <span className="font-medium">Name:</span>
                </p>

                <p>
                  <span className="font-medium">
                    Customer Number (CNO):
                  </span>
                </p>

                <p>
                  <span className="font-medium">PSID:</span>
                </p>

                <p>
                  <span className="font-medium">Phone Number:</span>
                </p>

                <p>
                  <span className="font-medium">Facebook Name:</span>
                </p>

                <p>
                  <span className="font-medium">Request:</span>
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              If you do not know your PSID, you may leave it blank. Please
              describe in the Request field whether you want your Messenger
              PSID removed or are requesting deletion of your customer data.
            </p>
          </section>

          {/* Q&A */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-slate-900">
              Questions & Answers
            </h2>

            <div className="mt-6 space-y-8">
              {/* Active Customer */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Can I have all of my information deleted while I am still an
                  active customer?
                </h3>

                <p className="mt-2 leading-7 text-slate-600">
                  Some information must remain in our system while your AirFiber
                  account is active because it is necessary for operating and
                  managing your internet service.
                </p>

                <p className="mt-3 leading-7 text-slate-600">
                  This may include your name, customer number, service address,
                  contact information, subscription details, billing
                  information, and other information required to maintain your
                  account.
                </p>
              </div>

              {/* PSID */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  What is a PSID?
                </h3>

                <p className="mt-2 leading-7 text-slate-600">
                  A PSID, or Page-Scoped ID, is an identifier associated with
                  your interaction with our Facebook Page through Messenger.
                </p>

                <p className="mt-3 leading-7 text-slate-600">
                  We store your PSID so our automated Messenger system can
                  identify your customer account and provide features such as
                  Statements of Account, billing reminders, and important
                  service announcements.
                </p>
              </div>

              {/* PSID Opt Out */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Can I request removal of my PSID?
                </h3>

                <p className="mt-2 leading-7 text-slate-600">
                  Yes. You may request the removal of your PSID at any time,
                  even if you are still an active AirFiber customer.
                </p>

                <p className="mt-3 leading-7 text-slate-600">
                  Removing your PSID will not cancel your internet service.
                  However, your Messenger account will no longer be connected
                  to our automated customer service system.
                </p>

                <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-5">
                  <p className="font-semibold text-amber-900">
                    If you remove your PSID:
                  </p>

                  <ul className="mt-3 list-disc space-y-2 pl-5 text-amber-900">
                    <li>
                      You may no longer be able to use automated Messenger
                      account features.
                    </li>

                    <li>
                      You may no longer receive automated billing reminders.
                    </li>

                    <li>
                      You may no longer receive important automated service
                      announcements through Messenger.
                    </li>

                    <li>
                      Messenger-based Statement of Account services may no
                      longer recognize your account.
                    </li>
                  </ul>
                </div>

                <p className="mt-4 leading-7 text-slate-600">
                  If you still want your PSID removed after understanding these
                  limitations, we will process your request.
                </p>
              </div>

              {/* Former Customer */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  What happens if I am no longer an AirFiber customer?
                </h3>

                <p className="mt-2 leading-7 text-slate-600">
                  If your AirFiber account has been formally closed, personal
                  information that is no longer necessary will be deleted
                  within two (2) months.
                </p>

                <p className="mt-3 leading-7 text-slate-600">
                  This also includes your stored Messenger PSID because it is no
                  longer needed for our automated customer services.
                </p>

                <p className="mt-3 leading-7 text-slate-600">
                  Certain records may still be retained when required by
                  applicable laws, accounting requirements, dispute resolution,
                  or other legal obligations.
                </p>
              </div>
            </div>
          </section>

          {/* Privacy Policy */}
          <section className="mt-12 border-t border-slate-200 pt-8">
            <p className="text-sm leading-6 text-slate-500">
              For more information about how we handle personal information,
              please read our{" "}
              <a
                href="/privacy-policy"
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                Privacy Policy
              </a>
              .
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

export default UserdataDeletion;