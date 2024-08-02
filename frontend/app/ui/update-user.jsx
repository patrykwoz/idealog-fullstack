'use client';
import { useState, useEffect } from 'react';
import {useProfileAvatar} from '@/app/ui/profile-avatar-context';

export default function UpdateUser({ updateUser }) {
    const { user } = useProfileAvatar();

    const [fullName, setFullName] = useState(user.fullName);
    const [email, setEmail] = useState(user.email);
    const [imageUrl, setImageUrl] = useState(user.imageUrl);

    useEffect(() => {
        setFullName(user.fullName);
        setEmail(user.email);
        setImageUrl(user.imageUrl);
    }
    , [user]);




    return (
        <>
            <form action={updateUser}>
                <label htmlFor="userFullName">Full Name</label>
                <input
                    type="text"
                    name="userFullName"
                    id="userFullName" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    />
                <label htmlFor="userEmail">Email</label>
                <input 
                    type="email"
                    name="userEmail"
                    id="userEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)} 
                    />

                <button type="submit">Save</button>


            </form>
        </>
    )


}