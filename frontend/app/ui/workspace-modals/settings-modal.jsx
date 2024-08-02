'use client';
import { useProfileAvatar } from '@/app/ui/profile-avatar-context';
import { updateUser } from '@/app/lib/actions';
import ModalContainer from '../containers/modal-container';
import CloseButton from '../buttons/close-button';
import UpdateUser from '../update-user';
import {
    UserPlusIcon,
    Cog6ToothIcon,
    UserCircleIcon,
    ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import styles from './settings-modal.module.css';

export default function SettingsModal() {
    const {
        settingsModalVisible,
        settingsModalRef,
        toggleSettingsModal,
        generalVisible,
        personalInfoVisible,
        securityVisible,
        toggleGeneral,
        togglePersonalInfo,
        toggleSecurity,
    } = useProfileAvatar();

    return (
        <>

            <ModalContainer>

                <div className={styles.settingsModalContainer}
                >
                    <div className={styles.settingsModalHeader}>
                        <p>Settings</p>
                        <CloseButton onClick={toggleSettingsModal} />
                    </div>

                    <div className={styles.settingsModalDivider}></div>

                    <div className={styles.settingsContainer}>
                        <div className={styles.settingsMenu}>

                            <div className={`${styles.settingsMenuItem} notAllowed ${generalVisible ? styles.settingsMenuItemActive : ''}`}


                            // onClick={toggleGeneral}
                            >
                                <div className={styles.settingsMenuItemIconContainer}>
                                    <Cog6ToothIcon className={styles.settingsIcon} />
                                </div>
                                <p>General</p>

                            </div>
                            <div className={`${styles.settingsMenuItem} ${personalInfoVisible ? styles.settingsMenuItemActive : ''}`}
                                onClick={togglePersonalInfo}
                            >
                                <div className={styles.settingsMenuItemIconContainer}>
                                    <UserCircleIcon className={styles.settingsIcon} />
                                </div>
                                <p>Personal info</p>

                            </div>
                            <div className={`${styles.settingsMenuItem} notAllowed ${securityVisible ? styles.settingsMenuItemActive : ''}`}
                            // onClick={toggleSecurity}
                            >
                                <div className={styles.settingsMenuItemIconContainer}>
                                    <ShieldCheckIcon className={styles.settingsIcon} />
                                </div>
                                <p>Security</p>

                            </div>


                        </div>
                        <div className={styles.settingsRight}>
                            {/* { generalDisplayed && <GeneralSettings /> }
                            { personalInfoDisplayed && <PersonalInfoSettings /> }
                            { personalizationDisplayed && <PersonalizationSettings /> }
                            { securityDisplayed && <SecuritySettings /> } */}

                            {generalVisible && <div>General</div>}
                            {personalInfoVisible && <UpdateUser updateUser={updateUser} />}
                                
                                    
                                
                            {securityVisible && <div>Security</div>}

                        </div>


                    </div>


                </div>
            </ModalContainer>

        </>
    )
}