import styles from './modal-container.module.css';

export default function ModalContainer({ children }) {
    return (
        <dialog className={styles.modalContainer}>
            {children}
        </dialog>
    );
}