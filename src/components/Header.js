import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import RefreshIcon from '@material-ui/icons/Refresh';

const rightSideContainerStyles = {
    marginLeft: 'auto',
    display: 'flex',
};

const pointerStyle = {
    cursor: 'pointer',
};

const flexCenter = {
    display: 'flex',
    alignItems: 'center',
};

export default function Header({ headerHeight, currentTheme, toggleTheme, score, bestScore, resetGame }) {
    return (
        <AppBar position='fixed' style={{ height: `${headerHeight}px` }}>
            <Toolbar>
                <Typography
                    variant='h6'
                    style={{ cursor: 'pointer' }}
                    onMouseDown={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    Memory Game
                </Typography>
                <div id='right-side-container' style={rightSideContainerStyles}>
                    <div id='options' style={flexCenter}>
                        {currentTheme === 'light' ? (
                            <Brightness2Icon style={pointerStyle} onMouseDown={() => toggleTheme(currentTheme)} />
                        ) : (
                            <Brightness5Icon style={pointerStyle} onMouseDown={() => toggleTheme(currentTheme)} />
                        )}

                        <RefreshIcon style={pointerStyle} onMouseDown={() => resetGame()} />
                    </div>

                    <div id='score' style={{ ...flexCenter, flexDirection: 'column', marginLeft: '1em' }}>
                        <Typography style={{ fontSize: '1rem' }}>Score: {score}</Typography>
                        <Typography style={{ fontSize: '.7rem', alignSelf: 'flex-end' }}>Best: {bestScore}</Typography>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    );
}
