"use client";

import Image from "next/image";
import styles from "@/app/style/notfound.module.css";
import AnimatedLogo from "@/public/assets/notfound.gif";

export default function NotFound() {
  return (
    <div className={styles.pageLayout}>
      <div className={styles.notFound}>
        <Image
          className={styles.notFoundImg}
          src={AnimatedLogo}
          alt="Animated Logo "
          height={200}
          loading="lazy"
          optimize="false"
        />
        <h2>404</h2>
        <p>The page you are looking for does not exist or has been moved.</p>
      </div>
    </div>
  );
}
