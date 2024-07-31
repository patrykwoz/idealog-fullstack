import { createContext, useState } from "react";

const ProfileAvatarContext = createContext();

export function ProfileAvatarProvider({ children, currentUser }) {
    const [profileAvatar, setProfileAvatar] = useState(null);

    return (
        <ProfileAvatarContext.Provider value={{ profileAvatar, setProfileAvatar }}>
            {children}
        </ProfileAvatarContext.Provider>
    );
}