'use client';
import { createPortal } from 'react-dom';
import { useSidenav } from './sidenav-context';
import IdeaModal from '../workspace-modals/idea-modal';
import {
    PlusCircleIcon,
    Bars4Icon,
    BoltIcon,
} from '@heroicons/react/24/outline';
import styles from "./nav-links.module.css";



export default function NavLinks() {
    const {
        toggleIdeaModal,
        ideaModalRef,
        ideaModalVisible,
        toggleSideNav,

    } = useSidenav();

    return (
        <>
            <div className={styles.navlinksContainer}>
                <Bars4Icon
                    className={styles.navlinksButton}
                onClick={toggleSideNav}
                />

                <div>
                    <BoltIcon
                        className={`${styles.navlinksButton} notAllowed`}
                    />

                    <PlusCircleIcon
                        className={styles.navlinksButton}
                        onClick={toggleIdeaModal}
                    />
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

        </>
    );
}