import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useWindowSize from '../../hooks/use-window-size';
import { getMissingKeys } from '../../utilities/parse';
import theme from '../../theme/theme';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '../buttons/buttons';
import LogInput from '../log-input/log-input';
import AlertSnackbar from '../alert-snackbar/alert-snackbar';
import { emptyEntry } from '../../App';

export default function Editor({
	open,
	index,
	entry,
	onSave,
	onClose,
}) {
	const [data, setData] = useState(emptyEntry);
	const [missing, setMissing] = useState([]);
	const [snackbar, setSnackbar] = useState({
		inputMissing: false,
		editSaved: false,
	});
	const { width } = useWindowSize();

	const fullScreen = width < parseInt(theme.breakpoints.md);

	useEffect(() => {
		setData(entry);
	}, [entry]);

	const _controlSnack = key => state => {
		setSnackbar({...snackbar, [key]: state})
	}

	const handleSave = () => {
		setMissing(getMissingKeys(data, ['title', 'date', 'time']));
		const { title, date, time } = data;

		if(title && date && time) {
			onSave(index, data);
			_controlSnack('editSaved')(true);
			setTimeout(() => {
				onClose();
				_controlSnack('editSaved')(false);
			}, theme.timing.redirectDelay);
		} else {
			_controlSnack('inputMissing')(true);
		}
	}

  return (
		<Dialog
			fullScreen={fullScreen}
			open={open}
			onClose={onClose}
			aria-labelledby="responsive-log-editor"
		>
			<DialogTitle id="responsive-log-editor">
				Edit entry
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					<LogInput data={data} onSet={setData} />
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button type="secondary" onClick={handleSave}>Save</Button>
				<Button type="primary" onClick={onClose}>Close</Button>
			</DialogActions>
			<AlertSnackbar
				type="info"
				state={snackbar.inputMissing}
				setState={_controlSnack('inputMissing')}
				message={`The following inputs are missing: ${missing.join(', ')}`}
			/>
			<AlertSnackbar
				type="success"
				state={snackbar.editSaved}
				setState={_controlSnack('editSaved')}
				message="Entry successfully edited"
			/>
		</Dialog>
  );
}

Editor.propTypes = {
	open: PropTypes.bool.isRequired,
	index: PropTypes.number.isRequired,
	entry: PropTypes.PropTypes.shape({
		title: PropTypes.string.isRequired,
		description: PropTypes.string,
		date: PropTypes.string.isRequired,
		time: PropTypes.string.isRequired,
	}),
	onSave: PropTypes.func,
	onClose: PropTypes.func.isRequired,
}

Editor.defaultProps = {
	entry: {
		title: '',
		description: '',
		date: '',
		time: '',
	},
	onSave: () => {},
}
