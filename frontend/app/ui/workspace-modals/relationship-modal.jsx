'use client';
import { useSidenav } from '@/app/ui/workspace/sidenav-context';
import styles from './relationship-modal.module.css';

export default function RelationshipModal() {
    const { toggleRelationshipModal } = useSidenav();


    return (
        <>

            <div className={styles.relationshipModalContainer}
            >
                <p>Relationship Modal</p>
                <div onClick={toggleRelationshipModal}>x</div>

            </div>

        </>
    )
}