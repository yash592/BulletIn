import history from '../../history';
import auth0 from 'auth0-js';
import { AUTH0_CONFIG } from '../../auth0';
import API from "../../utils/API"




export default class Auth {
  accessToken;
  idToken;
  expiresAt;
  userProfile;
  userImage;
  name;
  id;



  auth0 = new auth0.WebAuth({
    domain: AUTH0_CONFIG.domain,
    clientID: AUTH0_CONFIG.clientId,
    redirectUri: AUTH0_CONFIG.callbackUrl,
    responseType: 'token id_token',
    scope: 'openid profile'
  })



  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
    this.userInfo = this.userInfo.bind(this)
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        API.saveUser(authResult.idTokenPayload);
        history.replace('/home')
      } else if (err) {
        history.replace('/');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  userInfo() {
    return this.userProfile
  }

  setSession(authResult) {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    console.log(authResult);
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this.accessToken = authResult.accessToken
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;
    this.userImage = authResult.idTokenPayload.picture;
    this.name = authResult.idTokenPayload.name.split(' ', 1);
    this.id = authResult.idTokenPayload.nickname;
    localStorage.setItem('user', this.id)



    // navigate to the home route
    history.replace('/home');

  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
       if (authResult && authResult.accessToken && authResult.idToken) {
         this.setSession(authResult)
         console.log('authresult', authResult);

       } else if (err) {
         this.logout();
         console.log(err);
         alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
       }
    });
  }

  logout() {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn', 'user');

    // navigate to the home route
    history.replace('/home');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }


}
