'use client';
import { useState, useEffect } from 'react';
import { useSidenav } from './sidenav-context';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { searchNodes } from '@/app/lib/actions';

import {
    MagnifyingGlassIcon,
    ArrowUpIcon,
} from '@heroicons/react/24/outline';
import styles from './searchbar.module.css';

export default function SearchBar() {
    // function to query the neo4j graph database
    // based on node labels in the returned array
    // add them to the searchedNodes array
    const { searchedNodes, addSearchedNodes, removeSearchedNodes, } = useSidenav();
    const [searchInput, setSearchInput] = useState('');


    async function handleSubmit(e){
        e.preventDefault();
        const searchInput = document.getElementById('search').value;
        if (searchInput.trim().length === 0) {
            return;
        }
        const nodes = await searchNodes(searchInput);
        const nodeNames = nodes.map(node => node[0].name);

        addSearchedNodes(nodeNames);
    }

    const handleChange = (e) => {
        setSearchInput(e.target.value);
    }

    return (
        <>
            <form className={styles.searchbarForm}
            onSubmit={handleSubmit}>
                <label htmlFor='search' className={styles.searchbarFormLabel}>
                    <MagnifyingGlassIcon className={styles.magnifyingGlassIcon} />

                </label>
                <input
                    className={styles.searchbarFormInput}
                    type="text"
                    id='search'
                    name='search'
                    placeholder='Start typing to search your graph...'
                    autoComplete='off'
                    onChange={handleChange}
                    value={searchInput}
                />
                <button
                    className={`${styles.searbarFormButton} ${searchInput.length>0 ? styles.searchBarButtonHighlight : 'noPointerEvents'}`}
                >
                    <ArrowUpIcon className={`${styles.searchbarButtonIcon} `} />
                </button>
            </form>
        </>
    );
}