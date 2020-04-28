import styled from 'styled-components';

export default styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	padding: inherit;
	overflow: auto;

	&::-webkit-scrollbar,
  &::-webkit-scrollbar-track,
  &::-webkit-scrollbar-thumb {
    width: 5px;
    height: 5px;
    border: none;
    background: transparent;
  }
  
  &::-webkit-scrollbar-button,
  &::-webkit-scrollbar-track-piece,
  &::-webkit-scrollbar-corner,
  &::-webkit-resizer {
    display: none;
  }
  
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #444;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background-color: #222;
  }
  
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: rgba(235, 235, 235, .28);
  }
`;