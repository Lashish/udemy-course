import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import StarRating from './StarRating'

// function Test() {
//   const [movieRating, setMovieRating] = useState()
//   return (<div><StarRating color='blue' maxRating={5} onSetRating={setMovieRating} />
//     <p>{movieRating ? `This Movie was rated ${movieRating} stars` : ""}</p></div>)
// }
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

