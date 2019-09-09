import React from 'react';
import './Navigation.css';
const Navigation = ({onRouteChange, isSignedIn}) => {

        if(isSignedIn){
        return(
            <nav>
                <p onClick={() => onRouteChange('signout')/*() => prevents the function being called on render*/} className="f3 link dim black underline pa3 pointer">Sign Out</p>
            </nav>
        )
        }else{
        return(
            <nav>
                <p onClick={() => onRouteChange('signin')/*() => prevents the function being called on render*/} className="f3 link dim black underline pa3 pointer">SignIn</p>
                <p onClick={() => onRouteChange('register')/*() => prevents the function being called on render*/} className="f3 link dim black underline pa3 pointer">Register</p>
            </nav>
        )
        }
    
}

export default Navigation;