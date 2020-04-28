import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getMissingKeys } from '../../utilities/parse';
import theme from '../../theme/theme';
import Button from '../buttons/buttons';
import LogInput from '../log-input/log-input';
import AlertSnackbar from '../alert-snackbar/alert-snackbar';
import { emptyEntry } from '../../App';

const ButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin: 20px;
`;

export default function AddLog({ onAdd, onReturn }) {
	const [data, setData] = useState(emptyEntry);
	const [submit, setSubmit] = useState(false);
	const [missing, setMissing] = useState([]);
	const [snackbar, setSnackbar] = useState({
		inputMissing: false,
		entrySaved: false,
	});

	const _controlSnack = key => state => {
		setSnackbar({...snackbar, [key]: state})
	}

	const handleAdd = () => {
		setSubmit(true);
		setMissing(getMissingKeys(data, ['title', 'date', 'time']));
		const { title, date, time } = data;

		if(title && date && time) {
			onAdd(data);
			_controlSnack('entrySaved')(true);
			setTimeout(() => {
				onReturn();
				_controlSnack('entrySaved')(false);
			}, theme.timing.redirectDelay);
		} else {
			_controlSnack('inputMissing')(true);
		}
	}

	return(
		<Fragment>
			<LogInput data={data} onSet={setData} submit={submit} />
			<ButtonContainer>
				<Button type="secondary" onClick={handleAdd}>Save</Button>
				<Button type="primary" onClick={onReturn}>Back</Button>
			</ButtonContainer>
			<AlertSnackbar
				type="info"
				state={snackbar.inputMissing}
				setState={_controlSnack('inputMissing')}
				message={`The following inputs are missing: ${missing.join(', ')}`}
			/>
			<AlertSnackbar
				type="success"
				state={snackbar.entrySaved}
				setState={_controlSnack('entrySaved')}
				message="Entry successfully saved"
			/>
		</Fragment>
	);
}

AddLog.propTypes = {
	onAdd: PropTypes.func,
	odReturn: PropTypes.func,
}

AddLog.defaultProps = {
	onAdd: () => {},
	onReturn: () => {},
}
