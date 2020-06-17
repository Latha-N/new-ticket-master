import React from 'react'
import {Link} from 'react-router-dom'

function Navigation(props){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="/"> Ticket Master</a>
            <button className="navbar-toggler" tytpe="button" data-toggler="collaps"><span className="navbar-toggler-icon"></span>

            </button>

            <div className="collapse navbar-collapse" id="">

            </div>

            </nav>
        )
}