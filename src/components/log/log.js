import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import theme from '../../theme/theme';
import { formatTime, formatDate } from '../../utilities/format';
import Button from '../../components/buttons/buttons';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const hyphenate = css`
  overflow-wrap: break-word;
  word-wrap: break-word;

  -ms-word-break: break-all;

  word-break: break-all;

  word-break: break-word;

  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
`;

export const Log = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, ${theme.components.logEntry.width});
	grid-gap: 24px;
	justify-content: center;
	position: relative;
	width: 100%;
	margin: 0;
`;

const LogTileContainer = styled.div`
	position: relative;
	width: ${theme.components.logEntry.width};
	height: ${theme.components.logEntry.width};
`;

const LogTile = styled.div`
	display: grid;
	grid-template-columns:
		calc(2 * ${theme.components.logEntry.width} / 3)
		calc(1 * ${theme.components.logEntry.width} / 3)
	;
	grid-template-rows:
		calc(1 * ${theme.components.logEntry.width} / 4)
		calc(2 * ${theme.components.logEntry.width} / 4)
		calc(1 * ${theme.components.logEntry.width} / 4)
	;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: ${theme.components.logEntry.background};
	color: ${theme.components.logEntry.colorA};
	border: none;
	border-radius: 0;
	transition: .25s all ease-in;
	box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

	[type=content] {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 12px;
	}
`;

const LogTileTitle = styled.div`
	grid-column: 1 / span 1;
	grid-row: 1 / 2;
	font-size: 14px;
	${hyphenate}

	h2 {
		font-size: inherit;
	}
`;

// -webkit-line-clamp is computed in the component below
//
const LogTileDescription = styled.div`
	grid-column: 1 / span 2;
	grid-row: 2 / 3;
	display: -webkit-box !important;
	width: ${theme.components.logEntry.width};
	padding-top: 4px !important;
	padding-bottom: 0 !important;
	-webkit-box-orient: vertical;
	-webkit-box-align: start !important;
	overflow: hidden;
	text-overflow: ellipsis;
	font-size: 14px;
	line-height: 13px;
	text-align: justify;
`;

const LogTileDate = styled.div`
	grid-column: 1 / span 1;
	grid-row: 3 / 4;
	font-size: 20px;
`;

const LogTileTime = styled.div`
	grid-column: 2 / span 1;
	grid-row: 3 / 4;
	justify-content: flex-end !important;
	font-weight: bold;
	filter: invert(100%) opacity(.6);
`;

const LogTileControls = styled.div`
	grid-column: 1 / span 2;
	grid-row: 1 / span 3;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(190, 190, 190, .3);
	opacity: 0;
	transition: opacity .2s ease;

	&:hover {
		opacity: 1;
	}
`;

export function LogEntry({
	index,
	title,
	description,
	date,
	time,
	onEdit,
	onDelete,
}) {
	const [lines, setLines] = useState('6');
	const descriptionNode = useRef(null);

	useEffect(() => {
		const { current } = descriptionNode;
		const height = current.offsetHeight;
		const lineHeight = parseInt(
			window
				.getComputedStyle(current, null)
				.getPropertyValue('line-height')
		);
		const _lines = Math.floor(height / lineHeight);
		setLines(''+_lines);
	}, [descriptionNode]);

	return(
		<LogTileContainer>
			<LogTile>
				<LogTileTitle type="content">
					<h3>{title}</h3>
				</LogTileTitle>
				<LogTileDescription type="content" ref={descriptionNode} style={{
					WebkitLineClamp: lines,
				}}>
					{description}
				</LogTileDescription>
				<LogTileDate type="content">{formatDate(new Date(date))}</LogTileDate>
				<LogTileTime type="content">{formatTime(time)}</LogTileTime>
			</LogTile>
			<LogTileControls>
				<Button type="icon" onClick={() => onEdit(index)}>
					<EditIcon />
				</Button>
				<Button type="icon" onClick={() => onDelete(index)}>
					<DeleteIcon />
				</Button>
			</LogTileControls>
		</LogTileContainer>
	);
}

LogEntry.propTypes = {
	index: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	date: PropTypes.string.isRequired,
	time: PropTypes.number.isRequired,
	onEdit: PropTypes.func,
	onDelete: PropTypes.func,
}

LogEntry.defaultProps = {
	description: '',
	onEdit: () => {},
	onDelete: () => {},
}
