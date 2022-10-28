import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";


function NaviView(props) {

    const [expand,setExpand] = useState(false);
    const [display,setDisplay] = useState(false);
    const NAV_STYLES = ['navbar-collapse collapse show', 'navbar-collapse collapse'];
    const [navStyle,setNavStyle] = useState(NAV_STYLES[1]);
    const BUTTON_STYLES = ['navbar-toggler collapsed', 'navbar-toggler'];
    const [buttonStyle,setButtonStyle] = useState(BUTTON_STYLES[1]);


    useEffect(() => {
        showButton();
      }, [props.account]);
    
    const showButton = () => {
        if (window.innerWidth <= 960) {
            setExpand(false);
        } else {
            setExpand(true);
        }
    };

    const displayMenu = () => {
        if(display){
            setNavStyle(NAV_STYLES[1]);
            setButtonStyle(BUTTON_STYLES[1]);
            setDisplay(false);
        }else{
            setNavStyle(NAV_STYLES[0]);
            setButtonStyle(BUTTON_STYLES[0]);
            setDisplay(true);
        }
    }

    window.addEventListener('resize', showButton);

    const handleAccount = () => {
        console.log(props);
        console.log("Load account");
        props.loadAccount()
    }


    return(
    <nav style={{zIndex: '1'}}  className="navbar w-100 position-fixed navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">BikeBlock</a>
        <button className={buttonStyle} type="button" onClick={displayMenu} data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded={expand} aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
    
        <div className={navStyle} id="navbarColor01">
            <ul className="navbar-nav me-auto">
                <li className="nav-item active">
                    <Link 
                    to={'/'}
                    className="nav-link">
                        <p>Home</p>
                    </Link>
                    
                </li>
                <li className="nav-item">
                    <Link 
                    to={'/bountys'}
                    className="nav-link" >
                        <p>Bountys</p>
                    </Link>
           
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">About</a>
                </li>
            </ul>
            <div>
                {!props.account ?(
                            <button className="btn btn-outline-info my-2 my-sm-0" onClick={handleAccount} >Connect Wallet</button>
                            ):(
                                <Link
                                    to={'/profile/'+props.account} 
                                    className='nav-links'>
                                    Profile
                                    
                                    <p>{props.account.slice(0,20)}</p>
                                </Link>
                            )
                }
            </div>
        </div>
        </nav>
    
    )
    
}

export default NaviView;