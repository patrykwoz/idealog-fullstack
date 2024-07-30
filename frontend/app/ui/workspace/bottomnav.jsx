
import Link from 'next/link';
import styles from "./bottomnav.module.css";
import SearchBar from './searchbar';

export default function BottomNav() {
    return (
        <>
            <div className={styles.bottomnavContainer}>
                <SearchBar />

                <div className={styles.bottomnavHelp}>
                </div>

            </div>
        </>
    );
}