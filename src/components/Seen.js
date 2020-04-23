import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import SeenCard from './SeenCard'

class Seen extends Component {

    constructor() {
        super()
        this.state = {
            clicked: null,
            sort: false 
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/seens')
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                const mySeenlist = data.filter(watch => {
                    return watch.user_id === this.props.user.id
                })
                const myMovies = mySeenlist.map(seen => {
                    return seen.movie
                })
                const action = {type: 'CREATE_SEEN', payload: myMovies}
                this.props.add(action) 
            })
    }

    renderMovies = () => {
        let filterMovies = this.props.seen
        if (this.state.sort) {
            filterMovies = filterMovies.sort(function(a, b) {return b.vote_average - a.vote_average})
        }
        return filterMovies.map(movie => {
            return <SeenCard 
            movie={movie}
            removeFromSeenList={this.removeFromSeen}
            showClick={this.showClick}
            /> 
        })
    }

    showClick = movie => {
        this.setState({
            clicked: movie
        })
    }

    removeFromSeen = (movie) => {
        const movieId = movie.id
        const userId = this.props.user.id
        const editObj = {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user: userId,
                movie: movieId
            })
        }
        fetch(`http://localhost:3000/movies/${movieId}`, editObj)
            .then(resp => resp.json())
            .then(seenList => {
                const myMovies = seenList.map(seen => {
                    return seen.movie
                })
                const action = { type: 'CREATE_SEEN', payload: myMovies }
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
                <h3>{this.state.clicked.title}</h3>
                <img src={`https://image.tmdb.org/t/p/w300${this.state.clicked.poster}`}></img>
                <p>Plot: {this.state.clicked.plot}</p>
                <p>Rating: {this.state.clicked.vote_average}</p>
                <p>Release Date: {this.state.clicked.release_date}</p>
                <button onClick={() => this.removeFromSeen(this.state.clicked)}>Remove From Seen</button>
                <button onClick={this.unclick}>Back To Seen List</button> 
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
            <div class='container'>
                {!this.state.clicked ? <h2>Movies You've Seen</h2> : null}
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
        user: state.user,
        seen: state.seen
    }
} 

const mapDispatchToProps = dispatch => {
    return {
        add: (action) => {
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Seen)