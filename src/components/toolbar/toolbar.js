import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../../theme/theme';

const ToolbarContainer = styled.nav`
	position: fixed;
  left: 0;
  margin: 0;
  padding: 0;
	background-color: ${theme.components.toolbar.background};
	z-index: 999;
	transition: width .2s ease;
	
	@media only screen and (max-width: ${theme.breakpoints.sm}) {
		bottom: 0;
		width: ${theme.geometry.toolbar.bottom.width};
		height: ${theme.geometry.toolbar.bottom.height};

		ul {
			flex-direction: row;
		}

		button {
			justify-content: center;
			width: auto;
		}
	}
	
	@media only screen and (min-width: ${theme.breakpoints.sm}) {
		top: 0;
		width: ${theme.geometry.toolbar.side.width};
		height: ${theme.geometry.toolbar.side.height};

		&:hover {
			width: calc(4 * ${theme.geometry.toolbar.side.width});

			div {
				display: block;
			}
		}
	}
`;

const ToolbarList = styled.ul`
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: center;
	list-style: none;
	margin: 0;
	padding: 0;
`;

const ToolbarLI = styled.li`
	width: 100%
`;

const ToolbarButton = styled.button`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
	height: ${theme.geometry.toolbar.side.width};
	background: transparent;
	outline: none;
	border: none;
	cursor: pointer;
	filter: grayscale(100%) opacity(.5);
	transition: .4s;

	&:hover {
		filter: grayscale(0%) opacity(1);
		background: ${theme.components.toolbar.button}
	}
`;

const ToolbarIcon = styled.span`
	margin: 0 calc(${theme.geometry.toolbar.side.width} / 3);
`;

const ToolbarText = styled.div`
	display: none;
`;

export const Toolbar = ({ children }) => (
  <ToolbarContainer>
    <ToolbarList>{children}</ToolbarList>
  </ToolbarContainer>
);

Toolbar.propTypes = {
	children: PropTypes.node,
}

export const ToolbarItem = ({ id, label, onClick, children }) => (
  <ToolbarLI id={id}>
    <ToolbarButton onClick={onClick}>
      <ToolbarIcon>{children}</ToolbarIcon>
      <ToolbarText>{label}</ToolbarText>
    </ToolbarButton>
  </ToolbarLI>
);

ToolbarItem.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	onClick: PropTypes.func,
	children: PropTypes.node,
}

ToolbarItem.defaultProps = {
	label: '',
	onClick: () => {},
}
