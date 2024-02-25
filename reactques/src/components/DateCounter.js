import { useReducer } from 'react'

function reducer(state, action) {
    // console.log(state, action);
    switch (action.type) {
        case 'inc':
            return { ...state, count: state.count + state.step };
        case 'dec':
            return { ...state, count: state.count - state.step };
        case 'setCount':
            return { ...state, count: action.payload };
        case 'setStep':
            return { ...state, step: action.payload };
        case 'reset':
            return { count: 0, step: 1 };
        default:
            throw new Error("Unknown action")
    }
}
function DateCounter() {

    const initialState = { count: 0, step: 1 }
    const [state, dispatch] = useReducer(reducer, initialState);
    const { count } = state;

    const date = new Date("june 21 2027");
    date.setDate(date.getDate() + count)

    const dec = () => {
        dispatch({ type: "dec" })

    }
    const inc = () => {
        dispatch({ type: "inc" })

    }
    function defineCount(e) {
        dispatch({ type: "setCount", payload: Number(e.target.value) })

    }
    function defineStep(e) {
        dispatch({ type: "setStep", payload: Number(e.target.value) });
    }
    function reset() {
        dispatch({ type: "reset" })

    }
    return (
        <>
            <div>
                <input type="range" min='0' max='10' value={state.step} onChange={defineStep} />
                <span>{state.step}</span>
            </div>
            <div>
                <button onClick={() => dec()}>-</button>
                <input type='number' value={count} onChange={defineCount} />
                <button onClick={() => inc()}>+</button>
            </div>
            <p>{date.toDateString()}</p>
            <div>
                <button onClick={() => reset()}>Reset</button>
            </div>
        </>
    )
}
export default DateCounter;