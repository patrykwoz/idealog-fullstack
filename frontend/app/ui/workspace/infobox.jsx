import {
    PuzzlePieceIcon,
} from '@heroicons/react/24/outline';

import styles from './infobox.module.css';

export default function InfoBox() {
    return (
        <>
            <div className={styles.infoBoxContainer}>
                <div className={styles.infoBoxButton}>
                    <PuzzlePieceIcon className={styles.infoBoxIcon} />
                    <div className={styles.infoBoxTextContainer}>
                        <p className={styles.infoBoxHeader}>Subscribe now</p>
                        <p className={styles.infoBoxText}>Unlock machine learning capabilities</p>

                    </div>
                </div>

            </div>
        </>
    )
}