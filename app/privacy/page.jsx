"use client";

import styles from "@/app/style/legal.module.css";

export default function Privacy() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Privacy Policy</h1>
      <p className={styles.date}>Last updated: November 27, 2025</p>

      <div className={styles.content}>
        <section>
          <h2>1. Information We Collect</h2>
          <p>We collect information you provide when you register for BackroomScript, including your name, email address, and payment information.</p>
        </section>

        <section>
          <h2>2. How We Use Your Information</h2>
          <p>We use your information to provide and improve our services, process payments, send updates, and ensure security.</p>
        </section>

        <section>
          <h2>3. Data Security</h2>
          <p>We implement industry-standard security measures to protect your personal information. Payment processing is handled securely through Paystack.</p>
        </section>

        <section>
          <h2>4. Your Rights</h2>
          <p>You have the right to access, update, or delete your personal information. Contact us at support@backroomscript.com for any requests.</p>
        </section>

        <section>
          <h2>5. Cookies</h2>
          <p>We use cookies to enhance your experience and analyze usage patterns. You can control cookies through your browser settings.</p>
        </section>

        <section>
          <h2>6. Contact Us</h2>
          <p>For any privacy-related questions, please contact us at support@backroomscript.com</p>
        </section>
      </div>
    </div>
  );
}
