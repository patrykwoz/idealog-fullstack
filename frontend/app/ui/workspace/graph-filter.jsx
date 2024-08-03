'use client';
import {useState, useEffect} from 'react';
import { useSidenav } from './sidenav-context';
import {
    CheckIcon,
    ArrowRightIcon,
} from '@heroicons/react/24/outline';

import styles from "./graph-filter.module.css";

export default function GraphFilter() {
    const { filterLabels, addFilterLabel, removeFilterLabel } = useSidenav();

    async function submitFilterLabels(formData){
        const rawFormData = {
            limit: formData.get('ideasFilter'),
        }

    }

    return (
        <>
            <div className={`${styles.graphFilterContainer} noSelect`}>
                <div className={styles.graphFilterHeader}>
                    <p>Filter Your Graph</p>

                </div>
                <form action="" className={styles.graphFilterContainer}>

                    <div className={styles.graphFilterItem}>
                        <input
                            className={styles.graphFilterCheckbox}
                            type="checkbox"
                            id='ideasFilter'
                            name='ideasFilter'
                            defaultChecked
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
                            name='knowledgeSourcesFilter'
                            defaultChecked
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
                            name='usersFilter'
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
                            name='entitiesFilter'
                            hidden
                        />
                        <label htmlFor="entitiesFilter" className={styles.graphFilterCheckboxLabel}>
                            Entities
                            <div className={styles.graphFilterCheckboxIconContainer}>
                                <CheckIcon className={styles.graphFilterCheckIcon} />
                            </div>

                        </label>
                    </div>

                    {/* map the type of objects in the graph, e.g. ideas
                    knowledges sources, users, etc. ... */}

                </form>
            </div>
        </>
    );
}