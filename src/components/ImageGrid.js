import React from 'react';
import Instructions from './Instructions';
import { makeStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import GridList from '@material-ui/core/GridList';
import Container from '@material-ui/core/Container';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import tileData from '../data/TileData';

function ImageGrid({ width, headerHeight }) {
    const useStyles = makeStyles((theme) => ({
        imageGrid: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyItems: 'center',
            marginTop: headerHeight + 80,
            marginBottom: '3em',
        },
        gridList: {
            overflow: 'hidden',
        },
        tile: {
            cursor: 'pointer',
            transition: 'all 1s fade-out',
            '&:hover': {
                animation: 'popout .3s ease forwards',
            },
        },
        instructions: {
            display: 'none !important',
        },
        container: {
            display: 'flex',
            position: 'relative',
        },
    }));

    const classes = useStyles();

    const getGridListCols = () => {
        if (isWidthUp('xl', width)) {
            return 4;
        }

        if (isWidthUp('lg', width)) {
            return 3;
        }

        if (isWidthUp('md', width)) {
            return 2;
        }

        return 1;
    };

    return (
        <section id='image-grid' className={classes.imageGrid}>
            <Container maxWidth={width} className={classes.container}>
                <Instructions />
                <GridList cellHeight={250} className={classes.gridList} cols={getGridListCols()}>
                    {tileData.map((tile, index) => (
                        <GridListTile key={tile.img + index} className={classes.tile}>
                            <img src={tile.img} alt={tile.name} />
                            <GridListTileBar title={tile.name} subtitle={<span>From: {tile.game}</span>} />
                        </GridListTile>
                    ))}
                </GridList>
            </Container>
        </section>
    );
}

export default withWidth()(ImageGrid);
