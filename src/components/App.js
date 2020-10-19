import React, { useState, useEffect } from 'react';
import Header from './Header';
import ImageGrid from './ImageGrid';
import { createMuiTheme } from '@material-ui/core/styles';
import { red, purple } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';

import '../styles/styles.css';

function App() {
    const lightTheme = createMuiTheme({
        palette: {
            type: 'light',
            primary: {
                main: purple[700],
                background: '#fff',
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

    const [headerHeight, setHeaderHeight] = useState(60);
    const [currentTheme, setCurrentTheme] = useState(() => {
        return localStorage.getItem('theme') === 'dark' ? darkTheme : lightTheme;
    });

    function toggleTheme() {
        if (currentTheme.palette.type === 'light') {
            setCurrentTheme(darkTheme);
            localStorage.setItem('theme', 'dark');
        } else if (currentTheme.palette.type === 'dark') {
            setCurrentTheme(lightTheme);
            localStorage.setItem('theme', 'light');
        }
    }

    // Set theme background on html element
    useEffect(() => {
        document.documentElement.style.backgroundColor = currentTheme.palette.primary.background;
    }, [currentTheme]);

    return (
        <ThemeProvider theme={currentTheme}>
            <section id='app'>
                <Header
                    headerHeight={headerHeight}
                    currentTheme={currentTheme.palette.type}
                    toggleTheme={toggleTheme}
                />
                <ImageGrid headerHeight={headerHeight} />
            </section>
        </ThemeProvider>
    );
}

export default App;
