'use client';

import { useEffect } from 'react'

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error("Error in the workspace")
    }, [error])

    return (
        <div>
            <h2>Something went wrong in your workspace!</h2>
            <button
                onClick={
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    )
}