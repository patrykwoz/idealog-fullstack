'use client';
import { useSidenav } from '@/app/ui/workspace/sidenav-context';
import { createIdea } from '@/app/lib/actions';
import ModalContainer from '../containers/modal-container';
import CloseButton from '../buttons/close-button';
import styles from './idea-modal.module.css';

export default function IdeaModal() {
    const { toggleIdeaModal } = useSidenav();

    return (
        <>
            <ModalContainer>

                <div className={styles.ideaModalContainer}
                >
                    <div className={styles.ideaModalHeader}>
                        <p>Create a new Idea</p>
                        <CloseButton onClick={toggleIdeaModal} />
                    </div>

                    <div className={styles.ideaModalDivider}></div>

                    <form action={createIdea} className={styles.ideaModalForm}>

                        <label htmlFor="idea-name">Name</label>
                        <input
                            type="text"
                            id='idea-name'
                            name='ideaName'
                            autoComplete='off'
                        />


                        <label htmlFor="idea-description">Description</label>
                        <textarea id='idea-description' name='ideaDescription' />

                        <button
                            type="submit"
                            className={styles.ideaModalButton}
                        >
                            Create
                        </button>

                    </form>

                </div>
            </ModalContainer>

        </>
    )
}