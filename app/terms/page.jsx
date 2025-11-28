"use client";

import styles from "@/app/style/legal.module.css";

export default function Terms() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Terms of Use</h1>
      <p className={styles.date}>Last updated: November 27, 2025</p>

      <div className={styles.content}>
        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using BackroomScript, you accept and agree to be bound by these Terms of Use.</p>
        </section>

        <section>
          <h2>2. Use of Service</h2>
          <p>You agree to use BackroomScript only for lawful purposes and in accordance with these Terms. You must not misuse our services or interfere with their operation.</p>
        </section>

        <section>
          <h2>3. Subscriptions and Payments</h2>
          <p>Paid subscriptions are billed according to your chosen tier. All payments are processed securely through Paystack. Refunds are subject to our refund policy.</p>
        </section>

        <section>
          <h2>4. Intellectual Property</h2>
          <p>All content provided through BackroomScript, including templates and materials, remains our intellectual property. You may use it for personal purposes only.</p>
        </section>

        <section>
          <h2>5. Limitation of Liability</h2>
          <p>BackroomScript is provided "as is" without warranties. We are not liable for any indirect, incidental, or consequential damages arising from your use of the service.</p>
        </section>

        <section>
          <h2>6. Termination</h2>
          <p>We reserve the right to terminate or suspend your account for violations of these Terms.</p>
        </section>

        <section>
          <h2>7. Changes to Terms</h2>
          <p>We may update these Terms at any time. Continued use of the service after changes constitutes acceptance of the new Terms.</p>
        </section>

        <section>
          <h2>8. Contact</h2>
          <p>For questions about these Terms, contact us at support@backroomscript.com</p>
        </section>
      </div>
    </div>
  );
}
