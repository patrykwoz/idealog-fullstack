import Link from 'next/link';
import styles from "./nav-links.module.css";
import { PencilSquareIcon, PowerIcon, PlusCircleIcon, Bars4Icon } from '@heroicons/react/24/outline';


export default function NavLinks() {
    return (
        <>
            <div className={styles.navlinksContainer}>
                <Bars4Icon className={styles.navlinksButton} />

                <PlusCircleIcon className={styles.navlinksButton} />

            </div>
        </>
    );
}