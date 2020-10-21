import React, { useEffect, useRef } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const modalBackdropStyles = {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    background: 'rgba(0, 0, 0, .9)',
    zIndex: '999'
}

const modalStyles = {
    width: '90%',
    maxWidth: '600px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
}

function animateText(element, text, delayInMs) {
    const originalDelay = delayInMs;
    element.textContent = '';

    for (let i = 0; i < text.length; i++) {
        setTimeout(() => {
            element.textContent += text[i];
        }, delayInMs)

        delayInMs += originalDelay;
    }
}

export default function GameoverModal({ playerWon, resetGame }) {
    const gameoverElement = useRef(null);
    const playAgainButton = useRef(null);

    useEffect(() => {
        // Disable scrolling while modal is rendered & animate gameover text
        document.body.style.overflow = 'hidden';

        // Remove data-type tile from all tiles. Needed to prevent hover effect from occuring after gameover
        const allTiles = document.querySelectorAll('li[data-type]');
        allTiles.forEach(tile => tile.dataset.type = '');

        const animatedText = playerWon ? 'You win!' : 'Gameover!';
        const delay = 125;

        if (!gameoverElement.current.textContent) {
            animateText(gameoverElement.current, animatedText, delay);

            setTimeout(() => {
                if (playAgainButton.current) {
                    playAgainButton.current.style.opacity = 1;
                    playAgainButton.current.style.pointerEvents = 'auto';
                }
            }, delay * animatedText.length);
        }

        return () => {
            document.body.style.overflow = '';
            allTiles.forEach(tile => tile.dataset.type = 'tile');
        }
    })


    return (
        <div className="modal-backdrop" style={modalBackdropStyles}>
            <div className="modal" style={modalStyles}>
                <Typography variant='h2' ref={gameoverElement} style={{ color: 'white', textAlign: 'center', userSelect: 'none' }}></Typography>
                <Button ref={playAgainButton}
                    color='primary'
                    size='large'
                    style={{ margin: '2em auto 0 auto', display: 'block', opacity: '0', pointerEvents: 'none', transition: 'all 1s ease' }}
                    onMouseDown={() => resetGame()}>
                    Play again?
                </Button>
            </div>
        </div>
    )
}
