import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import zeroFill from 'zero-fill';
import {
	parseSeconds,
	getMissingKeys,
} from '../../utilities/parse';
import theme from '../../theme/theme';
import Button from '../buttons/buttons';
import TabPanel from '../tab-panel/tab-panel';
import LogInput from '../log-input/log-input';
import AlertSnackbar from '../alert-snackbar/alert-snackbar';
import UpdateIcon from '@material-ui/icons/Update';
import { emptyEntry } from '../../App';

const TimerContainer = styled.div`
	min-height: 450px;
	text-align: center;
`;

const TimerClock = styled.div`
	width: 100%;
	margin: 50px auto;
	font-size: 40px;
	text-align: center;
`;

const TimerIcon = styled.div`
	padding: 6px;

	svg {
		width: 36px;
		height: 36px;
	}
`;

const _maxTime = 86399;

export default function Timer({ onAdd, onReturn }) {
	const [step, setStep] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [timer, setTimer] = useState(null);
	const [data, setData] = useState(emptyEntry);
	const [submit, setSubmit] = useState(false);
	const [missing, setMissing] = useState([]);
	const [snackbar, setSnackbar] = useState({
		emptyTimer: false,
		clockRunning: false,
		inputMissing: false,
		entrySaved: false,
	});

	const _stop = useCallback(
		() => {
			clearInterval(timer);
			setTimer(null);
		},
		[timer],
	);

	const _controlSnack = key => state => {
		setSnackbar({...snackbar, [key]: state})
	}

	useEffect(() => {
		if(seconds > _maxTime) {
			_stop();
		}
	}, [seconds, _stop]);

	const handleStart = () => {
		if(!timer) {
			setTimer(setInterval(() => {
				setSeconds(time => time < _maxTime ? time + 1 : time);
			}, 1000));
		}
	}

	const handleStop = () => {
		_stop();
		setData({...data, time: Math.round(seconds / 60) + ''});
	}

	const handleReset = () => {
		_stop();
		setSeconds(0);
	}

	const handleProceed = () => {
		if(timer) {
			_controlSnack('clockRunning')(true);
		} else if(seconds <= 0) {
			_controlSnack('emptyTimer')(true);
		} else {
			setStep(1);
		}
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

	const parsedTime = parseSeconds(seconds);
	const timeDisplay = ''
		+ `${parsedTime.hours ? parsedTime.hours + 'h' : ''}`
		+ `${zeroFill(2, parsedTime.minutes)}:`
		+ `${zeroFill(2, parsedTime.seconds)}`;

	return(
		<TimerContainer>
			<TabPanel index={0} currentIndex={step} id="timerstep-0">
				<Button type="primary" onClick={handleStart}>
					{seconds < _maxTime ?
						!(timer || seconds === 0) ? 'Resume' : 'Start'
						:
						'Take a break!'
					}
				</Button>
				<Button type="secondary" onClick={handleStop}>Stop</Button>
				<Button type="primary" onClick={handleReset}>Reset</Button>
				<TimerClock>
					<TimerIcon><UpdateIcon /></TimerIcon>
					{timeDisplay}
				</TimerClock>
				<Button type="primary" onClick={handleProceed}>Add to log</Button>
			</TabPanel>
			<TabPanel index={1} currentIndex={step} id="timerstep-1">
				<LogInput data={data} onSet={setData} submit={submit} />
				<Button type="secondary" onClick={handleAdd}>Save</Button>
				<Button type="primary" onClick={() => setStep(0)}>Back to timer</Button>
				<Button type="primary" onClick={() => onReturn()}>Return to log</Button>
			</TabPanel>
			<AlertSnackbar
				type="warning"
				state={snackbar.emptyTimer}
				setState={_controlSnack('emptyTimer')}
				message="You can't add a timed log entry without having timed it. Start the clock ⏲️"
			/>
			<AlertSnackbar
				type="warning"
				state={snackbar.clockRunning}
				setState={_controlSnack('clockRunning')}
				message="You can't add a log entry while the clock is still running. Please stop it before proceeding"
			/>
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
		</TimerContainer>
	);
}

Timer.propTypes = {
	onAdd: PropTypes.func,
	onReturn: PropTypes.func,
}

Timer.defaultProps = {
	onAdd: () => {},
	onReturn: () => {},
}
