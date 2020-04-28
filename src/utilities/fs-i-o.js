import { validateDataSchema } from '../utilities/validate';

const { access, readFileSync, writeFileSync } = require('fs');
const electron = window.require('electron');
const { remote } = electron;
const { dialog } = remote;
const { showOpenDialogSync, showSaveDialog } = dialog;

const _byDate = (x1, x2) => {
	const date1 = new Date(x1.date);
	const date2 = new Date(x2.date);
	return date2 - date1;
}

export const readJSON = (path, setCallback) => {
	access(path, (err) => {
		if(err) {
			writeJSON(path, []);
		} else {
			const inputBuffer = readFileSync(path, 'utf8');

			if(inputBuffer) {
				let data;

				try {
					data = JSON.parse(readFileSync(path, 'utf8'));

					if(validateDataSchema(data)) {
						setCallback(data);
					} else {
						return false;
					}

					return true;
				} catch(err) {
					console.error(err)
				}
			}

			return null;
		}
	});
}

export const writeJSON = (path, data) => {
	try {
		if(data) {
			writeFileSync(path, JSON.stringify(data.sort(_byDate)), 'utf8');
		}
		return true;
	} catch(err) {
		console.error(err)
		return false;
	}
}

export const importLog = async setCallback => {
	const response = await showOpenDialogSync({
		properties: ['openFile'],
		filters: [
			{ name: 'JSON', extensions: ['json'] },
		],
	});

	if(response) {
		const [filePath] = response;

		try {
			return readJSON(filePath, setCallback);
		} catch(err) {
			console.log(err);
			return null;
		}
	}

	return false;
}

export const exportLog = async data => {
	const { filePath } = await showSaveDialog({
		buttonLabel: 'Export Log',
		defaultPath: `./worklog-${Date.now()}.json`,
	});

	if(filePath) {
		try {
			return writeJSON(filePath, data);
		} catch(err) {
			console.log(err);
			return null;
		}
	}

	return false;
}
