'use client'
import { useEffect } from 'react'

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div style={{ padding: 24, textAlign: 'center' }}>
            <h1>Something went wrong</h1>
            <p style={{ color: '#666' }}>{error?.message ?? 'Unknown error'}</p>
            <button
                onClick={() => reset?.()}
                style={{
                    marginTop: 16,
                    padding: '8px 16px',
                    borderRadius: 6,
                    border: '1px solid #ccc',
                    background: '#fff',
                    cursor: 'pointer'
                }}
            >
                Try again
            </button>
        </div>
    )
}