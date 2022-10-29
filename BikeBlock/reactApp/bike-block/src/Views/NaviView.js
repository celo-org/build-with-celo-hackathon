
import React, { Component } from 'react';
import {Link} from "react-router-dom";


class NaviView extends React.Component {

    constructor(props){
        super(props);
        this.handleAccount = this.handleAccount.bind(this);
    }

    componentWillMount() {
        // Start events
    }

    // load account from navi button
    handleAccount() {
        console.log("Load account");
        this.props.loadAccount()
    }

    render() {
        return(
            <div>

            <nav className="navbar navbar-dark bg-dark">
                <div>
                    <ul className="navbar-nav d-flex flex-row">
                        <p><a src="/" >BikeBlock</a></p>
                        <li className="nav-item px-2">
                            { this.props.account ? 
                                <Link className="text-decoration-none w-100 " to={'/profile/'+this.props.account}>
                                    <button type="button" className="btn  btn-primary">Profile</button>
                                </Link>
                                :
                                <button type="button" disabled={true} className="btn  btn-primary">Profile</button>
                            }
                            
                        </li>
                    </ul>
                </div>
                <div className=" p-2 bd-highlight">
                  <ul className="navbar-nav d-flex flex-row">
                  <li className="nav-item px-2">
                        <Link className="text-decoration-none w-100 " to={'/bountys'} >
                            <button type="button" className="btn  btn-primary">Bike Bountys</button>
                        </Link>
                    </li>


                    <li className="nav-item px-2">
                        {!this.props.account ?(
                            <button type="button" onClick ={this.handleAccount} className="btn  btn-primary">Connect Wallet</button>
                            ):(
                            <button type="button" className="btn btn-success" onClick={() => {navigator.clipboard.writeText(this.props.account)}} >{this.props.account}</button>
                            )
                        }
      
                    </li>

 
                
                  </ul>
                  </div>
              </nav>
      
              </div>
        )
    }
}
export default NaviView;