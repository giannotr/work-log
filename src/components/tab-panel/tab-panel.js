import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function TabPanel({
	index,
	currentIndex,
	id,
	labelledby,
	children,
	...other
}) {
  return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={currentIndex !== index}
			id={id}
			aria-labelledby={labelledby}
			{...other}
		>
			{currentIndex === index && <Box p={3} {...other}>{children}</Box>}
		</Typography>
  );
}

TabPanel.propTypes = {
	index: PropTypes.any.isRequired,
	currentIndex: PropTypes.any.isRequired,
	id: PropTypes.string.isRequired,
	labelledby: PropTypes.string,
	children: PropTypes.node,
};

TabPanel.defaultProps = {
	labelledby: '',
	children: <Fragment />,
}
