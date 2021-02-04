import React, { useEffect, useState } from "react";
import './App.css';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Main from './components/Main/Main';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
// import { signIn, setUser } from "./Redux/ducks/Auth/AuthDucks";
import { signIn } from './services/Salesforce/index'


function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?#]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

}));

function App() {
  const classes = useStyles();

  // useEffect(async () => {
  //     if (!window.location.href.includes('access_token')) {
  //         const res = await signIn();
  //         if (res.data) {
  //             window.document.write(res.data);
  //         }
  //     } else {
  //         const token = getParameterByName('access_token');
  //         console.log(token);
  //         setUser({id:token})
  //     }
  // }, []);

    const [ isLogged, setIsLogged] = useState(false);
    const accessToken = Cookies.get('token');

    if (!accessToken) {
        signIn().then(res => {
            if (res) {
                if (!window.location.href.includes('access_token') && res.data) {
                        window.document.write(res.data);
                } else {
                    const token = getParameterByName('access_token');
                    setIsLogged(true);
                    Cookies.set('token', token);
                    window.location.replace('http://localhost:3030/');
                }
            }
        });
    } else {
        !isLogged && setIsLogged(true);
    }


  return (
      <div className={classes.root}>
          {
              <Switch>
                  {isLogged && <Route path='*' component={Main} /> }
              </Switch>
          }
      </div>
  )
}
const mapStateToProps = ({ authReducer }) => ({ authReducer })
export default connect(mapStateToProps)(App);
