"use client";

import { useEffect } from "react";
import styles from "@/app/style/info.module.css";

export default function About() {
  useEffect(() => {
    const sections = document.querySelectorAll(`.${styles.section}`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section) => {
      section.style.opacity = "0";
      section.style.transform = "translateY(20px)";
      section.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.info}>
      <div className={styles.infoHeader}>
        <h1>About BackroomScript</h1>
      </div>
      <div className={styles.section}>
        <h2>
          BackroomScript is your premier destination for conversation confidence and authentic connection.
        </h2>
        <p>
          We specialize in providing women with expertly crafted conversation templates and communication strategies that combine authenticity with confidence. Our carefully curated collection features proven templates designed to enhance your conversations in dating, business, and social settings. From first-date conversation starters to professional networking scripts, we offer everything you need to speak with power and grace. Our user-friendly online platform ensures a seamless experience across all devices, making it easy to access and master the conversation templates you need.
        </p>
      </div>
      <div className={styles.section}>
        <h2>Why Choose BackroomScript?</h2>
        <p>
          At BackroomScript, we are committed to empowering women with the communication skills they deserve. Our templates are created by women who understand the unique challenges of modern communication and have helped thousands build unshakeable confidence. We offer authentic, tested templates, lifetime access to all resources, and excellent customer support to make your journey to confident communication as smooth as possible. Whether you're navigating the dating world or building a business empire, our extensive range of conversation templates caters to all areas of your life.
        </p>
      </div>
      <div className={styles.section}>
        <h2>The Importance of Confident Communication</h2>
        <p>
          Mastering the art of conversation is essential for anyone who values authentic connections and meaningful relationships. Strong communication skills not only make interactions more enjoyable but also open doors to opportunities and create lasting impressions. At BackroomScript, we understand that the right words at the right time can transform your life, whether you're sending that first message on a dating app or closing an important business deal. Our templates are designed to help you express yourself authentically while maintaining your confidence and boundaries.
        </p>
      </div>
       
      <div className={styles.section}>
        <h2>
          Why Conversation Templates Matter for Your Success
        </h2>
        <p>
          Quality conversation templates are the foundation of confident communication and meaningful connections. They offer structure, confidence, and authenticity that make every interaction more impactful and satisfying. Here's why investing in conversation mastery is worthwhile:
        </p>

        <ul className={styles.bulletList}>
          <li>
            Build Authentic Confidence: Our templates help you express yourself genuinely while maintaining boundaries and self-respect in every conversation.
          </li>
          <li>
            Enhanced Communication Skills: Premium templates provide better conversation flow, natural responses, and engaging dialogue that creates real connections.
          </li>
          <li>
            Time-Saving Solutions: Well-crafted templates streamline your communication, helping you respond quickly and effectively without overthinking every message.
          </li>
          <li>
            Proven Success Patterns: Our templates include strategies that have worked for thousands of women in dating, business, and social situations.
          </li>
          <li>
            Versatile Application: Use our templates across multiple platforms and situations - from dating apps to business emails to social media engagement.
          </li>
        </ul>
        <p>
          Transform your communication style with our premium collection of templates and strategies. Every template in our library is chosen for its effectiveness, authenticity, and ability to create genuine connections.
        </p>
      </div>
      <div className={styles.section}>
        <h2>Getting Started with BackroomScript</h2>
        <p>
          When choosing your tier at BackroomScript, consider your communication goals, learning style, and budget. We recommend starting with our essential Starter Glow package if you're new to conversation templates, then upgrading to Radiant Pro or Queen Elite as your confidence grows. Our detailed tier descriptions include template examples and success stories to help you make informed decisions. Remember that investing in communication skills upfront creates lifelong benefits through better relationships and opportunities.
        </p>
      </div>
      <div className={styles.section}>
        <h2>Our Template Categories</h2>
        <p>
          Explore our comprehensive range of conversation templates across these categories:
        </p>
        <ul className={styles.bulletList}>
          <li>Dating & Flirting Templates</li>
          <li>Business Communication Scripts</li>
          <li>Social Confidence Builders</li>
          <li>Content Creation Guides</li>
          <li>Professional Networking Tools</li>
        </ul>
      </div>
      <div className={styles.section}>
        <p>
          BackroomScript is your trusted partner in building communication confidence. We provide quality templates, competitive pricing, and exceptional support to help you master conversations that matter. With instant access and lifetime updates, we make it easy to speak with confidence and authenticity.
        </p>
      </div>
    </div>
  );
}
