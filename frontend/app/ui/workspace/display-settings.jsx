import {
    PencilSquareIcon,
    ArrowRightCircleIcon,
    ArrowRightIcon,
} from '@heroicons/react/24/outline';

import styles from "./display-settings.module.css";

export default function DisplaySettings() {
    return (
        <>
            <div className={styles.displaySettingsContainer}>
                <div className={styles.displaySettingsHeader}>
                    <p>Graph Display Settings</p>

                </div>
                {/* number of nodes, auto generated / added manuallyl by user, public/private */}

                <form action="" className={styles.displaySettingsFormItem}>
                    <label htmlFor="nodes-limit">Nodes Limit</label>
                    <input type="number" id='nodes-limit'/>
                    <button className={styles.displaySettingsFormButton}>
                        < ArrowRightIcon className={styles.displaySettingsFormIcon} />
                    </button>

                </form>










            </div>
        </>
    );
}