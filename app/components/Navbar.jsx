"use client";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import LogoImage from "@/public/assets/logo.png";
import styles from "@/app/style/navbar.module.css";
import { useDrawerStore } from "@/app/store/Drawer";
import { useAuthStore } from "@/app/store/AuthStore";
import ProfilePicture from "@/app/components/ProfilePicture";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
  Suspense,
} from "react";
import {
  IoClose as CloseIcon,
  IoPersonOutline as PersonIcon,
  IoChevronDownOutline as ChevronDownIcon,
  IoAdd as IoPlusIcon,
  IoRemove as IoMinusIcon,
  IoSparkles as SparklesIcon,
} from "react-icons/io5";
import { CgMenuGridO as MenuIcon } from "react-icons/cg";
import { MdLogout as LogoutIcon } from "react-icons/md";

const MOBILE_BREAKPOINT = 768;

const useResponsive = () => {
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile };
};

const useNavLinks = () => {
  const { isAuth } = useAuthStore();

  const NAV_LINKS = useMemo(
    () =>
      [
        { href: "/", label: "Home", exact: true },
        { href: "/about", label: "About Us" },
        { href: "/contact", label: "Contact Us" },
        isAuth && { href: "/dashboard", label: "Dashboard" },
        {
          href: "/tiers",
          label: "Plans",
          hasDropdown: true,
          dropdown: [
            { name: "Starter Glow", href: "/tiers" },
            { name: "Radiant Pro", href: "/tiers" },
            { name: "Queen Elite", href: "/tiers" },
          ],
          title: "Choose Your Glow Level",
          description: "One-time investment in yourself. Lifetime confidence.",
        },
        { href: "/success-stories", label: "Success Stories" },
      ].filter(Boolean),
    [isAuth]
  );

  return { NAV_LINKS };
};

const isLinkActive = (pathname, searchParams, link) => {
  if (!pathname) return false;
  if (link.exact) {
    return pathname === link.href;
  }
  if (link.href === "/tiers") {
    return pathname === "/tiers" || pathname.startsWith("/tiers/");
  }
  const patternToCheck = link.matchPattern || link.href;
  return (
    pathname === patternToCheck ||
    pathname.startsWith(`${patternToCheck}/`)
  );
};

