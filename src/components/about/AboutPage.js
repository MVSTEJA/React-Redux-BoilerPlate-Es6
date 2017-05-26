import React from 'react';
import { Link, IndexLink } from 'react-router';

class AboutPage extends React.Component {
  render() {
    return (
      <div>
        <div className="nav__wrapper">
        <Link to="about/profile" className="btn btn--login btn--nav" >Profile</Link>
        <Link to="about/team" className="btn btn--login btn--nav" >Team</Link>
        <Link to="about/contact" className="btn btn--login btn--nav" >Contact</Link>
        </div>
        <h1>About</h1>
        <p>This application uses React, Redux, React Router and a variety of other helpful libraries.</p>
      </div>
    );
  }
}

export default AboutPage;
