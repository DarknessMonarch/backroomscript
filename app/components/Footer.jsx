"use client";

import Link from "next/link";
import Image from "next/image";
import VisaCard from "@/public/assets/visa.png";
import MpesaLogo from "@/public/assets/mpesa.png";
import styles from "@/app/style/footer.module.css";
import MasterCard from "@/public/assets/masterCard.png";
import AirtelMoney from "@/public/assets/airtelMoney.png";

import { MdEmail as EmailIcon, MdLocationOn as LocationIcon } from "react-icons/md";
import { IoCall as PhoneIcon } from "react-icons/io5";
import { FaApple as AppleIcon, FaTelegram as TelegramIcon } from "react-icons/fa";
import { FaTiktok as TiktokIcon } from "react-icons/fa6";
import { BsInstagram as InstagramIcon } from "react-icons/bs";
import { IoLogoGooglePlaystore as PlaystoreIcon } from "react-icons/io5";

export default function Footer() {
  const handleInstagramClick = () => {
    window.open("https://www.instagram.com/backroomscript", "_blank");
  };

  const handleTiktokClick = () => {
    window.open("https://www.tiktok.com/@backroomscript", "_blank");
  };

  const handleTelegramClick = () => {
    window.open("https://t.me/backroomscript", "_blank");
  };

  return (
    <footer className={styles.footer}>
      {/* Newsletter Section */}
      <div className={styles.newsletter}>
        <div className={styles.newsletterContent}>
          <div className={styles.newsletterText}>
            <h3>Join Our Confidence Community</h3>
            <p>
              Stay connected with BackroomScript! Get exclusive templates, confidence tips, 
              and success stories delivered to your inbox. Subscribe to our newsletter today.
            </p>
          </div>
          <div className={styles.newsletterForm}>
            <input
              type="email"
              placeholder="Enter your email address"
              className={styles.newsletterInput}
            />
            <button className={styles.subscribeBtn}>Subscribe</button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className={styles.footerContent}>
        <div className={styles.footerGrid}>
          {/* Company Info */}
          <div className={styles.footerSection}>
            <h4 className={styles.brandName}>BackroomScript</h4>
            <p className={styles.brandDescription}>
              Empowering conversations, authentic connections, and unshakeable
              confidence for women worldwide.
            </p>
            <div className={styles.socialMedia}>
              <h5>Social Media</h5>
              <div className={styles.socialIcons}>
                <button
                  onClick={handleInstagramClick}
                  className={styles.socialIcon}
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </button>
                <button
                  onClick={handleTiktokClick}
                  className={styles.socialIcon}
                  aria-label="TikTok"
                >
                  <TiktokIcon />
                </button>
                <button
                  onClick={handleTelegramClick}
                  className={styles.socialIcon}
                  aria-label="Telegram"
                >
                  <TelegramIcon />
                </button>
              </div>
            </div>
          </div>

          {/* Company Info Links */}
          <div className={styles.footerSection}>
            <h4>Company Info</h4>
            <div className={styles.footerLinksContainer}>
              <Link href="/" className={styles.footerLink}>
                Home
              </Link>
              <Link href="/tiers" className={styles.footerLink}>
                Plans
              </Link>
              <Link href="/about" className={styles.footerLink}>
                About Us
              </Link>
              <Link href="/contact" className={styles.footerLink}>
                Contact Us
              </Link>
              <Link href="/success-stories" className={styles.footerLink}>
                Success Stories
              </Link>
            </div>
          </div>

          {/* Top Categories */}
          <div className={styles.footerSection}>
            <h4>Our Services</h4>
            <div className={styles.footerLinksContainer}>
              <Link href="/tiers" className={styles.footerLink}>
                View All Plans
              </Link>
              <Link href="/dashboard" className={styles.footerLink}>
                Dashboard
              </Link>
              <Link href="/privacy" className={styles.footerLink}>
                Privacy Policy
              </Link>
              <Link href="/terms" className={styles.footerLink}>
                Terms of Use
              </Link>
            </div>
          </div>

          {/* Download App */}
          <div className={styles.footerSection}>
            <h4>Get in Touch</h4>
            <p className={styles.appDescription}>
              Join thousands of women who've transformed their communication confidence
            </p>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <LocationIcon className={styles.contactIcon} />
                <span>Nairobi, Kenya</span>
              </div>
              <div className={styles.contactItem}>
                <PhoneIcon className={styles.contactIcon} />
                <span>(+254) 796-620-365</span>
              </div>
              <div className={styles.contactItem}>
                <EmailIcon className={styles.contactIcon} />
                <span>support@backroomscript.com</span>
              </div>
            </div>
            <div className={styles.appButtons}>
              <button className={styles.appButton}>
                <PlaystoreIcon className={styles.appIcon} />
                <div>
                  <span>Get it on</span>
                  <strong>Google Play</strong>
                </div>
              </button>
              <button className={styles.appButton}>
                <AppleIcon className={styles.appIcon} />
                <div>
                  <span>Download on the</span>
                  <strong>App Store</strong>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Gateway Section */}
      <div className={styles.paymentSection}>
        <div className={styles.paymentContent}>
          <h4>Secure Payment Options</h4>
          <div className={styles.paymentIcons}>
            <div className={styles.paymentIcon}>
              <Image
                src={MasterCard}
                alt="Mastercard"
                width={50}
                height={32}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className={styles.paymentIcon}>
              <Image
                src={VisaCard}
                alt="Visa"
                width={50}
                height={32}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className={styles.paymentIcon}>
              <Image
                src={MpesaLogo}
                alt="M-Pesa"
                width={50}
                height={32}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className={styles.paymentIcon}>
              <Image
                src={AirtelMoney}
                alt="Airtel Money"
                width={50}
                height={32}
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <div className={styles.footerBottomContent}>
          <p>&copy; 2025 BackroomScript. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}