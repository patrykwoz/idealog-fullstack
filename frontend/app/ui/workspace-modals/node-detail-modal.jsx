'use client';
import { useSidenav } from '@/app/ui/workspace/sidenav-context';
import CloseButtonSmall from '../buttons/close-button-small';
import styles from './node-detail-modal.module.css';

export default function NodeDetailModal({ nodeWithDetail }) {
    const { toggleNodeDetailModal } = useSidenav();

    function handleSubmit(event) {
        event.preventDefault();
    }

    const sortedEntries = Object.entries(nodeWithDetail).sort(([keyA], [keyB]) => keyA.localeCompare(keyB));

    return (
        <>
            <div className={styles.nodeDetailModalContainer}>
                <div className={styles.nodeDetailModalHeader}>
                    <p>Node Details</p>
                    <CloseButtonSmall onClick={toggleNodeDetailModal} />
                </div>

                <div className={styles.nodeDetailModalDivider}></div>

                <form onSubmit={handleSubmit} className={styles.nodeDetailModalContent}>
                    <div className={styles.nodeDetailModalContentDetails}>
                        {sortedEntries.map(([key, value]) => (
                            <div key={key} className={styles.nodeDetailModalContentItem}>
                                <label htmlFor={key}>{key}</label>
                                <input
                                    type="text"
                                    name={key}
                                    id={key}
                                    defaultValue={Array.isArray(value) ? value.join(', ') : value.toString()}
                                    readOnly
                                />
                            </div>
                        ))}
                    </div>
                    <button
                        type="submit"
                        className={`${styles.nodeDetailModalButton} notAllowed`}
                    >
                        Update
                    </button>
                </form>
            </div>
        </>
    );
}
