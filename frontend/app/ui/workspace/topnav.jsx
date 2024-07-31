import { auth } from "@/auth"
import Link from 'next/link';
import NavLinks from './nav-links';
import { ProfileAvatarProvider } from '@/app/ui/profile-avatar-context';
import ProfileAvatar from '@/app/ui/profile-avatar';
import styles from "./topnav.module.css";

export default async function TopNav() {
    let user = null;
    const session = await auth()
    user = session.user;
    let sideNavDisplayed = false;

    return (
        <>
            <div className={styles.topnavContainer}>
                <div className={styles.topNavLeft}>
                    {sideNavDisplayed && (
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