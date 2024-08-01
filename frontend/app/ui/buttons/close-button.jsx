import { XMarkIcon } from '@heroicons/react/24/outline';
import styles from './close-button.module.css';

export default function CloseButton({ onClick }) {
    return (
        <button onClick={onClick} className={styles.closeButton}>
            <XMarkIcon />
        </button>
    );
}