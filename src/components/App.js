import React, { useState } from 'react';
import Header from './Header';
import ImageGrid from './ImageGrid';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { red, purple } from '@material-ui/core/colors';
import '../styles/styles.css';

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

function App() {
    const [headerHeight, setHeaderHeight] = useState('60px');

    return (
        <ThemeProvider theme={lightTheme}>
            <section id='app'>
                <Header headerHeight={headerHeight} />
                <ImageGrid headerHeight={headerHeight} />
            </section>
        </ThemeProvider>
    );
}

export default App;
