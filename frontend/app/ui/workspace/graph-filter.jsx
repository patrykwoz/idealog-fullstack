'use client';
import { revalidateNodes } from '@/app/lib/actions';
import { useSidenav } from './sidenav-context';
import {
    CheckIcon,
    ArrowRightIcon,
} from '@heroicons/react/24/outline';

import styles from "./graph-filter.module.css";

export default function GraphFilter() {
    const { filterLabels, addFilterLabel, removeFilterLabel } = useSidenav();

    const handleInputChange = (e) => {
        const { name, checked } = e.target;
        if (checked) {
            addFilterLabel(name);
            revalidateNodes();

        } else {
            removeFilterLabel(name);
            revalidateNodes();
        }
    };

    return (
        <>
            <div className={`${styles.graphFilterContainer} noSelect`}>
                <div className={styles.graphFilterHeader}>
                    <p>Filter Your Graph</p>

                </div>
                <div className={styles.graphFilterContainer}>

                    <div className={styles.graphFilterItem}>
                        <input
                            className={styles.graphFilterCheckbox}
                            type="checkbox"
                            id='ideasFilter'
                            name='Idea'
                            checked={filterLabels.includes('Idea')}
                            onChange={handleInputChange}
                            hidden
                        />
                        <label htmlFor="ideasFilter" className={styles.graphFilterCheckboxLabel}>
                            Ideas
                            {/* consider adding count of nodes displayed */}
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
                            name='KnowledgeSource'
                            checked={filterLabels.includes('KnowledgeSource')}
                            onChange={handleInputChange}
                            hidden
                        />
                        <label htmlFor="knowledgeSourcesFilter" className={styles.graphFilterCheckboxLabel}>
                            Knowledge Sources
                            {/* consider adding count of nodes displayed */}
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
                            name='User'
                            checked={filterLabels.includes('User')}
                            onChange={handleInputChange}
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
                            name='Entity'
                            checked={filterLabels.includes('Entity')}
                            onChange={handleInputChange}
                            hidden
                        />
                        <label htmlFor="entitiesFilter" className={styles.graphFilterCheckboxLabel}>
                            Entities
                            <div className={styles.graphFilterCheckboxIconContainer}>
                                <CheckIcon className={styles.graphFilterCheckIcon} />
                            </div>

                        </label>
                    </div>

                </div>
            </div>
        </>
    );
}