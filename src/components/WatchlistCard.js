import React from 'react'; 

const WatchlistCard = props => {
    return (
        <div class='col-6'>      
            <h3>{props.movie.title}</h3>
            <img onClick={() => props.showClick(props.movie)} src={`https://image.tmdb.org/t/p/w300${props.movie.poster}`}></img>
            <p>Rating: {props.movie.vote_average}</p>
            <p>Release Date: {props.movie.release_date}</p>
            <button onClick={() => props.removeFromWatchlist(props.movie)}>Remove From Watchlist</button>
        </div>
    )
}

export default WatchlistCard