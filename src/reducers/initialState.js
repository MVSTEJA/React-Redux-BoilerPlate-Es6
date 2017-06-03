import auth from '../utils/auth';

export default {
  authors: [],
  courses: [],
  ajaxCallsInProgress: 0,
  formState: {
    email: '',
    password: ''
  },
  currentlySending: false,
  loggedIn: auth.loggedIn(),
  errorMessage: '',
  tweets:[]
};
