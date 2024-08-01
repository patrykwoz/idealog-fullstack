'use client';
import { createPortal } from 'react-dom';
import { useSidenav } from './sidenav-context';
import IdeaModal from '../workspace-modals/idea-modal';
import KnowledgeModal from '../workspace-modals/knowledge-modal';
import RelationshipModal from '../workspace-modals/relationship-modal';

import {
    PencilSquareIcon,
    PlusCircleIcon,
    LightBulbIcon,
    LinkIcon,
    BookOpenIcon
} from '@heroicons/react/24/outline';

import styles from "./graph-edit-menu.module.css";

export default function GraphEditMenu() {
    const {
        toggleIdeaModal,
        ideaModalRef,
        ideaModalVisible,
        toggleKnowledgeModal,
        knowledgeModalRef,
        knowledgeModalVisible,
        toggleRelationshipModal,
        relationshipModalRef,
        relationshipModalVisible

    } = useSidenav();


    return (
        <>
            <div className={styles.graphEditMenu}>
                <div className={styles.graphEditMenuItem}
                    onClick={toggleIdeaModal}>
                    <div className={styles.graphEditMenuItemIconContainer}>
                        <LightBulbIcon className={styles.graphEditIcon} style={{ color: "orange" }} />

                    </div>
                    <p>Idea</p>
                    <PlusCircleIcon className={styles.graphEditButton} />
                </div>

                <div className={styles.graphEditMenuItem}
                    onClick={toggleKnowledgeModal}>
                    <div className={styles.graphEditMenuItemIconContainer}>
                        <BookOpenIcon className={styles.graphEditIcon} />

                    </div>
                    <p>Knowledge Source</p>
                    <PlusCircleIcon className={styles.graphEditButton} />
                </div>

                <div className={styles.graphEditMenuItem}
                    onClick={toggleRelationshipModal}>
                    <div className={styles.graphEditMenuItemIconContainer}>
                        <LinkIcon className={styles.graphEditIcon} />

                    </div>
                    <p>Relationship</p>
                    <PlusCircleIcon className={styles.graphEditButton} />
                </div>


            </div>

            {ideaModalVisible && createPortal(
                <div className='modalBackdrop'>
                    <div ref={ideaModalRef}>
                        <IdeaModal />
                    </div>
                </div>,
                document.getElementById('modal-root')
            )}

            {knowledgeModalVisible && createPortal(
                <div className='modalBackdrop'>
                    <div ref={knowledgeModalRef}>
                        <KnowledgeModal />
                    </div>
                </div>,
                document.getElementById('modal-root')
            )}

            {relationshipModalVisible && createPortal(
                <div className='modalBackdrop'>
                    <div ref={relationshipModalRef}>
                        <RelationshipModal />
                    </div>
                </div>,
                document.getElementById('modal-root')
            )}

        </>
    );
}