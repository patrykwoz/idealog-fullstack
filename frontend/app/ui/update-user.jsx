'use client';
import { useState, useEffect } from 'react';
import { useProfileAvatar } from '@/app/ui/profile-avatar-context';
import { getCurrentUser } from '../lib/actions';

export default function UpdateUser({ updateUser }) {
    const {
        toggleSettingsModal,
    } = useProfileAvatar();
    const [user, setUser] = useState(null);
    const [fullName, setFullName] = useState(user?.full_name);
    const [email, setEmail] = useState(user?.email);
    const [imageUrl, setImageUrl] = useState(user?.image_url);

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getCurrentUser();
            setUser(userData);
            setFullName(userData.full_name);
            setEmail(userData.email);
            setImageUrl(userData.image_url);
        }
        fetchUser();
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        updateUser(formData);
        toggleSettingsModal();
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="userFullName">Full Name</label>
                <input
                    type="text"
                    name="userFullName"
                    id="userFullName"
                    defaultValue={fullName}
                />
                <label htmlFor="userEmail">Email</label>
                <input
                    type="email"
                    name="userEmail"
                    id="userEmail"
                    defaultValue={email}
                />

                <label htmlFor="userImageUrl">Image Url</label>
                <input
                    type="text"
                    name="userImageUrl"
                    id="userImageUrl"
                    defaultValue={imageUrl}
                />
                <button type="submit">Save</button>
            </form>
        </>
    )
}