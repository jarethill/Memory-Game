import React, { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Header from './Header';
import ImageGrid from './ImageGrid';
import GameoverModal from './GameoverModal';
import { createMuiTheme } from '@material-ui/core/styles';
import { red, purple } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import tileData from '../data/TileData';

import '../styles/styles.css';

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

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
    const [themeName, setThemeName] = useLocalStorage('theme', 'light');
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [isGameover, setIsGameover] = useState(false);
    const [playerWon, setPlayerWon] = useState(false);
    const [lastClickedTile, setLastClickedTile] = useState(null);

    const [tiles, setTiles] = useState(shuffleArray([...tileData]))
    const [alreadyClickedNames, setAlreadyClickedNames] = useState([]);

    const [currentTheme, setCurrentTheme] = useState(() => {
        return themeName === 'dark' ? darkTheme : lightTheme;
    });

    function toggleTheme(themeName) {
        if (themeName === 'light') {
            setThemeName('dark');
            setCurrentTheme(darkTheme);
        } else if (themeName === 'dark') {
            setThemeName('light');
            setCurrentTheme(lightTheme);
        }
    }

    function resetGame() {
        setScore(0);
        setIsGameover(false);
        setPlayerWon(false);
        setLastClickedTile(null);
        setAlreadyClickedNames([]);
        setTiles(shuffleArray([...tiles]));
    }

    // Set theme background on html element
    useEffect(() => {
        document.documentElement.style.backgroundColor = currentTheme.palette.primary.background;
    }, [currentTheme]);

    useEffect(() => {
        if (playerWon) {
            setIsGameover(true);
        }
    }, [lastClickedTile, playerWon])

    return (
        <ThemeProvider theme={currentTheme}>
            <section id='app'>
                {isGameover && <GameoverModal playerWon={playerWon} resetGame={resetGame}/>}
                
                <Header
                    headerHeight={headerHeight}
                    currentTheme={currentTheme.palette.type}
                    toggleTheme={toggleTheme}
                    score={score}
                    bestScore={bestScore}
                    resetGame={resetGame}
                    
                />

                <ImageGrid 
                    headerHeight={headerHeight} 
                    tiles={tiles}
                    setTiles={setTiles}
                    alreadyClickedNames={alreadyClickedNames}
                    setAlreadyClickedNames={setAlreadyClickedNames}
                    setScore={setScore}
                    bestScore={bestScore} 
                    setBestScore={setBestScore} 
                    score={score} 
                    setIsGameover={setIsGameover}
                    setPlayerWon={setPlayerWon}
                    setLastClickedTile={setLastClickedTile}
                    shuffleArray={shuffleArray}
                />
            </section>
        </ThemeProvider>
    );
}

export default App;
