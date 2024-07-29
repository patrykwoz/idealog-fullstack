
import Link from 'next/link';
import NavLinks from './nav-links';
import styles from "./topnav.module.css";


export default function TopNav() {
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
                </div>

            </div>
        </>
    );
}