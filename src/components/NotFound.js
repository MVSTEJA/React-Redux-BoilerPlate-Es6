import React, { Component } from 'react';
import { Link } from 'react-router';

export const NotFound = () => <article>
  <h1>Page not found.</h1>
  <Link to="/" className="btn">Home</Link>
</article>;

