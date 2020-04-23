import React, { Component } from 'react'
import { connect } from 'react-redux'

class Login extends Component {
    constructor(){
        super()
        this.state = {
            username: ''
        }
    }

    onChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault()
        const reqUser = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: this.state.username
            })
        }
        fetch('http://localhost:3000/users', reqUser)
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                const addUser = { type: 'ADD_USER', payload: data.user }
                this.props.add(addUser)
                const createWatchlist = { type: 'CREATE_WATCHLIST', payload: data.watchlist }
                this.props.add(createWatchlist)
                const createSeen = { type: 'CREATE_SEEN', payload: data.seens}
                this.props.add(createSeen)
            })
            .catch(err => console.log(err))
            this.props.history.push('/movies')
    }

    render() {
        return (
            <div class='container'>
                <br></br>
                <form onSubmit={this.onSubmit}>
                    <label>Username:</label>
                    <input onChange={this.onChange} type='text' value={this.state.username}></input>
                    <input type='submit' value='Login'/>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        add: (action) => {
            dispatch(action)
        }
    }
}

export default connect(null, mapDispatchToProps)(Login);