'use client';
import { createPortal } from 'react-dom';
import { useProfileAvatar } from '@/app/ui/profile-avatar-context';
import ProfileMenu from './workspace-modals/profile-menu';
import SettingsModal from './workspace-modals/settings-modal';
import styles from './profile-avatar.module.css';

export default function ProfileAvatar() {
    const {
        user,
        profileMenuVisible,
        toggleProfileMenu,
        profileAvatarRef,
        profileMenuRef,
        settingsModalVisible,
        settingsModalRef,
    } = useProfileAvatar();

    const fallbackImage = "https://images.unsplash.com/photo-1601247387431-7966d811f30b?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const userImg = user.img ? user.img : fallbackImage;

    return (
        <>
            <div className={styles.profileAvatarContainer}
                onClick={toggleProfileMenu}
                ref={profileAvatarRef}
            >
                <img src={userImg} alt="Profile Avatar" />
            </div>

            {profileMenuVisible && (
                <div ref={profileMenuRef}>
                    <ProfileMenu />
                </div>
            )}

            {settingsModalVisible && createPortal(
                <div className='modalBackdrop'>
                    <div ref={settingsModalRef}>
                        <SettingsModal />
                    </div>
                </div>,
                document.getElementById('modal-root')
            )}
        </>
    )
}
