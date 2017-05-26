import request from './fakeRequest';

/**
 * Authentication lib
 * @type {Object}
 */
const auth = {
  /**
   * Logs a user in
   * @param  {string}   email The email of the user
   * @param  {string}   password The password of the user
   * @param  {Function} callback Called after a user was logged in on the remote server
   */
  login(email, password, callback) {
    // If there is a token in the localStorage, the user already is
    // authenticated
    if (this.loggedIn()) {
      callback(true);
      return;
    }
    // Post a fake request (see below)
    request.post('/login', { email, password }, (response) => {
      // If the user was authenticated successfully, save a random token to the
      // localStorage
      if (response.authenticated) {
        localStorage.token = response.token;
        callback(true);
      } else {
        // If there was a problem authenticating the user, show an error on the
        // form
        callback(false, response.error);
      }
    });
  },
  /**
   * Logs the current user out
   */
  logout(callback) {
    request.post('/logout', {}, () => {
      callback(true);
    });
  },
  /**
   * Checks if anybody is logged in
   * @return {boolean} True if there is a logged in user, false if there isn't
   */
  loggedIn() {
    return !!localStorage.token;
  },
  /**
   * Registers a user in the system
   * @param  {string}   email The email of the user
   * @param  {string}   password The password of the user
   * @param  {Function} callback Called after a user was registered on the remote server
   */
  register(email, password, callback) {
    // Post a fake request
    request.post('/register', { email, password }, (response) => {
      // If the user was successfully registered, log them in
      if (response.registered === true) {
        this.login(email, password, callback);
      } else {
        // If there was a problem registering, show the error
        callback(false, response.error);
      }
    });
  },
  onChange() { }
};

export default auth;
