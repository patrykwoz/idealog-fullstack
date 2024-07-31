'use client';
import { useState, useEffect, useRef } from 'react';
import ProfileMenu from './workspace-modals/profile-menu';
import styles from './profile-avatar.module.css';

export default function ProfileAvatar({ user }) {
    const [profileModalDisplayed, setProfileModalDisplayed] = useState(false);
    const profileAvatarRef = useRef(null);
    const profileMenuRef = useRef(null);

    const fallbackImage = "https://images.unsplash.com/photo-1601247387431-7966d811f30b?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const userImg = user.img ? user.img : fallbackImage;
    const toggleProfileModal = () => {
        setProfileModalDisplayed(!profileModalDisplayed);
    }

    const handleClickOutside = (event) => {
        if (profileAvatarRef.current && profileMenuRef.current &&
            !profileAvatarRef.current.contains(event.target) &&
            !profileMenuRef.current.contains(event.target)) {
            setProfileModalDisplayed(false);
        }
    }

    useEffect(() => {
        if (profileModalDisplayed) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [profileModalDisplayed]);

    return (
        <>
            <div className={styles.profileAvatarContainer}
                onClick={toggleProfileModal}
                ref={profileAvatarRef}
            >
                <img src={userImg} alt="Profile Avatar" />
            </div>

            {profileModalDisplayed && (
                <div ref={profileMenuRef}>
                    <ProfileMenu user={user} />
                </div>
            )}
        </>
    )
}
