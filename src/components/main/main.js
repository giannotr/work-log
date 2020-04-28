import styled from 'styled-components';
import theme from '../../theme/theme';

export default styled.main`
	position: relative;
	width: 100vw;
	height: 100vh;
	padding: 0 0 0 ${theme.geometry.toolbar.side.width};
	overflow: hidden;
	background: ${theme.color.background};
	
	@media only screen and (max-width: ${theme.breakpoints.sm}) {
		padding: ${theme.geometry.toolbar.bottom.height} 0;
	}
`;
