import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {KeyboardControlsEntry, OrbitControls, KeyboardControls} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import React, {useMemo} from "react";

export enum Controls {
    forward = 'forward',
    back = 'back',
    left = 'left',
    right = 'right',
    jump = 'jump',
}

export default function App({Component, pageProps}: AppProps) {

    const map = useMemo<KeyboardControlsEntry<Controls>[]>(() => [
        {name: Controls.forward, keys: ['ArrowUp', 'w', 'W']},
        {name: Controls.back, keys: ['ArrowDown', 's', 'S']},
        {name: Controls.left, keys: ['ArrowLeft', 'a', 'A']},
        {name: Controls.right, keys: ['ArrowRight', 'd', 'D']},
        {name: Controls.jump, keys: ['Space']},
    ], [])

    return <main className='h-screen'>
        <Canvas
            flat
            shadows
            dpr={[1, 2]} //default value - device pixel ratio
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [13, 25, 20]
            }}
        >
            <KeyboardControls
                map={map}
            >
                <Component {...pageProps} />
            </KeyboardControls>
            {/*<color args={['#20d0ae']} attach='background'/>*/}
            <OrbitControls makeDefault/>
        </Canvas>
    </main>

}
