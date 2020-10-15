import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createMuiTheme } from '@material-ui/core/styles';
import { red, purple } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';

const lightTheme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            main: purple[700],
            background: 'white',
        },
    },
});

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: red[700],
            background: '#1d1d1d',
        },
    },
});

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={darkTheme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
