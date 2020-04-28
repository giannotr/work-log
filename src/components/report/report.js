import React, { Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { generatePlainText } from '../../utilities/format';
import Button from '../buttons/buttons';
import TextField from '@material-ui/core/TextField';
import AssignmentIcon from '@material-ui/icons/Assignment';

const ControlsContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	margin: 10px 0;
`;

export default function Report({ data, onRedirect }) {
	const node = useRef(null);
	
	const value = generatePlainText(data);

	const handleCopy = () => {
		const { current } = node;
		current.focus();
		current.select();
		current.setSelectionRange(0, 99999);
  	document.execCommand('copy');
	}

	return(
		<div>
			{data.length > 0 ?
				<Fragment>
					<ControlsContainer>
						<Button onClick={handleCopy}><AssignmentIcon /> Copy</Button>
					</ControlsContainer>
						<TextField
							fullWidth
							multiline
							inputRef={node}
							id="report-clipboard"
							label="Report"
							variant="outlined"
							value={value}
						/>
				</Fragment>
				:
				<Fragment>
					There is nothing to report yet. Try adding some items to your log.
					<Button onClick={onRedirect}>Add item</Button>
				</Fragment>
			}
		</div>
	);
}

Report.prototype = {
	data: PropTypes.array,
}

Report.defaultProps = {
	data: [],
}