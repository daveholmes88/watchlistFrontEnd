import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import MovieCard from './MovieCard'

class MovieContainer extends Component {
    constructor() {
        super()
        this.state = {
            clicked: null,
            sort: false
        }
    }

    componentDidMount = () => {
        fetch('http://localhost:3000/movies')
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                const fetchMovies = { type: 'FETCH_MOVIES', payload: data.movie }
                this.props.add(fetchMovies)
                const myWatch = data.watchlist.filter(watch => {
                    return watch.user_id === this.props.user.id
                })
                const createWatch = { type: 'CREATE_WATCHLIST', payload: myWatch }
                this.props.add(createWatch)
                const mySeen = data.seen.filter(seen => {
                    return seen.user_id === this.props.user.id
                })
                const createSeen = { type: 'CREATE_SEEN', payload: mySeen}
                this.props.add(createSeen)
            })
            .catch(err => console.log(err))
    }

    renderMovies = () => {
        const watchMovieIds = this.props.watchlist.map(watch => watch.movie_id)
        const seenMovieIds = this.props.seen.map(seen => seen.movie_id)
        let filterMovies = this.props.movies.filter(movie => {
            return !watchMovieIds.includes(movie.id)
        })
        filterMovies = filterMovies.filter(movie => {
            return !seenMovieIds.includes(movie.id)
        })
        if (this.state.sort) {
            filterMovies = filterMovies.sort(function(a, b) {return b.vote_average - a.vote_average})
        }
        return filterMovies.map(movie => {
        return <MovieCard 
            key={movie.id} 
            movie={movie} 
            showClick={this.showClick}
            addWatchlist={this.addWatchlist}
            addSeen={this.addSeen}/>
        })
    }

    addSeen = (movie) => {
        const user = this.props.user.id
        const newObj = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: user,
                movie: movie.id
            })
        }
        this.setState({
            clicked: null
        })
        fetch('http://localhost:3000/seens', newObj)
            .then(resp => resp.json())
            .then(seen => {
                const action = { type: 'CREATE_SEEN', payload: seen }
                this.props.add(action)
            })
    }

    showClick = movie => {
        this.setState({
            clicked: movie
        })
    }

    addWatchlist = (movie) => {
        const user = this.props.user.id
        const newObj = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: user,
                movie: movie.id
            })
        }
        this.setState({
            clicked: null
        })
        fetch('http://localhost:3000/watchlists', newObj)
            .then(resp => resp.json())
            .then(watchlists => {
                const action = { type: 'CREATE_WATCHLIST', payload: watchlists }
                this.props.add(action)
            })
    }

    showClick = (movie) => {
        this.setState({
            clicked: movie
        })
    }

    showMovie = () => {
        return (
            <div>
                <h1>{this.state.clicked.title}</h1>
                <img src={`https://image.tmdb.org/t/p/w300${this.state.clicked.poster}`}></img>
                <p>Plot: {this.state.clicked.plot}</p>
                <p>Rating: {this.state.clicked.vote_average}</p>
                <p>Release Date: {this.state.clicked.release_date}</p>
                <button onClick={() => this.addWatchlist(this.state.clicked)}>Add To Watchlist</button>
                <button onClick={this.unclick}>Back To Movie List</button> 
            </div>
        )
    }

    unclick = () => {
        this.setState({
            clicked: null
        })
    }

    sort = () => {
        this.setState({
            sort: !this.state.sort
        })
    }

    render(){
        return (
            <div class='container'> 
                {!this.state.clicked ? <h2>All Movies</h2> : null}
                {!this.state.clicked ? <button onClick={this.sort}>Sort By Rating</button> : null}
                <div class='row justify-content-center'>
                    {!this.state.clicked ? this.renderMovies() : this.showMovie()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        movies: state.movies,
        user: state.user,
        watchlist: state.watchlist,
        seen: state.seen
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        add: (action) => {
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieContainer)