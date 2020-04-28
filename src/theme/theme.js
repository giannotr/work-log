import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
	dark: '#373f51',
	light: '#f8fff4',
	primary: '#f49390',
	secondary: '#81f4e1',
	tertiary: '#e43f6f',
}

export default {
	breakpoints: {
		xs: '330px',
		sm: '500px',
		md: '768px',
		lg: '1366px',
	},
	geometry: {
		toolbar: {
			side: {
				width: '4rem',
				height: '100vh',
			},
			bottom: {
				width: '100vw',
				height: '4rem',
			},
		},
	},
	color: {
		background: '#f8fff4',
		text: '#222',
	},
	timing: {
		redirectDelay: 750,
	},
	components: {
		buttonPrimary: {
			background: palette.secondary,
		},
		buttonSecondary: {
			background: palette.tertiary,
			color: palette.light,
		},
		toolbar: {
			background: palette.secondary,
			button: palette.primary,
		},
		header: {
			background: palette.tertiary,
			color: palette.light,
		},
		logEntry: {
			width: '240px',
			background: palette.primary,
			color: palette.light,
		},
	},
}

export const muiTheme = createMuiTheme({
  typography: {
    fontFamily: [
			'"Rokkitt"',
      '-apple-system',
      'BlinkMacSystemFont',
      'serif',
    ].join(','),
	},
	palette: {
    primary: {
      main: palette.primary,
    },
    secondary: {
      main: palette.secondary,
    },
  },
});

export const toggelTheme = () => {
	let metaThemeColor = document.querySelector('meta[name=theme-color]');
	let current = metaThemeColor.getAttribute('content');
  metaThemeColor.setAttribute(
		'content',
		current === palette.light ? palette.dark : palette.dark
	);
}
