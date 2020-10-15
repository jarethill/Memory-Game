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
            height: `100vh`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyItems: 'center',
        },
        gridList: {
            width: '100%',
            // height: '100%',
            maxWidth: '100%',
            overflowX: 'hidden',
        },
        tile: {
            cursor: 'pointer',
            transition: 'all 1s fade-out',
            '&:hover': {
                animation: 'popout .3s ease forwards',
            },
        },
        container: {
            display: 'flex',
            position: 'relative',
            // width: '100%',
            // height: '100%',
            // maxHeight: '100%',
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
            <Instructions />
            <Container maxWidth={width} className={classes.container}>
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
