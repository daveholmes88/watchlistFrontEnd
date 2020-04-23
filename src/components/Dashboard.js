import React, { Component } from 'react';
import Watchlist from './Watchlist'; 
import MovieContainer from './MovieContainer';
import { Route } from 'react-router-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux'

class Dashboard extends Component {
    // componentDidMount() {
    //     let reqObj = {}
    //     const token = localStorage.getItem('token')
    //     if (!token){
    //         this.props.history.push('/login')
    //     } else {
    //         reqObj = {
    //             method: 'GETS', 
    //             headers: {
    //                 'Authorization': `Bearer: ${token}`
    //             }
    //         }
    //     }
    //     fetch('http://localhost:3000/api/v1/users', reqObj)
    //         .then(resp => resp.json())
    //         .then(data => {
    //             console.log(data)
    //             this.props.addUser(data)
    //         })
    // }

    render(){
        return(
            <BrowserRouter>
                <div className='dashboard'>
                    <Switch>
                        <Route path='/dashboard/movies' component={MovieContainer} />
                        <Route path='/dashboard/watchlist' component={Watchlist} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addUser: (user) => {
            dispatch({ type: 'ADD_USER', payload: user })
        }
    }
}

export default connect(null, mapDispatchToProps)(Dashboard)
    