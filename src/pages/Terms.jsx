
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        <div className="hero-gradient text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="heading-lg">Terms of Service</h1>
            <p className="text-lg text-white/80 max-w-2xl mt-4">
              Please read these terms carefully before using our platform.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="premium-card mb-8">
              <h2 className="heading-sm mb-4">1. Introduction</h2>
              <p className="mb-4">
                Welcome to EventHorizon. These Terms of Service govern your use of our website and services. By accessing or using our platform, you agree to be bound by these Terms.
              </p>
              <p>
                EventHorizon provides an online platform that allows users to create, discover, and book tickets for various events. These Terms apply to all users of the service, including event organizers, ticket purchasers, and general visitors.
              </p>
            </div>
            
            <div className="premium-card mb-8">
              <h2 className="heading-sm mb-4">2. Account Creation and Responsibilities</h2>
              <p className="mb-4">
                To use certain features of our service, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
              </p>
              <p className="mb-4">
                You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
              </p>
              <p>
                We reserve the right to suspend or terminate your account if any information provided during the registration process or thereafter proves to be inaccurate, not current, or incomplete.
              </p>
            </div>
            
            <div className="premium-card mb-8">
              <h2 className="heading-sm mb-4">3. Event Creation and Ticket Sales</h2>
              <p className="mb-4">
                <strong>For Event Organizers:</strong> By creating an event on our platform, you represent and warrant that you have the right and authority to host such an event and to sell tickets for it.
              </p>
              <p className="mb-4">
                You are solely responsible for the accuracy of event details, ticket pricing, and availability. EventHorizon reserves the right to remove or modify any event listing that violates our policies or applicable laws.
              </p>
              <p className="mb-4">
                <strong>For Ticket Purchasers:</strong> Tickets purchased through our platform are subject to the specific terms and conditions set by the event organizer, in addition to these Terms.
              </p>
              <p>
                Refund policies are determined by event organizers, though EventHorizon generally allows refunds up to 14 days before an event unless otherwise specified.
              </p>
            </div>
            
            <div className="premium-card mb-8">
              <h2 className="heading-sm mb-4">4. Fees and Payments</h2>
              <p className="mb-4">
                EventHorizon charges service fees for ticket sales on our platform. These fees are clearly displayed during the checkout process.
              </p>
              <p className="mb-4">
                For event organizers, we charge a percentage of ticket sales as a platform fee, which will be deducted from the final payout.
              </p>
              <p>
                All payments are processed securely through our payment processors. We do not store your full credit card details on our servers.
              </p>
            </div>
            
            <div className="premium-card mb-8">
              <h2 className="heading-sm mb-4">5. Prohibited Activities</h2>
              <p className="mb-4">
                You agree not to engage in any of the following prohibited activities:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Using the service for any illegal purpose or in violation of any local, state, national, or international law</li>
                <li>Creating fraudulent events or selling counterfeit tickets</li>
                <li>Harassing, threatening, or intimidating other users</li>
                <li>Attempting to gain unauthorized access to our systems or other users' accounts</li>
                <li>Using bots, scrapers, or other automated means to access our service</li>
                <li>Interfering with or disrupting the integrity or performance of the service</li>
              </ul>
              <p>
                Violation of these prohibitions may result in termination of your account and legal action where appropriate.
              </p>
            </div>
            
            <div className="premium-card mb-8">
              <h2 className="heading-sm mb-4">6. Intellectual Property</h2>
              <p className="mb-4">
                EventHorizon and its licensors exclusively own all right, title, and interest in and to the service, including all associated intellectual property rights.
              </p>
              <p className="mb-4">
                You may not duplicate, copy, or reuse any portion of the HTML/CSS, JavaScript, or visual design elements without express written permission from EventHorizon.
              </p>
              <p>
                By uploading content to our platform (such as event descriptions, images, etc.), you grant EventHorizon a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display such content in connection with providing and promoting the service.
              </p>
            </div>
            
            <div className="premium-card mb-8">
              <h2 className="heading-sm mb-4">7. Limitation of Liability</h2>
              <p className="mb-4">
                To the maximum extent permitted by law, EventHorizon shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
              <p>
                EventHorizon does not guarantee the accuracy, completeness, or usefulness of any information on the service and will not be responsible for any losses or damages that may result from your reliance on this information.
              </p>
            </div>
            
            <div className="premium-card mb-8">
              <h2 className="heading-sm mb-4">8. Modifications to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
              </p>
              <p>
                Your continued use of our service after any such changes constitutes your acceptance of the new Terms.
              </p>
            </div>
            
            <div className="premium-card">
              <h2 className="heading-sm mb-4">9. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="mt-4">
                <p><strong>Email:</strong> legal@eventhorizon.com</p>
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

export default Terms;
