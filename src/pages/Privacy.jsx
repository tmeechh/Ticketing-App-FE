
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        <div className="hero-gradient text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="heading-lg">Privacy Policy</h1>
            <p className="text-lg text-white/80 max-w-2xl mt-4">
              We respect your privacy and are committed to protecting your personal data.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="premium-card mb-8">
              <h2 className="heading-sm mb-4">1. Introduction</h2>
              <p className="mb-4">
                This Privacy Policy explains how EventHorizon collects, uses, and protects your personal information when you use our website and services.
              </p>
              <p>
                We are committed to ensuring that your privacy is protected. We will only use your personal information in accordance with this privacy policy and applicable data protection laws.
              </p>
            </div>
            
            <div className="premium-card mb-8">
              <h2 className="heading-sm mb-4">2. Information We Collect</h2>
              <p className="mb-4">
                We collect several types of information from and about users of our website, including:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Personal Identifiers:</strong> Such as your name, email address, phone number, and billing information when you create an account or make a purchase.
                </li>
                <li>
                  <strong>Account Information:</strong> Details about your account, including your username, password (encrypted), and account preferences.
                </li>
                <li>
                  <strong>Transaction Information:</strong> Details about tickets you've purchased, events you've created, pricing, payment methods, and billing details.
                </li>
                <li>
                  <strong>Device and Usage Information:</strong> Automatically collected information about your device, browser type, IP address, and how you interact with our website.
                </li>
                <li>
                  <strong>Location Information:</strong> General location information based on your IP address, or more precise location if you grant permission (for finding events near you).
                </li>
                <li>
                  <strong>User Content:</strong> Information you provide when creating events, writing reviews, or communicating with us or other users.
                </li>
              </ul>
            </div>
            
            <div className="premium-card mb-8">
              <h2 className="heading-sm mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Providing and improving our services</li>
                <li>Processing transactions and sending transaction notifications</li>
                <li>Creating and maintaining your account</li>
                <li>Sending you service-related notifications</li>
                <li>Responding to your requests, questions, and feedback</li>
                <li>Personalizing your experience and delivering content relevant to your interests</li>
                <li>Sending marketing communications (subject to your preferences)</li>
                <li>Protecting our rights, your safety, and the safety of others</li>
                <li>Detecting and preventing fraud and abuse</li>
                <li>Complying with legal obligations</li>
              </ul>
            </div>
            
            <div className="premium-card mb-8">
              <h2 className="heading-sm mb-4">4. Sharing Your Information</h2>
              <p className="mb-4">
                We may share your personal information with:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>
                  <strong>Event Organizers:</strong> When you purchase tickets, necessary information is shared with the event organizer to facilitate your attendance.
                </li>
                <li>
                  <strong>Service Providers:</strong> We use third-party vendors, service providers, and contractors who help us provide our services (payment processors, cloud storage providers, email service providers, etc.).
                </li>
                <li>
                  <strong>Business Transfers:</strong> If we're involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> We may disclose information when required by law or in response to valid requests by public authorities.
                </li>
              </ul>
              <p>
                We do not sell your personal information to third parties for monetary consideration.
              </p>
            </div>
            
            <div className="premium-card mb-8">
              <h2 className="heading-sm mb-4">5. Cookies and Tracking Technologies</h2>
              <p className="mb-4">
                We use cookies and similar tracking technologies to collect information about your browsing activities and to better understand how you use our service.
              </p>
              <p className="mb-4">
                These technologies help us:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Remember your preferences and settings</li>
                <li>Understand how users interact with our website</li>
                <li>Improve our services</li>
                <li>Provide personalized content and advertisements</li>
                <li>Analyze the effectiveness of our marketing campaigns</li>
              </ul>
              <p>
                You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. However, if you disable or refuse cookies, some parts of our website may become inaccessible or not function properly.
              </p>
            </div>
            
            <div className="premium-card mb-8">
              <h2 className="heading-sm mb-4">6. Data Security</h2>
              <p className="mb-4">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage.
              </p>
              <p className="mb-4">
                However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
              </p>
              <p>
                It is important that you also take precautions to protect your personal information, such as choosing strong passwords and keeping your login credentials confidential.
              </p>
            </div>
            
            <div className="premium-card mb-8">
              <h2 className="heading-sm mb-4">7. Your Privacy Rights</h2>
              <p className="mb-4">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>The right to access and receive a copy of your personal information</li>
                <li>The right to rectify any inaccurate or incomplete personal information</li>
                <li>The right to delete your personal information under certain circumstances</li>
                <li>The right to restrict or object to the processing of your personal information</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent at any time, where processing is based on your consent</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided at the end of this Privacy Policy.
              </p>
            </div>
            
            <div className="premium-card mb-8">
              <h2 className="heading-sm mb-4">8. Children's Privacy</h2>
              <p>
                Our services are not intended for individuals under the age of 16. We do not knowingly collect personal information from children under 16. If we become aware that we have collected personal information from a child under 16 without verification of parental consent, we will take steps to remove that information from our servers.
              </p>
            </div>
            
            <div className="premium-card mb-8">
              <h2 className="heading-sm mb-4">9. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </div>
            
            <div className="premium-card">
              <h2 className="heading-sm mb-4">10. Contact Us</h2>
              <p className="mb-4">
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div>
                <p><strong>Email:</strong> privacy@eventhorizon.com</p>
                <p><strong>Address:</strong> 123 Event Street, New York, NY 10001</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
