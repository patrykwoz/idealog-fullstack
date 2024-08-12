'use client';

import { useEffect } from 'react'

export default function GlobalError({ error, reset }) {
    useEffect(() => {
        console.error("Global error occured")
    }, [error])

    return (
        <div>
            <h2>Something went wrong globally!</h2>
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