const NavItemDropdown = ({
  item,
  setActiveDropdown,
  isMobile,
  onNavItemClick,
}) => {
  const handleDropdownItemClick = () => {
    setActiveDropdown(null);
    if (isMobile) {
      onNavItemClick();
    }
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownContent}>
        {(item.title || item.description) && (
          <div className={styles.dropdownInfo}>
            {item.title && <h2>{item.title}</h2>}
            {item.description && <p>{item.description}</p>}
          </div>
        )}
        <div className={styles.dropdownLinks}>
          {item.dropdown && item.dropdown.length > 0 ? (
            item.dropdown.map((dropdownItem, dropIndex) => (
              <Link
                key={dropdownItem.href || `dropdown-${dropIndex}`}
                href={dropdownItem.href}
                className={styles.dropdownItem}
                onClick={handleDropdownItemClick}
              >
                {dropdownItem.name}
              </Link>
            ))
          ) : (
            <div className={styles.dropdownLoading}>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

const NavigationLinks = ({
  pathname,
  searchParams,
  onLinkClick,
  activeDropdown,
  setActiveDropdown,
  isMobile,
  navLinks,
}) => {
  const router = useRouter();
  const dropdownRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown !== null && !isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, [activeDropdown, setActiveDropdown, isMobile]);

  const handleInteraction = (link, index) => {
    if (link.hasDropdown) {
      if (isMobile) {
        setActiveDropdown(activeDropdown === index ? null : index);
      } else {
        setActiveDropdown(activeDropdown === index ? null : index);
      }
    } else {
      if (isMobile) {
        onLinkClick();
      }
    }
  };

  const handleMouseEnter = (index, hasDropdown) => {
    if (!isMobile && hasDropdown) {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      setActiveDropdown(index);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      closeTimeoutRef.current = setTimeout(() => {
        setActiveDropdown(null);
      }, 150);
    }
  };

  const handleDropdownMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleDropdownMouseLeave = () => {
    if (!isMobile) {
      setActiveDropdown(null);
    }
  };

  return (
    <div className={styles.navigationLinks}>
      {navLinks.map((link, index) => {
        const isActive = activeDropdown === index;
        const isCurrentPage = isLinkActive(pathname, searchParams, link);

        return (
          <div
            key={link.href || `nav-link-${index}`}
            className={styles.navLinkWrapper}
            onMouseEnter={() => handleMouseEnter(index, link.hasDropdown)}
            onMouseLeave={handleMouseLeave}
          >
            <div className={styles.navItemLinkContainer}>
              <Link
                href={link.href}
                className={`${styles.navLink} ${
                  isCurrentPage ? styles.activeNavLink : ""
                }`}
                onClick={(e) => {
                  if (isMobile && link.hasDropdown) {
                    e.preventDefault();
                    handleInteraction(link, index);
                  } else if (!link.hasDropdown) {
                    onLinkClick();
                  }
                }}
              >
                {link.label}
                {link.hasDropdown && (
                  <>
                    {isMobile ? (
                      isActive ? (
                        <IoMinusIcon className={styles.mobileIcon} />
                      ) : (
                        <IoPlusIcon className={styles.mobileIcon} />
                      )
                    ) : (
                      <ChevronDownIcon
                        className={`${styles.chevron} ${
                          isActive ? styles.chevronOpen : ""
                        }`}
                      />
                    )}
                  </>
                )}
              </Link>
            </div>
            {link.hasDropdown && isActive && (
              <div
                ref={dropdownRef}
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <NavItemDropdown
                  item={link}
                  setActiveDropdown={setActiveDropdown}
                  isMobile={isMobile}
                  onNavItemClick={onLinkClick}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const MobileMenuOverlay = ({
  isOpen,
  onClose,
  pathname,
  searchParams,
  activeDropdown,
  setActiveDropdown,
  navLinks,
  onLogoClick,
}) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div
      className={`${styles.mobileMenuOverlay} ${
        isOpen && !isClosing ? styles.slideIn : ""
      } ${isClosing ? styles.slideOut : ""}`}
      onClick={handleOverlayClick}
    >
      <div className={styles.mobileMenuContent}>
        <div className={styles.mobileMenuHeader}>
          <div className={styles.logoContainer} onClick={onLogoClick}>
            <Image
              src={LogoImage}
              alt="Logo"
              className={styles.logoImage}
              width={50}
              height={50}
              priority
            />
          </div>
          <button
            onClick={handleClose}
            className={styles.mobileMenuClose}
            aria-label="Close menu"
          >
            <CloseIcon className={styles.closeIcon} />
          </button>
        </div>
        <NavigationLinks
          pathname={pathname}
          searchParams={searchParams}
          onLinkClick={handleClose}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          isMobile={true}
          navLinks={navLinks}
        />
      </div>
    </div>
  );
};

const LogoSection = ({ onLogoClick }) => (
  <div className={styles.logoContainer} onClick={onLogoClick}>
    <Image
      src={LogoImage}
      alt="Logo"
      className={styles.logoImage}
      width={50}
      height={50}
      priority
    />
  </div>
);

const RightSection = ({
  isAuth,
  username,
  currentTier,
  onLogout,
  isLoggingOut,
  isMobile,
}) => (
  <div className={styles.rightSection}>
    {isAuth ? (
      <div className={styles.userSection}>
          <ProfilePicture />
        <button
          onClick={onLogout}
          className={styles.logoutButton}
          disabled={isLoggingOut}
          aria-label="Logout"
        >
          <LogoutIcon className={styles.logoutIcon} />
        </button>
      </div>
    ) : (
      <Link href="/authentication/login" className={styles.accountSection}>
        <PersonIcon className={styles.accountIcon} />
      </Link>
    )}
  </div>
);

const CTASection = () => (
  <Link href="/tiers" className={styles.ctaButton}>
    <SparklesIcon className={styles.sparkleIcon} />
    <span>Start Your Glow</span>
  </Link>
);

const NavbarSkeleton = () => (
  <nav className={styles.navbarWrapper}>
    <div className={styles.navbarContainer}>
      <div className={styles.skeletonLoader}></div>
    </div>
  </nav>
);

const NavbarContent = () => {
  const {
    isOpen: isMobileMenuOpen,
    toggleOpen: toggleMobileMenu,
    setClose: closeMobileMenu,
  } = useDrawerStore();

  const { isMobile } = useResponsive();
  const { NAV_LINKS } = useNavLinks();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [activeDropdown, setActiveDropdown] = useState(null);
  const { isAuth, username, currentTier, logout } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLinkClick = useCallback(() => {
    if (isMobile) {
      closeMobileMenu();
    }
    setActiveDropdown(null);
  }, [isMobile, closeMobileMenu]);

  const handleLogoClick = useCallback(() => {
    setActiveDropdown(null);
    if (isMobile) {
      closeMobileMenu();
    }
    router.push("/");
  }, [isMobile, router, closeMobileMenu]);

  const handleLogout = useCallback(async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    try {
      const result = await logout();
      if (result?.success) {
        toast.success("Logged out successfully");
        closeMobileMenu();
        router.push("/");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred during logout");
    } finally {
      setIsLoggingOut(false);
    }
  }, [isLoggingOut, logout, closeMobileMenu, router]);

  const handleMobileMenuToggle = useCallback(() => {
    setActiveDropdown(null);
    toggleMobileMenu();
  }, [toggleMobileMenu]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen, closeMobileMenu]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className={styles.navbarWrapper}>
        <div className={styles.navbarContainer}>
          <LogoSection onLogoClick={handleLogoClick} />

          {!isMobile && (
            <NavigationLinks
              pathname={pathname}
              searchParams={searchParams}
              onLinkClick={handleLinkClick}
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
              isMobile={false}
              navLinks={NAV_LINKS}
            />
          )}

          <div className={styles.navActions}>
            <RightSection
              isAuth={isAuth}
              username={username}
              currentTier={currentTier}
              onLogout={handleLogout}
              isLoggingOut={isLoggingOut}
              isMobile={isMobile}
            />
            {!isMobile && <CTASection />}
            {isMobile && (
              <button
                onClick={handleMobileMenuToggle}
                className={styles.mobileMenuButton}
                aria-label="Toggle menu"
              >
                {!isMobileMenuOpen ? (
                  <MenuIcon className={styles.menuIcon} />
                ) : (
                  <CloseIcon className={styles.closeIcon} />
                )}
              </button>
            )}
          </div>
        </div>
      </nav>

      <MobileMenuOverlay
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        pathname={pathname}
        searchParams={searchParams}
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
        navLinks={NAV_LINKS}
        onLogoClick={handleLogoClick}
      />
    </>
  );
};

export default function Navbar() {
  return (
    <Suspense fallback={<NavbarSkeleton />}>
      <NavbarContent />
    </Suspense>
  );
}