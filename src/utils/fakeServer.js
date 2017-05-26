import bcrypt from 'bcryptjs';
import genSalt from './salt';
const salt = bcrypt.genSaltSync(10);
let users;
// webpack doesn't like localStorage otherwise
let localStorage = global.window.localStorage;

/**
 * Fake remote server, using bcrypt and localStorage to persist data across page
 * reloads
 * @type {Object}
 */
const server = {
  /**
   * Populates the users var, similar to seeding a database in the real world
   */
  init() {
    // Get the previous users from localStorage if they exist, otherwise
    // populates the localStorage
    if (localStorage.users === undefined || !localStorage.encrypted) {
      // Set default user
      const AzureDiamond = "AzureDiamond";
      const AzureDiamondSalt = genSalt(AzureDiamond);
      const AzureDiamondPass = bcrypt.hashSync("hunter2", AzureDiamondSalt);
      users = {
        [AzureDiamond]: bcrypt.hashSync(AzureDiamondPass, salt)
      };
      localStorage.users = JSON.stringify(users);
      localStorage.encrypted = true;
    } else {
      users = JSON.parse(localStorage.users);
    }
  },
  /**
   * Pretends to log a user in
   *
   * @param {string} email The email of the user to log in
   * @param {string} password The password of the user to register
   * @param {?callback} callback Called after a user is logged in
   */
  login(email, password, callback) {
    let error;
    const userExists = this.doesUserExist(email);
    // If the user exists and the password fits log the user in
    if (userExists && bcrypt.compareSync(password, users[email])) {
      if (callback) callback({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      });
    } else {
      if (userExists) {
        // If the password is wrong, throw the password-wrong error
        error = {
          type: "password-wrong"
        }
      } else {
        // If the user doesn't exist, throw the user-doesnt-exist
        error = {
          type: "user-doesnt-exist"
        }
      }
      if (callback) callback({
        authenticated: false,
        error: error
      });
    }
  },
  /**
   * Pretends to register a user
   *
   * @param {string} email The email of the user to register
   * @param {string} password The password of the user to register
   * @param {?callback} callback Called after a user is registered
   */
  register(email, password, callback) {
    if (!this.doesUserExist(email)) {
      // If the email isn't used, hash the password with bcrypt to store it
      // in localStorage
      users[email] = bcrypt.hashSync(password, salt);
      localStorage.users = JSON.stringify(users);
      if (callback) callback({
        registered: true
      });
    } else {
      // If the email is already in use, throw the email-exists error
      if (callback) callback({
        registered: false,
        error: {
          type: "email-exists"
        }
      });
    }
  },
  /**
   * Pretends to log a user out
   * @param  {Function} callback Called after the user was logged out
   */
  logout(callback) {
    localStorage.removeItem('token');
    if (callback) callback();
  },
  /**
   * Checks if a email exists in the db
   * @param  {string} email The email that should be checked
   * @return {boolean}         True if the email exists, false if it doesn't
   */
  doesUserExist(email) {
    return !(users[email] === undefined);
  }
}

server.init();

export default server;
