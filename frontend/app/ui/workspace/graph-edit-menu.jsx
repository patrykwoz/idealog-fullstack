import {
    PencilSquareIcon,
    PlusCircleIcon,
    LightBulbIcon, 
    LinkIcon,
    BookOpenIcon
} from '@heroicons/react/24/outline';

import styles from "./graph-edit-menu.module.css";
import { color } from 'd3';

export default function GraphEditMenu() {
    return (
        <>
            <div className={styles.graphEditMenu}>
                <div className={styles.graphEditMenuItem}>
                    <div className={styles.graphEditMenuItemIconContainer}>
                        <LightBulbIcon className={styles.graphEditIcon} style={{color:"orange"}} />

                    </div>
                    <p>Idea</p>
                    <PlusCircleIcon className={styles.graphEditButton} />
                </div>

                <div className={styles.graphEditMenuItem}>
                    <div className={styles.graphEditMenuItemIconContainer}>
                        <BookOpenIcon className={styles.graphEditIcon} />

                    </div>
                    <p>Knowledge Base</p>
                    <PlusCircleIcon className={styles.graphEditButton} />
                </div>

                <div className={styles.graphEditMenuItem}>
                    <div className={styles.graphEditMenuItemIconContainer}>
                        <LinkIcon className={styles.graphEditIcon} />

                    </div>
                    <p>Relationship</p>
                    <PlusCircleIcon className={styles.graphEditButton} />
                </div>


            </div>
        </>
    );
}