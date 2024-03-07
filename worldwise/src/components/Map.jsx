import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'



function Map() {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    return (
        <div onClick={() => navigate("form")}>
            <h1> map </h1>
            <p>position: {lat},{lng}</p>
            {/* <button onClick={() => setSearchParams({ lat: 50, lng: 30 })}>search</button> */}

        </div>
    )
}

export default Map