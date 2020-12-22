import React, { useEffect } from 'react';
import Instructions from './Instructions';
import { makeStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import GridList from '@material-ui/core/GridList';
import Container from '@material-ui/core/Container';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

function ImageGrid({
    width,
    headerHeight,
    score,
    setScore,
    bestScore,
    setBestScore,
    setIsGameover,
    setPlayerWon,
    setLastClickedTile,
    tiles,
    setTiles,
    alreadyClickedNames,
    setAlreadyClickedNames,
    shuffleArray,
}) {
    const useStyles = makeStyles((theme) => ({
        imageGrid: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyItems: 'center',
            paddingTop: headerHeight + 80,
            marginBottom: '3em',
        },
        gridList: {
            overflow: 'hidden',
        },
        tile: {
            cursor: 'pointer',
            transition: 'all 1s fade-out',
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

    // Check win condition
    useEffect(() => {
        if (alreadyClickedNames.length === tiles.length) {
            setPlayerWon(true);
        }
    }, [tiles, alreadyClickedNames, setPlayerWon]);

    function handleMouseDown(e) {
        const element = e.target.closest('li');
        const selectedCharacterName = element.dataset.name;
        setLastClickedTile(element);

        if (alreadyClickedNames.includes(selectedCharacterName)) {
            if (score > bestScore) {
                setBestScore(score);
            }

            setAlreadyClickedNames([]);
            setIsGameover(true);
        } else {
            setScore((prevScore) => prevScore + 1);
            setAlreadyClickedNames((prevNames) => [...prevNames, selectedCharacterName]);
            setTiles(shuffleArray([...tiles]));
        }
    }

    return (
        <section id='image-grid' className={classes.imageGrid}>
            <Container maxWidth={width} className={classes.container}>
                <Instructions />
                <GridList
                    cellHeight={250}
                    className={classes.gridList}
                    cols={getGridListCols()}
                    onMouseDown={(e) => handleMouseDown(e)}
                >
                    {tiles.map((tile, index) => (
                        <GridListTile key={tile.img} className={classes.tile} data-name={tile.name} data-type='tile'>
                            <img src={tile.img} alt={tile.name} style={{ width: '100%', height: '100%' }} />
                            <GridListTileBar title={tile.name} subtitle={<span>From: {tile.game}</span>} />
                        </GridListTile>
                    ))}
                </GridList>
            </Container>
        </section>
    );
}

export default withWidth()(ImageGrid);
