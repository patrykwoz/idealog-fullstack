'use client';
import Link from 'next/link';
import NavLinks from './nav-links';
import { ProfileAvatarProvider } from '@/app/ui/profile-avatar-context';
import { useSidenav } from '@/app/ui/workspace/sidenav-context';
import ProfileAvatar from '@/app/ui/profile-avatar';
import styles from "./topnav.module.css";

export default function TopNav() {    
    const { user, sideNavDisplayed } = useSidenav();

    return (
        <>
            <div className={styles.topnavContainer}>
                <div className={styles.topNavLeft}>
                    {!sideNavDisplayed && (
                        <NavLinks />
                    )}
                </div>

                <div className={styles.topnavProfile}>
                    <ProfileAvatarProvider user={user}>
                        <ProfileAvatar />
                    </ProfileAvatarProvider>

                </div>

            </div>
        </>
    );
}