import React from 'react'

function Progress({ numQuestion, index, points, maxPoints, answer }) {

    return (
        <div className='progress'>
            <progress max={numQuestion} value={index + Number(answer !== null)}>
            </progress>
            <p>Question <strong>{index + 1}</strong> / {numQuestion}</p>
            <p>Points <strong>{points}</strong> / {maxPoints} </p>
        </div >
    )
}

export default Progress;