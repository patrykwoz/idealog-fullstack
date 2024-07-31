'use client';
import {
    SparklesIcon,
    UserIcon,
    Cog6ToothIcon,
    PowerIcon
} from '@heroicons/react/24/outline';
import styles from './profile-menu.module.css';

export default function ProfileMenu({ user }) {
    return (
        <>
            <div className={styles.profileMenuContainer}>
                <div className={styles.profileMenuItem}>
                    <SparklesIcon className={styles.profileMenuItemIcon} />
                    <p className={styles.profileMenuItemText}>My Plan</p>
                </div>
                <div className={styles.profileMenuItem}>
                    <Cog6ToothIcon className={styles.profileMenuItemIcon} />
                    <p className={styles.profileMenuItemText}>Settings</p>
                </div>
                <div className={styles.profileMenuDivider}></div>
                <div className={styles.profileMenuItem}>
                    <PowerIcon className={styles.profileMenuItemIcon} />
                    <p className={styles.profileMenuItemText}>Log out</p>
                </div>
            </div>
        </>
    )
}