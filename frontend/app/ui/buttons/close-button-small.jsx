import { XMarkIcon } from '@heroicons/react/24/outline';
import styles from './close-button-small.module.css';

export default function CloseButtonSmall({ onClick }) {
    return (
        <button onClick={onClick} className={styles.CloseButtonSmall}>
            <XMarkIcon />
        </button>
    );
}