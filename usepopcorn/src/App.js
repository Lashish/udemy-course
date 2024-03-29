import { useEffect, useState, useRef } from "react";
import StarRating from "./StarRating";
import { useMovies } from "./customHooks/useMovies";
import { useLocalStorageState } from "./customHooks/useLocalStorageState";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => (acc + cur / arr.length), 0);


const KEY = "e769cade";

function App() {


  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null)

  const { movies, isLoading, error } = useMovies(query, handleCloseMovie)

  const [watched, setWatched] = useLocalStorageState([], "watched")

  // const [watched, setWatched] = useState(function () {
  //   const storedValue = localStorage.getItem("watched");
  //   return JSON.parse(storedValue)
  // })

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));

  }
  function handleCloseMovie() {
    setSelectedId(null)
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie])
    setSelectedId(null)
  }

  function handleDeleteMovie(id) {

    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id))
  }



  return (
    <>
      <Header>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Header>
      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie} />}
          {error && <ErrorMessage message={error} />}

        </Box>
        <Box>
          {isLoading && <Loader />}
          {selectedId ? (<MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie} onAddWatched={handleAddWatched} watched={watched} />) :
            (<>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteMovie} /></>)}
        </Box>
        {/* <Box element={<MovieList movies={movies} />} />
        <Box
          element={
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          }
        >
        </Box>*/}
      </Main>
    </>
  );
}

function Loader() {
  return (
    <p className="loader">Loading...</p>
  )
}
function ErrorMessage({ message }) {
  return (
    <p className="error"><span>⛔</span>{message}</p>
  )
}
function Header({ children }) {
  return (
    <>
      <nav className="nav-bar">
        <Logo />

        {children}
      </nav>
    </>
  )
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  )
}

function Search({ query, setQuery }) {
  const inputEl = useRef(null)
  useEffect(function () {
    function callback(e) {
      if (document.activeElement === inputEl.current)
        return;
      if (e.code === "Enter") {
        inputEl.current.focus();
        setQuery("");
      }
    }
    document.addEventListener("keydown", callback);
    return () => document.addEventListener("keydown", callback)
  }, [setQuery])

  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      />
    </>
  )
}

function NumResults({ movies }) {

  return (
    <p className="num-results">
      Found <strong>{movies !== "undefined" ? movies.length : ""}</strong> results
    </p>
  )
}

function Main({ children }) {
  return (
    <>
      <main className="main">
        {children}
      </main>
    </>
  )
}

/*function Box({ element }) {

  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && element}
    </div>
  )
}*/

function Box({ children }) {

  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  )
}


// /*function WatchedBox() {
//   const [watched, setWatched] = useState(tempWatchedData);
//   const [isOpen2, setIsOpen2] = useState(true);
//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         <>
//           <WatchedSummary watched={watched} />
//           <WatchedMoviesList watched={watched} />
//         </>
//       )}
//     </div>
//   )
// }*/

function MovieList({ movies, onSelectMovie }) {

  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>

  )
}
function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsloading] = useState(false);
  const [userRating, setUserRating] = useState()
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre } = movie;


  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0)),
      userRating
    }
    onAddWatched(newWatchedMovie)

  }

  useEffect(function () {
    function callback(e) {
      if (e.code === 'Escape') {
        onCloseMovie();
        console.log('closing');
      }
    }

    document.addEventListener('keydown', callback)
    return function () {
      document.removeEventListener("keydown", callback);
    }
  }, [onCloseMovie])

  useEffect(function () {

    async function getMovieDetails() {
      setIsloading(true)
      const res = await fetch(` http://www.omdbapi.com/?&apikey=${KEY}&i=${selectedId}`);
      const data = await res.json();
      setMovie(data);
      setIsloading(false)

    }
    getMovieDetails();
  }, [selectedId])

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId)

  useEffect(function () {
    if (!title) return;
    document.title = `Movie | ${title}`
    return function () {
      document.title = "usePopcorn";
    }
  }, [title])
  return (
    <div className="details">
      {isLoading ? <Loader /> :
        <>
          <header>

            <button className="btn-back" onClick={onCloseMovie}>&larr;</button>

            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>{released} &bull; {runtime}</p>
              <p>{genre}</p>
              <p><span>⭐</span>{imdbRating}IMDb rating</p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? <><StarRating maxRating={10} size={24} onSetRating={setUserRating} />
                {userRating > 0 && (<button className="btn-add" onClick={() => handleAdd()}>+ Add to list</button>)}</> : "This movie is already in your Watched list!"}
            </div>
            <p><em>{plot}</em></p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>}
    </div>
  )
}
function Movie({ movie, onSelectMovie }) {
  // console.log(movie);
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div >
    </li>
  )
}


function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(1)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(1)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{Math.ceil(avgRuntime)} min</span>
        </p>
      </div>
    </div>
  )
}

function WatchedMoviesList({ watched, onDeleteWatched }) {
  // console.log(watched);
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} onDeleteWatched={onDeleteWatched} />
      ))}
    </ul>
  )
}

function WatchedMovie({ movie, onwatched, onDeleteWatched }) {
  return (
    <li key={movie.imdbID} onClick={onwatched}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button className="btn-delete" onClick={() => onDeleteWatched(movie.imdbID)}> &times; </button>
      </div>
    </li>
  )
}



export default App;