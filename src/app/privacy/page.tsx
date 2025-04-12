// src/app/privacy/page.tsx
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy - FitMind AI',
  description: 'Learn how FitMind AI protects your personal information and respects your privacy',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="bg-white py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-gray-500">Last updated: March 20, 2025</p>
          </div>

          <div className="prose prose-green max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Welcome to FitMind AI ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
            </p>
            <p>
              Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access our website or use our services.
            </p>

            <h2>2. Information We Collect</h2>
            <h3>2.1 Personal Information</h3>
            <p>We may collect the following types of personal information:</p>
            <ul>
              <li>Contact information (name, email address, phone number)</li>
              <li>Account credentials (username, password)</li>
              <li>Billing and payment information</li>
              <li>Profile information (age, gender, height, weight, fitness goals)</li>
              <li>Health and fitness data (workout history, nutrition information, sleep patterns)</li>
              <li>Communications with us (customer support inquiries, feedback)</li>
            </ul>

            <h3>2.2 Usage Information</h3>
            <p>We automatically collect certain information about your device and how you interact with our services:</p>
            <ul>
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Log data (pages visited, features used, time spent on platform)</li>
              <li>Location data (with your permission)</li>
              <li>Cookies and similar technologies</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use your personal information for the following purposes:</p>
            <ul>
              <li>Provide and maintain our services</li>
              <li>Process payments and manage your account</li>
              <li>Personalize your experience and deliver tailored content</li>
              <li>Generate AI-powered fitness and nutrition recommendations</li>
              <li>Improve our services and develop new features</li>
              <li>Communicate with you about your account or our services</li>
              <li>Send promotional emails or newsletters (with your consent)</li>
              <li>Protect the security and integrity of our platform</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>4. How We Share Your Information</h2>
            <p>We may share your personal information with the following categories of third parties:</p>
            <ul>
              <li>Service providers that help us deliver our services (payment processors, cloud storage providers, analytics services)</li>
              <li>Business partners (with your consent)</li>
              <li>Legal authorities when required by law or to protect our rights</li>
            </ul>
            <p>
              We do not sell your personal information to third parties. We may share aggregated, anonymized data that does not identify you for business or marketing purposes.
            </p>

            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2>6. Your Rights and Choices</h2>
            <p>Depending on your location, you may have the following rights regarding your personal information:</p>
            <ul>
              <li>Access and review your personal information</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Delete your personal information</li>
              <li>Restrict or object to certain processing activities</li>
              <li>Data portability (receiving your data in a structured, machine-readable format)</li>
              <li>Withdraw consent for optional processing activities</li>
            </ul>
            <p>
              To exercise these rights, please contact us at <a href="mailto:privacy@fitmindai.com">privacy@fitmindai.com</a>.
            </p>

            <h2>7. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to collect information about your browsing activities and to remember your preferences. You can manage your cookie preferences through your browser settings. For more information, please see our <Link href="/cookie-policy" className="text-green-600 hover:text-green-500">Cookie Policy</Link>.
            </p>

            <h2>8. Children's Privacy</h2>
            <p>
              Our services are not intended for individuals under the age of 16. We do not knowingly collect personal information from children. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately.
            </p>

            <h2>9. International Data Transfers</h2>
            <p>
              Your personal information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. We will ensure that appropriate safeguards are in place to protect your personal information in accordance with this Privacy Policy.
            </p>

            <h2>10. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated Privacy Policy on our website and updating the "Last updated" date.
            </p>

            <h2>11. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <p>
              <strong>Email:</strong> <a href="mailto:privacy@fitmindai.com">privacy@fitmindai.com</a><br />
              <strong>Address:</strong> FitMind AI, Inc., 123 Fitness Avenue, Suite 200, San Francisco, CA 94103
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}