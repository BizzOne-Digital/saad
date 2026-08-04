export default function AccessibilityPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-black">
      <div className="container-custom max-w-4xl">
        <h1 className="text-5xl font-bold mb-8">
          Accessibility <span className="text-gradient-orange">Statement</span>
        </h1>
        
        <div className="prose prose-invert prose-lg max-w-none space-y-8 text-white/80">
          <p className="text-xl">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">Our Commitment</h2>
            <p>
              Soro Garage Door Services is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">Accessibility Features</h2>
            <p>This website includes the following accessibility features:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Semantic HTML for proper document structure</li>
              <li>Keyboard navigation support throughout the site</li>
              <li>Alternative text for images</li>
              <li>Clear and consistent navigation</li>
              <li>Sufficient color contrast for readability</li>
              <li>Responsive design for various devices and screen sizes</li>
              <li>Support for screen readers</li>
              <li>Reduced motion support for users with motion sensitivity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">Standards Compliance</h2>
            <p>
              We strive to conform to WCAG 2.1 Level AA standards and continuously work to improve accessibility across our digital presence.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">Known Limitations</h2>
            <p>
              Despite our best efforts, some content or features may not be fully accessible. We are actively working to improve these areas.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">Feedback</h2>
            <p>
              We welcome feedback on the accessibility of our website. If you encounter accessibility barriers or have suggestions for improvement, please contact us:
            </p>
            <ul className="list-none space-y-2 mt-4">
              <li><strong>Email:</strong> <a href="mailto:info@sorogaragedoors.ca" className="text-orange hover:underline">info@sorogaragedoors.ca</a></li>
              <li><strong>Phone:</strong> <a href="tel:+16472990283" className="text-orange hover:underline">647-299-0283</a></li>
            </ul>
            <p className="mt-4">
              We aim to respond to accessibility feedback within 5 business days.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">Assistive Technology</h2>
            <p>
              This website is designed to be compatible with common assistive technologies including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Screen readers (JAWS, NVDA, VoiceOver)</li>
              <li>Speech recognition software</li>
              <li>Keyboard-only navigation</li>
              <li>Screen magnification tools</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">Service Accessibility</h2>
            <p>
              In addition to website accessibility, Soro Garage Door Services is committed to providing accessible customer service:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Multiple contact methods (phone, text, email, online form)</li>
              <li>Clear communication about services and pricing</li>
              <li>Professional and courteous service for all customers</li>
              <li>Accommodation for customers with specific needs</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">Third-Party Content</h2>
            <p>
              Some third-party content on this site (such as embedded maps or social media) may not be fully accessible. We work with vendors who share our commitment to accessibility.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">Ongoing Efforts</h2>
            <p>
              Accessibility is an ongoing effort. We regularly:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Test our website with accessibility tools</li>
              <li>Review and update content for accessibility</li>
              <li>Train our team on accessibility best practices</li>
              <li>Incorporate user feedback into improvements</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
