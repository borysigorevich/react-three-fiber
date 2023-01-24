import React, {useRef} from 'react';

import {useFrame} from '@react-three/fiber'
import {DirectionalLight} from "three";

export const Lights = () => {

    const lightRef = useRef<DirectionalLight | null>(null)

    useFrame((state) => {
        lightRef.current!.position.z = state.camera.position.z - 3
        lightRef.current!.target.position.z = state.camera.position.z - 4
        lightRef.current?.target.updateMatrixWorld()
    })

    return (
        <>
            <directionalLight
                ref={lightRef}
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