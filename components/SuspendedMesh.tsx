import React from 'react';

export const SuspendedMesh = () => {
    console.log('suspended')
    return (
        <mesh position-y={0.5} scale={[2, 3, 2]}>
            <boxGeometry args={[1, 1, 1, 2, 2, 2]}/>
            <meshBasicMaterial color='#f00' wireframe/>
        </mesh>
    );
};