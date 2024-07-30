import {
    PencilSquareIcon,
    ArrowRightCircleIcon,
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
                        <label htmlFor="ideasFilter">Ideas</label>
                        <input type="checkbox" id='ideasFilter' />
                    </div>

                    <div className={styles.graphFilterItem}>
                        <label htmlFor="knowledgeSourcesFilter">Knowledge Sources</label>
                        <input type="checkbox" id='knowledgeSourcesFilter' />
                    </div>

                    <div className={styles.graphFilterItem}>
                        <label htmlFor="usersFilter">Users</label>
                        <input type="checkbox" id='usersFilter' />
                    </div>

                    <div className={styles.graphFilterItem}>
                        <label htmlFor="entitiesFilter" className={styles.graphFilterCheckboxLabel}>
                            Entities
                        </label>
                        <input
                            className={styles.graphFilterCheckbox}
                            type="checkbox"
                            id="entitiesFilter" />
                    </div>


                    {/* <button className={styles.graphFilterFormButton} hidden>
                        < ArrowRightIcon className={styles.graphFilterFormIcon} />
                    </button> */}

                </div>










            </div>
        </>
    );
}