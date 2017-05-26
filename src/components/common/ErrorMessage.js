import React, { PropTypes } from 'react';

let ErrorMessage = (props) => {
	console.log(props);
	return (
		props.errorMessage ?
			<div className="error-wrapper">
				<p className="error">{props.errorMessage}</p>
			</div>
			:<div></div>
	);
};

ErrorMessage.propTypes = {
	errorMessage: PropTypes.string
};

export default ErrorMessage;
