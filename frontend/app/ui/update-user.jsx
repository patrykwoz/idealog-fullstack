'use client';
import { useState, useEffect } from 'react';
import { getCurrentUser } from '../lib/actions';

export default function UpdateUser({ updateUser }) {
    const [user, setUser] = useState(null);
    const [fullName, setFullName] = useState(user?.full_name);
    const [email, setEmail] = useState(user?.email);
    const [imageUrl, setImageUrl] = useState(user?.image_url);

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getCurrentUser();
            console.log(userData);
            setUser(userData);
            setFullName(userData.full_name);
            setEmail(userData.email);
            setImageUrl(userData.image_url);
        }
        fetchUser();
    }, [])

    return (
        <>
            <form action={updateUser}>
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
                {/* image */}
                {/* <label htmlFor="userImage">Image</label>
                <input type="file" name="userImage" id="userImage" /> */}

                {/* image url */}
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