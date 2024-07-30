'use client';
import styles from './profile-menu.module.css';

export default function ProfileMenu({ user }) {
    return (
        <>
            <div className={styles.profileMenuContainer}>
                <div className={styles.profileMenuItem}>
                    <p>{user.email}</p>
                </div>
            </div>
        </>
    )
}