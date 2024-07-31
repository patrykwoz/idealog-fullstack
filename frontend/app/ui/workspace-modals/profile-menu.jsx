'use client';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link'
import SettingsModal from './settings-modal';
import {
    SparklesIcon,
    UserIcon,
    Cog6ToothIcon,
    PowerIcon
} from '@heroicons/react/24/outline';

import styles from './profile-menu.module.css';

export default function ProfileMenu({ user }) {
    const [settingsModalDisplayed, setSettingsModalDisplayed] = useState(false);

    const settingsModalRef = useRef(null);
    const profileMenuRef = useRef(null);

    const toggleSettingsModal = () => {
        setSettingsModalDisplayed(!settingsModalDisplayed);
    }

    const handleClickOutside = (event) => {
        if (profileMenuRef.current && settingsModalRef.current &&
            !profileMenuRef.current.contains(event.target) &&
            !settingsModalRef.current.contains(event.target)) {
            setSettingsModalDisplayed(false);
        }
    }

    useEffect(() => {
        if (settingsModalDisplayed) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [settingsModalDisplayed]);

    
    return (
        <>
            <div className={styles.profileMenuContainer}>
                <div className={styles.profileMenuItem}>
                    <SparklesIcon className={styles.profileMenuItemIcon} />
                    <p className={styles.profileMenuItemText}>My Plan</p>
                </div>
                <div className={styles.profileMenuItem}
                    onClick={toggleSettingsModal}
                    ref={profileMenuRef}>
                    <Cog6ToothIcon className={styles.profileMenuItemIcon} />
                    <p className={styles.profileMenuItemText}>
                        Settings
                    </p>
                </div>
                <div className={styles.profileMenuDivider}></div>
                <div className={styles.profileMenuItem}>
                    <PowerIcon className={styles.profileMenuItemIcon} />
                    <p className={styles.profileMenuItemText}>Log out</p>
                </div>
            </div>

            {/* TODO: is it correct/clean to have modals return from this component? */}

            {settingsModalDisplayed && createPortal(
                <div ref={settingsModalRef}>
                    <SettingsModal />
                </div>,
                document.getElementById('modal-root')
            )}

        </>
    )
}