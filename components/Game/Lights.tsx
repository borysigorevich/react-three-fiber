import React from 'react';

export const Lights = () => {
    return (
        <>
            <directionalLight
                shadow-mapSize={[1024, 1024]}
                position={[4, 4, 1]}
                castShadow
                intensity={1.5}
                shadow-camera-near={1}
                shadow-camera-far={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
                shadow-camera-right={10}
                shadow-camera-left={-10}
            />
            <ambientLight
                intensity={0.5}
            />
        </>
    );
};