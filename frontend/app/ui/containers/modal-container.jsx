import styles from './modal-container.module.css';

export default function ModalContainer({ children }) {
    return (
        <div className={styles.modalContainer}>
            {children}
        </div>
    );
}