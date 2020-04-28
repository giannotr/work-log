import React, { useState, useEffect } from 'react';
import TypeInsurance from 'type-insurance';
import path from 'path';
import {
	readJSON,
	writeJSON,
	importLog,
	exportLog,
} from './utilities/fs-i-o';

import styled from 'styled-components';
import theme, { muiTheme } from './theme/theme';
import { ThemeProvider } from '@material-ui/core/styles';

import Main from './components/main/main';
import Content from './components/content/content';
import {
	Toolbar,
	ToolbarItem,
} from './components/toolbar/toolbar';
import TabPanel from './components/tab-panel/tab-panel';

import { Log, LogEntry } from './components/log/log';
import AddLog from './components/add-log/add-log';
import Timer from './components/timer/timer';
import Report from './components/report/report';
import Editor from './components/editor/editor';
import AlertSnackbar from './components/alert-snackbar/alert-snackbar';

import WorkIcon from '@material-ui/icons/Work';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import TimerIcon from '@material-ui/icons/Timer';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import InputIcon from '@material-ui/icons/Input';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
//import { ReactComponent as Log } from './log.svg';

const _datadir = path.resolve('./log.json');

export const emptyEntry = {
	title: '',
	description: '',
	date: new Date(),
	time: '',
}

const Header = styled.header`
	padding: 2rem;
	background: ${theme.components.header.background};
	color: ${theme.components.header.color};
`;

function App() {
	const [tab, setTab] = useState(0);
	const [data, setData] = useState(null);
	const [index, setIndex] = useState(0);
	const [entry, setEntry] = useState(emptyEntry);
	const [editing, setEditing] = useState(false);
	const [snackbar, setSnackbar] = useState({
		importSuccess: false,
		importFailure: false,
		exportSuccess: false,
		exportFailure: false,
	});

	useEffect(() => {
		readJSON(_datadir, setData);
	}, []);

	useEffect(() => {
		writeJSON(_datadir, data);
	}, [data]);

	const _controlSnack = key => state => {
		setSnackbar({...snackbar, [key]: state})
	}

	const handleEdit = index => {
		setIndex(index);
		setEntry(data[index]);
		setEditing(true);
	}

	const handleAdd = entry => {
		let _data = [];

		if(data) {
			_data = [...data];
		}

		_data.push(entry);
		setData(_data);
	}

	const handleSave = (index, entry) => {
		const _data = [...data];
		_data[index] = entry;
		setData(_data);
	}

	const handleDelte = index => {
		const _data = [...data];
		_data.splice(index, 1);
		setData(_data);
	}

	const handleImport = async () => {
		const response = await importLog(setData);

		if(response) {
			_controlSnack('importSuccess')(true);
			setTab(0);
		} else if(response === null) {
			_controlSnack('importFailure')(true);
		}
	}

	const handleExport = async () => {
		const response = await exportLog(data);

		if(response) {
			_controlSnack('exportSuccess')(true);
		} else if(response === null) {
			_controlSnack('exportFailure')(true);
		}
	}

	return (
		<Main>
			<Toolbar>
				<ToolbarItem id="tool-0" label="Work log" onClick={() => setTab(0)}>
					<WorkIcon />
				</ToolbarItem>
				<ToolbarItem id="tool-1" label="Add log item" onClick={() => setTab(1)}>
					<PlaylistAddIcon />
				</ToolbarItem>
				<ToolbarItem id="tool-2" label="Timer" onClick={() => setTab(2)}>
					<TimerIcon />
				</ToolbarItem>
				<ToolbarItem id="tool-3" label="Report" onClick={() => setTab(3)}>
					<AssignmentReturnedIcon />
				</ToolbarItem>
				<ToolbarItem id="tool-4" label="Import" onClick={handleImport}>
					<InputIcon />
				</ToolbarItem>
				<ToolbarItem id="tool-5" label="Export" onClick={handleExport}>
					<VerticalAlignBottomIcon />
				</ToolbarItem>
			</Toolbar>
			<Content>
				<ThemeProvider theme={muiTheme}>
					<Header>
						<h1>Document you work load <span role="img" aria-label="hammer">🔨</span></h1>
					</Header>
					<TabPanel index={0} currentIndex={tab} id="tabpanel-0" labelledby="tool-0">
						{(data && data.length > 0) ? <Log>
							{data.map((entry, index) => {
								const { title, description, date } = entry;
								const time = new TypeInsurance(entry.time);

								return(
									<LogEntry
										key={index}
										index={index}
										title={title}
										description={description}
										date={date}
										time={time.number}
										onEdit={handleEdit}
										onDelete={handleDelte}
									/>
								)
							})}
						</Log>
						:
						"You did not add any entries yet..."
						}
					</TabPanel>
					<TabPanel index={1} currentIndex={tab} id="tabpanel-1" labelledby="tool-1">
						<AddLog onAdd={handleAdd} onReturn={() => setTab(0)} />
					</TabPanel>
					<TabPanel index={2} currentIndex={tab} id="tabpanel-2" labelledby="tool-2">
						<Timer onAdd={handleAdd} onReturn={() => setTab(0)} />
					</TabPanel>
					<TabPanel index={3} currentIndex={tab} id="tabpanel-3" labelledby="tool-3">
						<Report data={data} onRedirect={() => setTab(1)} />
					</TabPanel>
					<Editor
						open={editing}
						index={index}
						entry={entry}
						onSave={handleSave}
						onClose={() => setEditing(false)}
					/>
					<AlertSnackbar
						type="success"
						state={snackbar.importSuccess}
						setState={_controlSnack('importSuccess')}
						message="Log import was successful"
					/>
					<AlertSnackbar
						type="error"
						state={snackbar.importFailure}
						setState={_controlSnack('importFailure')}
						message="Log import failed"
					/>
					<AlertSnackbar
						type="success"
						state={snackbar.exportSuccess}
						setState={_controlSnack('exportSuccess')}
						message="Log export was successful"
					/>
					<AlertSnackbar
						type="error"
						state={snackbar.exportFailure}
						setState={_controlSnack('exportFailure')}
						message="Log export failed"
					/>
				</ThemeProvider>
			</Content>
		</Main>
	);
}

export default App;
