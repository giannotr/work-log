import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AlertSnackbar({
	type,
	state,
	setState,
	message,
}) {
	return(
		<Snackbar
			open={state}
			autoHideDuration={4000}
			onClose={() => setState(false)}
		>
			<Alert onClose={() => setState(false)} severity={type}>
				{message}
			</Alert>
		</Snackbar>
	);
}

AlertSnackbar.propTypes = {
	type: PropTypes.string.isRequired,
	state: PropTypes.bool.isRequired,
	setState: PropTypes.func.isRequired,
	message: PropTypes.any.isRequired,
}
