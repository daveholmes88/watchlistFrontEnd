import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {

    render() {
        return (
            <nav class="navbar navbar-inverse bg-dark">
                <div class='container'>
                <h4 class="text-light">Watchlist</h4>
                <Link to='/login'>Login</Link>
                <Link to='/movies'>Movies</Link>
                <Link to='/watchlist'>My Watchlist</Link>
                <Link to='/seen'>Seen Movies</Link>
                </div>
            </nav>
        )
    }
}

export default Navbar