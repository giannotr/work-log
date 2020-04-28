import React from 'react';
import styled from 'styled-components';
import theme from '../../theme/theme';

const ButtonBase = styled.button`
	min-width: 150px;
	max-width: 250px;
	min-height: 50px;
	margin: 10px;
	border: none;
	outline: none;
	cursor: pointer;
	transition: filter .4s ease;

	* {
		vertical-align: middle;
	}

	&:hover {
		filter: hue-rotate(135deg);
	}

	svg {
		margin: 0 4px;
	}
`;

const ButtonPrimary = styled(ButtonBase)`
	background: ${theme.components.buttonPrimary.background};
`;

const ButtonSecondary = styled(ButtonBase)`
	background: ${theme.components.buttonSecondary.background};
	color: ${theme.components.buttonSecondary.color};
`;

const ButtonIcon = styled(ButtonBase)`
	min-width: 40px;
	max-width: 40px;
	min-height: 40px;
	max-height: 40px;
	background: rgba(100, 100, 100, .5);
	border-radius: 50%;
	transition: background .25s ease;

	svg {
		pointer-events: none;
	}

	&:hover {
		background: rgba(140, 140, 140, .8);
	}
`;

export default function Button({ type, onClick, children }) {
	switch(type) {
		case 'primary': return <ButtonPrimary onClick={onClick}>{children}</ButtonPrimary>;
		case 'secondary': return <ButtonSecondary onClick={onClick}>{children}</ButtonSecondary>;
		case 'icon': return <ButtonIcon onClick={onClick}>{children}</ButtonIcon>;
		default: return <ButtonPrimary onClick={onClick}>{children}</ButtonPrimary>;
	}
}
