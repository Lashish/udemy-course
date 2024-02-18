import { useState, useEffect } from "react";

const KEY = "e769cade";
export function useMovies(query, callback) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsloading] = useState(false)
    const [error, setError] = useState("")
    useEffect(function () {
        callback?.();
        async function fetchMovies() {
            try {
                setIsloading(true);
                setError("");
                const res = await fetch(` http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`)
                if (!res.ok)
                    throw new Error("Something went wrong with fetching movies!")
                const data = await res.json();
                if (!isLoading && data.Response === "False") throw new Error("Movie not found!")
                setMovies(data.Search);


            } catch (err) {
                console.log(err.message);
                setError(err.message)
            } finally {
                setIsloading(false)
            }

        }
        if (query.length < 3) {
            setMovies([]);
            setError("");
            return;
        }
        // handleCloseMovie()
        fetchMovies()
    }, [query]);

    return { movies, isLoading, error }
}