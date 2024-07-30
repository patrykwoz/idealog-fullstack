
import {
    MagnifyingGlassMinusIcon,
    MagnifyingGlassPlusIcon,
    ArrowsPointingOutIcon
} from '@heroicons/react/24/outline';
import styles from "./zoom-menu.module.css";

export default function ZoomMenu() {
    return (
        <>
            <div className={styles.zoomMenuContainer}>
                <MagnifyingGlassPlusIcon className={styles.zoomIcon} />
                <MagnifyingGlassMinusIcon className={styles.zoomIcon} />
                <ArrowsPointingOutIcon className={styles.zoomIcon} />

            </div>
        </>
    );
}