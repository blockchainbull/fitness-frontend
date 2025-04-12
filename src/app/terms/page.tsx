// src/app/terms/page.tsx
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service - FitMind AI',
  description: 'The terms and conditions governing your use of FitMind AI services',
};

export default function TermsOfServicePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="bg-white py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Terms of Service
            </h1>
            <p className="mt-4 text-gray-500">Last updated: March 20, 2025</p>
          </div>

          <div className="prose prose-green max-w-none">
            <h2>1. Agreement to Terms</h2>
            <p>
              These Terms of Service ("Terms") constitute a legally binding agreement between you and FitMind AI, Inc. ("FitMind AI," "we," "our," or "us") governing your access to and use of the FitMind AI website, mobile application, and services (collectively, the "Services").
            </p>
            <p>
              By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services.
            </p>

            <h2>2. Eligibility</h2>
            <p>
              You must be at least 16 years old to use our Services. By using our Services, you represent and warrant that:
            </p>
            <ul>
              <li>You are at least 16 years old;</li>
              <li>You have the legal capacity to enter into a binding agreement with FitMind AI; and</li>
              <li>Your use of the Services does not violate any applicable law or regulation.</li>
            </ul>
            <p>
              If you are using the Services on behalf of a company, organization, or other entity, you represent and warrant that you have the authority to bind that entity to these Terms.
            </p>

            <h2>3. Account Registration</h2>
            <p>
              To access certain features of our Services, you may need to register for an account. When you register, you agree to:
            </p>
            <ul>
              <li>Provide accurate, current, and complete information;</li>
              <li>Maintain and promptly update your account information;</li>
              <li>Keep your password secure and confidential;</li>
              <li>Be responsible for all activities that occur under your account; and</li>
              <li>Notify us immediately of any unauthorized use of your account.</li>
            </ul>
            <p>
              We reserve the right to suspend or terminate your account if any information you provide is inaccurate, misleading, or incomplete, or if you violate these Terms.
            </p>

            <h2>4. Subscription and Payment</h2>
            <h3>4.1 Subscription Plans</h3>
            <p>
              We offer various subscription plans for our Services. The features and limitations of each plan are described on our website. We reserve the right to modify, terminate, or otherwise amend our offered subscription plans.
            </p>

            <h3>4.2 Free Trial</h3>
            <p>
              We may offer a free trial period for certain subscription plans. At the end of the trial period, your account will automatically convert to a paid subscription unless you cancel before the trial period ends.
            </p>

            <h3>4.3 Payment</h3>
            <p>
              By providing a payment method, you authorize us to charge you on a recurring basis for your subscription. You are responsible for all charges incurred under your account.
            </p>

            <h3>4.4 Cancellation and Refunds</h3>
            <p>
              You may cancel your subscription at any time through your account settings. Cancellation will take effect at the end of your current billing cycle. We do not provide refunds for partial subscription periods.
            </p>

            <h2>5. User Content</h2>
            <p>
              Our Services may allow you to create, upload, store, send, or share content, including but not limited to text, photos, videos, and fitness data ("User Content"). You retain all rights in your User Content, but you grant us a non-exclusive, worldwide, royalty-free, sublicensable, and transferable license to use, reproduce, modify, adapt, publish, translate, distribute, and display your User Content in connection with providing and improving our Services.
            </p>
            <p>
              You are solely responsible for your User Content and represent and warrant that:
            </p>
            <ul>
              <li>You own or have the necessary rights to your User Content;</li>
              <li>Your User Content does not infringe or violate the rights of any third party; and</li>
              <li>Your User Content complies with these Terms and all applicable laws.</li>
            </ul>

            <h2>6. Prohibited Conduct</h2>
            <p>
              You agree not to engage in any of the following prohibited activities:
            </p>
            <ul>
              <li>Using the Services for any illegal purpose or in violation of any local, state, national, or international law;</li>
              <li>Harassing, threatening, or intimidating other users;</li>
              <li>Impersonating any person or entity, or falsely stating or otherwise misrepresenting your affiliation with a person or entity;</li>
              <li>Interfering with or disrupting the Services or servers or networks connected to the Services;</li>
              <li>Attempting to gain unauthorized access to any portion of the Services;</li>
              <li>Scraping, data mining, or otherwise collecting information from the Services without our consent;</li>
              <li>Using the Services to send unsolicited communications;</li>
              <li>Submitting false or misleading information; or</li>
              <li>Encouraging or enabling any other individual to do any of the foregoing.</li>
            </ul>

            <h2>7. Intellectual Property Rights</h2>
            <p>
              The Services and their contents, features, and functionality, including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof, are owned by FitMind AI, its licensors, or other providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
            <p>
              These Terms do not grant you any right, title, or interest in the Services or our content, nor any intellectual property rights, except for the limited license to use the Services in accordance with these Terms.
            </p>

            <h2>8. Health and Fitness Disclaimer</h2>
            <p>
              Our Services provide general fitness and nutrition information and AI-generated recommendations. This information is not medical advice and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
            <p>
              You should consult with a healthcare professional before starting any diet, exercise, or supplementation program, before taking any medication, or if you have or suspect you might have a health problem.
            </p>

            <h2>9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, in no event will FitMind AI, its affiliates, directors, employees, agents, or licensors be liable for any indirect, special, incidental, consequential, or punitive damages, including but not limited to, personal injury, pain and suffering, emotional distress, loss of revenue, loss of profits, loss of business or anticipated savings, loss of use, loss of goodwill, loss of data, or other intangible losses, arising out of or in connection with:
            </p>
            <ul>
              <li>Your use or inability to use the Services;</li>
              <li>Any conduct or content of any third party on the Services;</li>
              <li>Any content obtained from the Services; or</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
            </ul>
            <p>
              Our total liability to you for all claims arising from or related to the Services or these Terms will not exceed the amount you have paid to FitMind AI in the last twelve (12) months.
            </p>

            <h2>10. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless FitMind AI, its affiliates, directors, employees, agents, and licensors from and against all claims, damages, obligations, losses, liabilities, costs, and expenses arising from:
            </p>
            <ul>
              <li>Your use of the Services;</li>
              <li>Your violation of these Terms;</li>
              <li>Your violation of any third-party right, including without limitation any intellectual property right or privacy right; or</li>
              <li>Any claim that your User Content caused damage to a third party.</li>
            </ul>

            <h2>11. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. If we make material changes to these Terms, we will notify you by email or by posting a notice on our website. Your continued use of the Services after such notification constitutes your acceptance of the modified Terms.
            </p>

            <h2>12. Termination</h2>
            <p>
              We may terminate or suspend your account and access to the Services at any time, without prior notice or liability, for any reason, including if you breach these Terms.
            </p>
            <p>
              Upon termination, your right to use the Services will immediately cease. All provisions of these Terms which by their nature should survive termination shall survive, including without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>

            <h2>13. Governing Law and Dispute Resolution</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
            </p>
            <p>
              Any dispute arising from or relating to these Terms or the Services shall be resolved through binding arbitration in San Francisco, California, in accordance with the rules of the American Arbitration Association. The arbitration shall be conducted by a single arbitrator, and judgment on the award rendered by the arbitrator may be entered in any court having jurisdiction thereof.
            </p>
            <p>
              You agree that any arbitration shall be conducted on an individual basis and not as a class, consolidated, or representative action. If for any reason a claim proceeds in court rather than in arbitration, you waive any right to a jury trial.
            </p>

            <h2>14. Severability</h2>
            <p>
              If any provision of these Terms is held to be invalid, illegal, or unenforceable, such provision shall be deemed modified to the minimum extent necessary to make it valid, legal, and enforceable while preserving its intent. If such modification is not possible, the relevant provision shall be severed from these Terms, and the remaining provisions shall remain in full force and effect.
            </p>

            <h2>15. Entire Agreement</h2>
            <p>
              These Terms, together with our Privacy Policy and any other agreements expressly incorporated by reference herein, constitute the entire agreement between you and FitMind AI concerning the Services and supersede all prior or contemporaneous communications, whether electronic, oral, or written, between you and FitMind AI.
            </p>

            <h2>16. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p>
              <strong>Email:</strong> <a href="mailto:legal@fitmindai.com">legal@fitmindai.com</a><br />
              <strong>Address:</strong> FitMind AI, Inc., 123 Fitness Avenue, Suite 200, San Francisco, CA 94103
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}