import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default function Header({ headerHeight }) {
    return (
        <AppBar position='fixed' style={{ height: headerHeight }}>
            <Toolbar>
                <Typography variant='h6'>Memory Game</Typography>
            </Toolbar>
        </AppBar>
    );
}
