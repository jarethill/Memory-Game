import React, { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Header from './Header';
import ImageGrid from './ImageGrid';

import '../styles/styles.css';

function App() {
    const [headerHeight, setHeaderHeight] = useState('60px');
    const theme = useTheme();

    return (
        <section id='app' style={{ backgroundColor: theme.palette.primary.background }}>
            <Header headerHeight={headerHeight} />
            <ImageGrid headerHeight={headerHeight} />
        </section>
    );
}

export default App;
