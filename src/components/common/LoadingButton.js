/**
 * LoadingButton.react.js
 *
 * Wraps the loading indicator in a tag with the .btn--loading class
 */

import React from 'react';
import LoadingIndicator from './LoadingIndicator';

function LoadingButton(props) {
  return(
    <a href="javascript:void(0);" className={props.className + " btn btn--loading"} disabled="true">
      <LoadingIndicator />
    </a>
  )
}

export default LoadingButton;
