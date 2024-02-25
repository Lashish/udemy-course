import { useEffect, useReducer } from 'react';
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from './components/Loader';
import Error from './components/Error'
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import FinishScreen from './components/FinishScreen';
import Timer from './components/Timer';
import Footer from './components/Footer';

const SECS_PER_QUESTION = 30

const initialState = {
  questions: [],

  //'loding', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondRemaining: null,
};
// console.log(initialState);
function reducer(state, action) {
  // console.log(state);
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready"
      };
    case "dataFailed":
      return {
        ...state, status: "error",
      };
    case 'start':
      return {
        ...state, status: "active", secondRemaining: state.questions.length * SECS_PER_QUESTION
      }
    case 'newAnswer':
      const question = state.questions.at(state.index);
      console.log(question)
      return {
        ...state, answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points,
      }
    case 'nextQuestion':
      return {
        ...state, index: state.index + 1, answer: null,
      }
    case 'finish':
      return {
        ...state, status: "finished", highscore: state.points > state.highscore ? state.points : state.highscore
      }
    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        status: "ready"
      }
    case 'tick':
      return {
        ...state, secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "finished" : state.status,
      }
    default:
      throw new Error("action unknown")
  }
}

function App() {

  const [{ questions, status, index, answer, points, highscore, secondRemaining }, dispatch] = useReducer(reducer, initialState)

  const numQuestions = questions.length
  // const maxPoints = questions.map(ques => ques.points).reduce((points, acc) => points + acc);
  const maxPoints = questions.reduce((prev, question) => prev + question.points
    , 0)



  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({
        type: "dataReceived",
        payload: data,
      }))
      .catch((err) => dispatch({ type: "dataFailed" }))

  }, [])

  return (
    <div className="App">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === 'active' && (
          <>
            <Progress numQuestion={numQuestions} index={index} points={points} maxPoints={maxPoints} answer={answer} />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer} />
            <Footer dispatch={dispatch}>
              <Timer dispatch={dispatch} secondRemaining={secondRemaining} />
              <NextButton dispatch={dispatch} answer={answer} index={index} numQuestion={numQuestions} />
            </Footer>
          </>
        )}
        {status === "finished" &&
          (<FinishScreen points={points} maxPoints={maxPoints} dispatch={dispatch} highscore={highscore} />)
        }
      </Main>
    </div>
  );
}
export default App;
