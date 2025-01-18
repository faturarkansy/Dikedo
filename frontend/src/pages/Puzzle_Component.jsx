import React, { useState } from 'react';

const Puzzle = () => {
    const [pieces, setPieces] = useState([
        { id: 1, locked: false, image: '/images/1.png' },
        { id: 2, locked: true, image: '/images/2.png' },
        { id: 3, locked: true, image: '/images/3.png' },
        { id: 4, locked: true, image: '/images/4.png' },
    ]);

    const handleImageChange = (id, file) => {
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPieces((prevPieces) =>
                prevPieces.map((piece) =>
                    piece.id === id && !piece.locked
                        ? { ...piece, image: imageUrl }
                        : piece
                )
            );
        }
    };

    const openFileDialog = (id) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (event) => {
            const file = event.target.files[0];
            handleImageChange(id, file);
        };
        input.click();
    };

    const getClipPathId = (id) => `clipPath${id}`;

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '70vh',
            }}
        >
            <svg width="0" height="0">
                <defs>
                    <clipPath id="clipPath1">
                        <path d="M0 138C24 138 40 125.834 55.834 150.166C20.668 210.998 130.332 185.498 90.166 143.900C110 119.834 170 150 140 138L140 
                        50 C140 46 172 26 190 48 
                        C240 50 172 80 140 90L140 0 
                        H0V110Z" />
                    </clipPath>
                    <clipPath id="clipPath2">
                        <path d="M0 -3000L56 138C145.4 145 134 130.166 108.834 112.834C110.668 89.502 144.332 89.502 154.166 109.834C130 165.166 181.6 120 380 140V0H108Z" />
                    </clipPath>
                    <clipPath id="clipPath3">
                        <path d="M0 120V270H140V51C80.6 48 87 80.834 90.166 72.166C125.332 100.498 16.668 115.498 55.834 65.166C53 87.834 65 42 0 50Z" />
                    </clipPath>
                    <clipPath id="clipPath4">
                        <path d="M55 53V240H230V30C80.6 90 140 53.166 135.166 43.834C164.332 20.502 105.668 -15 103.834 34.834C138 95.166 56.4 40 88 58Z" />
                    </clipPath>

                </defs>
            </svg>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 140px)',
                    gridTemplateRows: 'repeat(2, 140px)',
                }}
            >
                {pieces.map((piece) => (
                    <div
                        key={piece.id}
                        style={{
                            width: '184px',
                            height: '184px',
                            position: 'relative',
                            backgroundImage: `url(${piece.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            clipPath: `url(#${getClipPathId(piece.id)})`,
                            cursor: piece.locked ? 'not-allowed' : 'pointer',
                            zIndex: piece.id === 1 || piece.id === 4 ? 2 : 1,
                            // filter: 'drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.5))',
                        }}
                        onClick={() => !piece.locked && openFileDialog(piece.id)}
                    >
                        {piece.locked && (
                            <img
                                src="/images/lock.png"
                                alt="Locked"
                                style={{
                                    position: 'absolute',
                                    ...(piece.id === 1
                                        ? {
                                            top: '40%',
                                            left: '40%',

                                        }
                                        : piece.id === 2
                                            ? {
                                                top: '40%',
                                                right: '20%',
                                            }
                                            : piece.id === 3
                                                ? {
                                                    bottom: '23%',
                                                    left: '39%',
                                                } : {
                                                    bottom: '23%',
                                                    right: '20%',
                                                }),
                                    transform: 'translate(-50%, -50%)',
                                    width: '25px',
                                    height: '25px',
                                    zIndex: 1,
                                }}
                            />
                        )}
                        {!piece.locked && (
                            <img
                                src="/images/upload.png"
                                alt="Upload"
                                style={{
                                    position: 'absolute',
                                    ...(piece.id === 1
                                        ? {
                                            top: '42%',
                                            left: '40%',
                                        }
                                        : piece.id === 2
                                            ? {
                                                top: '42%',
                                                right: '15%',
                                            }
                                            : piece.id === 3
                                                ? {
                                                    bottom: '23%',
                                                    left: '39%',
                                                } : { // Default style for other pieces
                                                    bottom: '12%',
                                                    right: '9%',
                                                }),
                                    transform: 'translate(-50%, -50%)',
                                    width: '45px',
                                    height: '45px',
                                    zIndex: 1,
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Puzzle;
