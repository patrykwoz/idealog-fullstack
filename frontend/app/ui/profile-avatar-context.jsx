'use client';
import { createContext, useState, useRef, useContext, useEffect } from "react";


const ProfileAvatarContext = createContext();

export function ProfileAvatarProvider({ children, user }) {
    const [profileModalVisible, setProfileMenuVisible] = useState(false);
    const [settingsModalVisible, setSettingsModalVisible] = useState(false);
    const [myPlanModalVisible, setMyPlanModalVisible] = useState(false);

    const [generalVisible, setGeneralVisible] = useState(false);
    const [personalInfoVisible, setPersonalInfoVisible] = useState(true);
    const [securityVisible, setSecurityVisible] = useState(false);

    const profileMenuRef = useRef(null);
    const settingsModalRef = useRef(null);
    const myPlanModalRef = useRef(null);

    const toggleProfileMenu = () => {
        setProfileMenuVisible(!profileModalVisible);
    }

    const toggleSettingsModal = () => {
        setSettingsModalVisible(!settingsModalVisible);
        setProfileMenuVisible(false);
    }

    const toggleMyPlanModal = () => {
        setMyPlanModalVisible(!myPlanModalVisible);
        setProfileMenuVisible(false);
    }

    const toggleGeneral = () => {
        setGeneralVisible(true);
        setPersonalInfoVisible(false);
        setSecurityVisible(false);
    }

    const togglePersonalInfo = () => {
        setGeneralVisible(false);
        setPersonalInfoVisible(true);
        setSecurityVisible(false);
    }

    const toggleSecurity = () => {
        setGeneralVisible(false);
        setPersonalInfoVisible(false);
        setSecurityVisible(true);
    }

    const handleClickOutside = (event) => {
        if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
            setProfileMenuVisible(false);
        }
        if (settingsModalRef.current && !settingsModalRef.current.contains(event.target)) {
            setSettingsModalVisible(false);
        }
        if (myPlanModalRef.current && !myPlanModalRef.current.contains(event.target)) {
            setMyPlanModalVisible(false);
        }
    }

    useEffect(() => {
        if (profileModalVisible || settingsModalVisible || myPlanModalVisible) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [profileModalVisible, settingsModalVisible, myPlanModalVisible]);

    return (
        <ProfileAvatarContext.Provider value={{
            user,
            profileMenuVisible: profileModalVisible,
            settingsModalVisible,
            myPlanModalVisible,
            generalVisible,
            personalInfoVisible,
            securityVisible,
            profileMenuRef,
            settingsModalRef,
            myPlanModalRef,
            toggleProfileMenu,
            toggleSettingsModal,
            toggleMyPlanModal,
            toggleGeneral,
            togglePersonalInfo,
            toggleSecurity,
        }}>
            {children}
        </ProfileAvatarContext.Provider>
    );
}

export function useProfileAvatar() {
    const context = useContext(ProfileAvatarContext);
    if (!context) {
        throw new Error('useProfileAvatar must be used within a ProfileAvatarProvider');
    }
    return context;
}