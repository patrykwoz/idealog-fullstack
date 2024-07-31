import {
    MagnifyingGlassIcon,
    ArrowUpIcon,
} from '@heroicons/react/24/outline';
import styles from './searchbar.module.css';

export default function SearchBar() {
    return (
        <>

            <form action="" className={styles.searchbarForm}>
                <label htmlFor='search' className={styles.searchbarFormLabel}>
                    <MagnifyingGlassIcon className={styles.magnifyingGlassIcon} />

                </label>
                <input
                    className={styles.searchbarFormInput}
                    type="text"
                    id='search'
                    placeholder='Start typing to search your graph...'
                    autoComplete='off'
                />
                <button className={styles.searbarFormButton}>
                    <ArrowUpIcon className={styles.searchbarButtonIcon} />
                </button>
            </form>

        </>
    );
}