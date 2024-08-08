'use client';
import { useState } from 'react';
import { useSidenav } from '@/app/ui/workspace/sidenav-context';
import { createKnowledge } from '@/app/lib/actions';
import ModalContainer from '../containers/modal-container';
import CloseButton from '../buttons/close-button';
import {
    BoltIcon,
} from '@heroicons/react/24/outline';
import styles from './knowledge-modal.module.css';

export default function KnowledgeModal() {
    const { toggleKnowledgeModal } = useSidenav();



    return (
        <>

            <ModalContainer>

                <div className={styles.knowledgeModalContainer}
                >
                    <div className={styles.knowledgeModalHeader}>
                        <p>Create a new Knowledge Source</p>
                        <CloseButton onClick={toggleKnowledgeModal} />
                    </div>

                    <div className={styles.knowledgeModalDivider}></div>
                    <form action={createKnowledge} className={styles.knowledgeModalForm}>


                        <input
                            type="checkbox"
                            name="useMl"
                            id="useMl"
                            className={styles.knowledgeModalCheckbox}
                            hidden/>

                        <label htmlFor="useMl">
                            <div
                                className={`${styles.knowledgeModalControlItem}`}
                            >
                                <BoltIcon />
                            </div>
                        </label>

                        <label htmlFor="knowledge-title">Title</label>
                        <input
                            type="text"
                            id='knowledge-title'
                            name='knowledgeTitle'
                            autoComplete='off'
                        />

                        <label htmlFor="knowledge-url">Url</label>
                        <input
                            type="text"
                            id='knowledge-url'
                            name='knowledgeUrl'
                            autoComplete='off'
                        />

                        <label htmlFor="knowledge-summary">Summary</label>
                        <textarea id='knowledge-summary' name='knowledgeSummary' />

                        <label htmlFor="knowledge-text">Full text</label>
                        <textarea id='knowledge-text' name='knowledgeText' />



                        <button
                            type="submit"
                            className={styles.knowledgeModalButton}
                        >
                            Create
                        </button>

                    </form>

                </div>
            </ModalContainer>

        </>
    )
}