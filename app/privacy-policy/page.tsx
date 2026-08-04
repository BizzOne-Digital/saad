export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-black">
      <div className="container-custom max-w-4xl">
        <h1 className="text-5xl font-bold mb-8">
          Privacy <span className="text-gradient-orange">Policy</span>
        </h1>
        
        <div className="prose prose-invert prose-lg max-w-none space-y-8 text-white/80">
          <p className="text-xl">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">Introduction</h2>
            <p>
              Soro Garage Door Services ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Information:</strong> Name, email address, phone number, service address, and postal code when you request a quote or contact us</li>
              <li><strong>Service Information:</strong> Details about your garage door service needs, property type, and project requirements</li>
              <li><strong>Technical Information:</strong> IP address, browser type, device information, and website usage data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">How We Use Your Information</h2>
            <p>We use collected information for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Providing garage door installation, repair, and maintenance services</li>
              <li>Responding to your inquiries and service requests</li>
              <li>Scheduling appointments and providing estimates</li>
              <li>Communicating about your service or project</li>
              <li>Improving our website and services</li>
              <li>Sending promotional materials (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share information with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Service providers who assist in our operations (e.g., email services, analytics)</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent for data processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">Cookies</h2>
            <p>
              Our website may use cookies to enhance user experience. You can control cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us:</p>
            <ul className="list-none space-y-2">
              <li><strong>Email:</strong> <a href="mailto:info@sorogaragedoors.ca" className="text-orange hover:underline">info@sorogaragedoors.ca</a></li>
              <li><strong>Phone:</strong> <a href="tel:+16472990283" className="text-orange hover:underline">647-299-0283</a></li>
              <li><strong>Address:</strong> Greater Toronto Area, Ontario, Canada</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
