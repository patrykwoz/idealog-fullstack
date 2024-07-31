'use client';
import { useProfileAvatar } from '@/app/ui/profile-avatar-context';
import styles from './settings-modal.module.css';

export default function SettingsModal() {
    const {
        settingsModalVisible,
        settingsModalRef,
        toggleSettingsModal
    } = useProfileAvatar();

    return (
        <>

            <div className={styles.settingsContainer}
            >
                <p>Settings Modal</p>
                <div onClick={toggleSettingsModal}>x</div>

            </div>

        </>
    )
}