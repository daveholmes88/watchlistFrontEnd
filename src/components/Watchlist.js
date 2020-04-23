import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import WatchlistCard from './WatchlistCard'

class Watchlist extends Component {
    
    constructor() {
        super()
        this.state = {
            clicked: null,
            sort: false
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/watchlists')
            .then(resp => resp.json())
            .then(data => {
                const myWatch = data.filter(watch => {
                    return watch.user_id === this.props.user.id
                })
                const myMovies = myWatch.map(watch => {
                    return watch.movie
                })
                const action = { type: 'CREATE_WATCHLIST', payload: myMovies }
                this.props.add(action)
            })
            .catch(err => console.log(err))

    }

    renderWatchlistCard = () => {
        let myWatch = this.props.watchlist
        if (this.state.sort) {
            myWatch = myWatch.sort(function(a, b) {return b.vote_average - a.vote_average})
        }
        return myWatch.map(movie => {
            return <WatchlistCard 
            key={movie.id} 
            movie={movie} 
            removeFromWatchlist={this.removeFromWatchlist}
            showClick={this.showClick}
            />
        })
    }

    showClick = (movie) => {
        this.setState({
            clicked: movie
        })
    }

    removeFromWatchlist = (movie) => {
        const movieId = movie.id
        const userId = this.props.user.id
        const deleteObj = {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user: userId,
                movie: movieId
            })
        }
        this.setState({
            clicked: null
        })
        fetch(`http://localhost:3000/movies/${movieId}`, deleteObj)
            .then(resp => resp.json())
            .then(watchlists => {
                const myMovies = watchlists.map(watch => {
                    return watch.movie
                })
                const action = { type: 'CREATE_WATCHLIST', payload: myMovies }
                this.props.add(action)
            })
            .catch(err => console.log(err))
    }

    sort = () => {
        this.setState({
            sort: !this.state.sort
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
                <button onClick={() => this.removeFromWatchlist(this.state.clicked)}>Remove From Watchlist</button>
                <button onClick={this.unclick}>Back To Watchlist</button> 
            </div>
        )
    }

    unclick = () => {
        this.setState({
            clicked: null
        })
    }

    render() {
        return (
            <div>
                <div class='container'>
                    {!this.state.clicked ? <h2>Your Watchlist</h2> : null}
                    {!this.state.clicked ? <button onClick={this.sort}>Sort By Rating</button> : null}
                    <div class='row justify-content-center'>
                        {this.state.clicked ? this.showMovie() : this.renderWatchlistCard()}
                    </div>
                </div>
            </div>
        )
       
    }
}
const mapStateToProps = state => {
    return {
        watchlist: state.watchlist,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        add: (action) => {
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Watchlist)