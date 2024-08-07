'use client';
import { useSidenav } from '@/app/ui/workspace/sidenav-context';
import { createRelationship } from '@/app/lib/actions';
import ModalContainer from '../containers/modal-container';
import CloseButton from '../buttons/close-button';
import styles from './relationship-modal.module.css';

export default function RelationshipModal() {
    const { toggleRelationshipModal } = useSidenav();

    return (
        <>

            <ModalContainer>

                <div className={styles.relationshipModalContainer}
                >
                    <div className={styles.relationshipModalHeader}>
                        <p>Create a new relationship</p>
                        <CloseButton onClick={toggleRelationshipModal} />
                    </div>

                    <div className={styles.relationshipModalDivider}></div>

                    <form action={createRelationship} className={styles.relationshipModalForm}>

                        <label htmlFor="relationship-name">Name</label>
                        <input
                            type="text"
                            id='relationship-name'
                            name='relationshipName'
                            autoComplete='off'
                        />

                        <label htmlFor="relationship-head">Start (Head)</label>
                        <input
                            type="text"
                            id='relationship-head'
                            name='relationshipHead'
                            autoComplete='off'
                        />

                        <label htmlFor="relationship-tail">End (Tail)</label>
                        <input
                            type="text"
                            id='relationship-tail'
                            name='relationshipTail'
                            autoComplete='off'
                        />

                        <label htmlFor="relationship-type">Relationship Type</label>
                        <input
                            type="text"
                            id='relationship-type'
                            name='relationshipType'
                            autoComplete='off'
                        />



                        <button
                            type="submit"
                            className={styles.relationshipModalButton}
                        >
                            Create
                        </button>

                    </form>

                    {/* Example use of manual revalidation in a client component */}
                    {/* <div onClick={handleRevalidateNodes} >Revalidate Nodes</div> */}

                </div>
            </ModalContainer>

        </>
    )
}