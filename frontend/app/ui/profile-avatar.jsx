'use client';
import { useState } from 'react';
import ProfileMenu from './workspace-modals/profile-menu';
import styles from './profile-avatar.module.css';


export default function ProfileAvatar({ user }) {
    const [profileModalDisplayed, setProfileModalDisplayed] = useState(false);

    const toggleProfileModal = () => {
        setProfileModalDisplayed(!profileModalDisplayed);
    }


    return (
        <>
            <div className={styles.profileAvatarContainer}
                onClick={toggleProfileModal}
            >
                <img src={user.img} alt="Profile Avatar" />
            </div>

            {profileModalDisplayed && (
                <>
                    <ProfileMenu user={user} />
                </>
            )}
        </>
    )
}