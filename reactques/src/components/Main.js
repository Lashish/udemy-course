import React from 'react'

function Main({ children }) {
    console.log(children)
    return (
        <>
            <main className="main">
                {children}
            </main>
        </>
    )
}

export default Main