import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {Lesson52} from "../components";
import {OrbitControls} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import React from "react";

export default function App({Component, pageProps}: AppProps) {
    return <main className='h-screen'>
        <Canvas
            flat
            shadows
            dpr={[1, 2]} //default value - device pixel ratio
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [3, 5, 20]
            }}
        >
            <Component {...pageProps} />
            {/*<color args={['#20d0ae']} attach='background'/>*/}
            <OrbitControls makeDefault/>
        </Canvas>
    </main>

}
