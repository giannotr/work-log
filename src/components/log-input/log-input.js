import 'date-fns';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TypeInsurance from 'type-insurance';
import { getDateString } from '../../utilities/parse';
import styled from 'styled-components';
import theme from '../../theme/theme';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const Form = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-item: center;
	min-width: 600px;

	div {
		width: 100%;
		margin: 6px 0;
	}

	.MuiInputAdornment-root {
		width: auto;
	}

	input, textarea {
		width: 100%;
		font-family: 'Rokkitt', serif;
	}

	label {
		padding: 0 6px;
		font-family: 'Ubuntu Mono', monospace;
		text-transform: capitalize;
	}

	@media only screen and (max-width: ${theme.breakpoints.sm}) {
		min-width: 300px;
	}
`;

const RequiredSpan = styled.span`
	margin: 0 0 0 3px;
`;

const _maxTitleLength = 30;

export default function LogInput({ data, onSet, submit }) {
	const [touched, setTouched] = useState({
		title: false,
		time: false,
	});

	useEffect(() => {
		if(submit) {
			setTouched({
				title: true,
				time: true,
			})
		}
	}, [submit])

	const _onSet = (key, value) => {
		onSet({...data, [key]: value});
		setTouched({...touched, [key]: true});
	}

	const handleTitle = e => {
		const { string } = new TypeInsurance(e.target.value);
		if(string.length < _maxTitleLength + 1) {
			_onSet('title', string);
		}
	}

	const handleTime = e => {
		const { value } = e.target;
		const _value = value ? Number(value) : '';
		if(!isNaN(_value)) {
			_onSet('time', _value.toString());
		}
	}

	const handleDate = date => {
		if(date instanceof Date) {
			const _date = getDateString(date);
			if(_date) {
				_onSet('date', _date);
			}
		}
	}

	return(
		<Form>
			<TextField
				fullWidth
				required
				id="title"
				label="Title"
				helperText={`${_maxTitleLength - data.title.length}/${_maxTitleLength} remaining`}
				error={!data.title && touched.title}
				value={data.title}
				onChange={handleTitle}
			/>
			<TextField
				fullWidth
				multiline
				id="description"
				label="Description"
				value={data.description}
				onChange={e => _onSet('description', e.target.value)}
			/>
			<FormControl>
				<InputLabel htmlFor="time">Time<RequiredSpan>*</RequiredSpan></InputLabel>
				<Input
					fullWidth
					required
					id="time"
					error={!data.time && touched.time}
					value={data.time}
					onChange={handleTime}
					endAdornment={<InputAdornment position="end">min.</InputAdornment>}
					aria-describedby="pick-time-in-minutes"
					inputProps={{
						'aria-label': 'time',
					}}
				/>
				<FormHelperText id="pick-time-in-minutes">Enter the time in minutes</FormHelperText>
			</FormControl>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<KeyboardDatePicker
					disableToolbar
					fullWidth
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date"
          label="Date"
          value={new Date(data.date)}
          onChange={handleDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
			</MuiPickersUtilsProvider>
		</Form>
	);
}

LogInput.propTypes = {
	data: PropTypes.object.isRequired,
	onSet: PropTypes.func.isRequired,
	submit: PropTypes.bool,
}

LogInput.defaultProps = {
	submit: false,
}
