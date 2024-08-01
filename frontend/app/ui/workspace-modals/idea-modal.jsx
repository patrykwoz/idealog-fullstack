'use client';
import { useSidenav } from '@/app/ui/workspace/sidenav-context';
import styles from './idea-modal.module.css';

export default function IdeaModal() {
    const {toggleIdeaModal} = useSidenav();


    return (
        <>

            <div className={styles.ideaModalContainer}
            >
                <p>Idea Modal</p>
                <div onClick={toggleIdeaModal}>x</div>

            </div>

        </>
    )
}