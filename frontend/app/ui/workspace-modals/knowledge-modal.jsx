'use client';
import { useSidenav } from '@/app/ui/workspace/sidenav-context';
import styles from './knowledge-modal.module.css';

export default function KnowledgeModal() {
    const { toggleKnowledgeModal } = useSidenav();


    return (
        <>

            <div className={styles.knowledgeModalContainer}
            >
                <p>Knowledge Modal</p>
                <div onClick={toggleKnowledgeModal}>x</div>

            </div>

        </>
    )
}