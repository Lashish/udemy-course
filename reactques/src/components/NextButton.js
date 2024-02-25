

export default function NextButton({ dispatch, answer, index, numQuestion }) {
    if (answer === null) return;
    return (
        <button className={`btn btn-ui ${(index + 1) === numQuestion ? "finish" : ""}`} onClick={() => dispatch({ type: (index + 1) === numQuestion ? "finish" : "nextQuestion", })}>{(index + 1) === numQuestion ? "Finish" : "Next"}</button>
    )
}
