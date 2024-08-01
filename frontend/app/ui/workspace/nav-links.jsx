'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { useSidenav } from './sidenav-context';
import IdeaModal from '../workspace-modals/idea-modal';
import { PlusCircleIcon, Bars4Icon } from '@heroicons/react/24/outline';
import styles from "./nav-links.module.css";



export default function NavLinks() {
    const {
        toggleIdeaModal,
        ideaModalRef,
        ideaModalVisible

    } = useSidenav();

    // const [sideNavDisplayed, setSideNavDisplayed] = useState(false);

    // useEffect(() => {
    //     fetch('/api')
    //         .then(res => res.json())
    //         .then(data => setSideNavDisplayed(data.value === 'true'));
    // }, []);

    // function toggleSideNav() {
    //     fetch('/api', {
    //         method: 'POST'
    //     })
    //         .then(res => res.json())
    //         .then(data => setSideNavDisplayed(data.value));
    // }

    // useEffect(() => {
    //     console.log('sideNavDisplayed changed:', sideNavDisplayed);
    // }, [sideNavDisplayed]);

    return (
        <>
            <div className={styles.navlinksContainer}>
                <Bars4Icon
                    className={styles.navlinksButton}
                    // onClick={toggleSideNav}
                />

                <PlusCircleIcon
                    className={styles.navlinksButton}
                    onClick={toggleIdeaModal}

                />

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