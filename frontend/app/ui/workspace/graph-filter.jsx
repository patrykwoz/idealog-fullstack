import {
    CheckIcon,
    ArrowRightIcon,
} from '@heroicons/react/24/outline';

import styles from "./graph-filter.module.css";

export default function GraphFilter() {
    return (
        <>
            <div className={styles.graphFilterContainer}>
                <div className={styles.graphFilterHeader}>
                    <p>Filter Your Graph</p>

                </div>
                {/* map the type of objects in the graph, e.g. ideas
                knowledges sources, users, etc. ... */}

                <div action="" className={styles.graphFilterContainer}>

                    <div className={styles.graphFilterItem}>
                        <input
                            className={styles.graphFilterCheckbox}
                            type="checkbox"
                            id='ideasFilter'
                            defaultChecked
                            hidden
                        />
                        <label htmlFor="ideasFilter" className={styles.graphFilterCheckboxLabel}>
                            Ideas
                            <div className={styles.graphFilterCheckboxIconContainer}>
                                <CheckIcon className={styles.graphFilterCheckIcon} />
                            </div>
                        </label>

                    </div>

                    <div className={styles.graphFilterItem}>
                        <input
                            className={styles.graphFilterCheckbox}
                            type="checkbox"
                            id='knowledgeSourcesFilter'
                            defaultChecked
                            hidden
                        />
                        <label htmlFor="knowledgeSourcesFilter" className={styles.graphFilterCheckboxLabel}>
                            Knowledge Sources
                            <div className={styles.graphFilterCheckboxIconContainer}>
                                <CheckIcon className={styles.graphFilterCheckIcon} />
                            </div>
                        </label>

                    </div>

                    <div className={styles.graphFilterItem}>
                        <input
                            className={styles.graphFilterCheckbox}
                            type="checkbox"
                            id='usersFilter'
                            defaultChecked
                            hidden
                        />
                        <label htmlFor="usersFilter" className={styles.graphFilterCheckboxLabel}>
                            Users
                            <div className={styles.graphFilterCheckboxIconContainer}>
                                <CheckIcon className={styles.graphFilterCheckIcon} />
                            </div>
                        </label>

                    </div>

                    <div className={styles.graphFilterItem}>

                        <input
                            className={styles.graphFilterCheckbox}
                            type="checkbox"
                            id="entitiesFilter"
                            hidden
                        />
                        <label htmlFor="entitiesFilter" className={styles.graphFilterCheckboxLabel}>
                            Entities
                            <div className={styles.graphFilterCheckboxIconContainer}>
                                <CheckIcon className={styles.graphFilterCheckIcon} />
                            </div>

                        </label>
                    </div>


                    {/* <button className={styles.graphFilterFormButton} hidden>
                        < ArrowRightIcon className={styles.graphFilterFormIcon} />
                    </button> */}

                </div>










            </div>
        </>
    );
}