"use client";

import { useState, useRef } from "react";
import { useAuthStore } from "@/app/store/AuthStore";
import { toast } from "sonner";
import { IoCamera, IoLockClosed } from "react-icons/io5";
import styles from "@/app/style/profilePicture.module.css";

export default function ProfilePicture({ size = "medium", editable = true }) {
  const { 
    username, 
    currentTier, 
    profileImage, 
    uploadProfilePicture,
    getProfileImageUrl 
  } = useAuthStore();
  
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const isLocked = currentTier === "starter";
  const isEditable = editable && !isLocked;

  const handleClick = () => {
    if (!editable) return;
    
    if (isLocked) {
      toast.info("Upgrade to Pro to change your profile picture");
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    setUploading(true);
    const result = await uploadProfilePicture(file);
    setUploading(false);

    if (result.success) {
      toast.success(result.message || 'Profile picture updated!');
      setPreview(null);
    } else {
      toast.error(result.message || 'Failed to upload');
      setPreview(null);
    }
  };

  const displayImage = preview || getProfileImageUrl();

  return (
    <div
      className={`${styles.avatarWrapper} ${isLocked ? styles.locked : ""} ${isEditable ? styles.editable : ""}`}
      onClick={handleClick}
    >
      {displayImage ? (
        <img
          src={displayImage}
          alt={`${username}'s profile picture` || "Profile"}
          className={styles.avatarImage}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      ) : null}

      <div
        className={styles.avatarPlaceholder}
        style={{ display: displayImage ? 'none' : 'flex' }}
      >
        {username?.charAt(0).toUpperCase() || "Q"}
      </div>

      {isEditable && (
        <div className={styles.avatarOverlay}>
          {uploading ? (
            <div className={styles.spinner}></div>
          ) : isLocked ? (
            <IoLockClosed className={styles.overlayIcon} />
          ) : (
            <IoCamera className={styles.overlayIcon} />
          )}
        </div>
      )}

      {isEditable && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className={styles.fileInput}
          disabled={isLocked || uploading}
        />
      )}
    </div>
  );
}