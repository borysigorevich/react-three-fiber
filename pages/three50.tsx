import React from 'react';
import {SSR, EffectComposer, Glitch, Noise, Bloom, DepthOfField} from '@react-three/postprocessing'

import {BlendFunction, GlitchMode} from 'postprocessing'

import {Perf} from 'r3f-perf'
import {Vector2} from "three";

import {useControls} from 'leva'

// console.log(BlendFunction)

console.log(GlitchMode)

const Three50 = () => {

    const fn = <T, >(value: T): T => {
        return value
    }

    const ssrProps = useControls({
        temporalResolve: true,
        STRETCH_MISSED_RAYS: true,
        USE_MRT: true,
        USE_NORMALMAP: true,
        USE_ROUGHNESSMAP: true,
        ENABLE_JITTERING: true,
        ENABLE_BLUR: true,
        temporalResolveMix: {value: 0.9, min: 0, max: 1},
        temporalResolveCorrectionMix: {value: 0.25, min: 0, max: 1},
        maxSamples: {value: 0, min: 0, max: 1},
        resolutionScale: {value: 1, min: 0, max: 1},
        blurMix: {value: 0.5, min: 0, max: 1},
        blurKernelSize: {value: 8, min: 0, max: 8},
        blurSharpness: {value: 0.5, min: 0, max: 1},
        rayStep: {value: 0.3, min: 0, max: 1},
        intensity: {value: 1, min: 0, max: 5},
        maxRoughness: {value: 0.1, min: 0, max: 1},
        jitter: {value: 0.7, min: 0, max: 5},
        jitterSpread: {value: 0.45, min: 0, max: 1},
        jitterRough: {value: 0.1, min: 0, max: 1},
        roughnessFadeOut: {value: 1, min: 0, max: 1},
        rayFadeOut: {value: 0, min: 0, max: 1},
        MAX_STEPS: {value: 20, min: 0, max: 20},
        NUM_BINARY_SEARCH_STEPS: {value: 5, min: 0, max: 10},
        maxDepthDifference: {value: 3, min: 0, max: 10},
        maxDepth: {value: 1, min: 0, max: 1},
        thickness: {value: 10, min: 0, max: 10},
        ior: {value: 1.45, min: 0, max: 2}
    })

    return (
        <>
            <EffectComposer multisampling={0}>
                {/*<Vignette*/}
                {/*    offset={0.3}*/}
                {/*    darkness={0.9}*/}
                {/*    blendFunction={BlendFunction.DARKEN}*/}
                {/*/>*/}

                {/*<Glitch*/}
                {/*    mode={GlitchMode.CONSTANT_MILD}*/}
                {/*    // delay={new Vector2(0.5, 1)}*/}
                {/*    // duration={new Vector2(0.1, 0.5)}*/}
                {/*    strength={new Vector2(0.2, 0.4)}*/}
                {/*/>*/}

                {/*<Bloom*/}
                {/*    mipmapBlur*/}
                {/*    intensity={0.5}*/}
                {/*    // luminanceThreshold={0}*/}
                {/*/>*/}

                {/*<Noise*/}
                {/*    premultiply*/}
                {/*    blendFunction={BlendFunction.COLOR_DODGE}*/}
                {/*/>*/}

                {/*<DepthOfField*/}
                {/*    focusDistance={0.025}*/}
                {/*    focalLength={0.025}*/}
                {/*    bokehScale={6}*/}
                {/*/>*/}

                {/*<SSR*/}
                {/*    {...ssrProps}*/}
                {/*/>*/}
            </EffectComposer>

            <Perf position='top-left'/>

            <directionalLight position={[0, 2, 2]}/>
            <ambientLight intensity={0.5}/>

            <mesh position={[1, 0, 0]}>
                <boxGeometry/>
                {/*<meshStandardMaterial color={[2, 1, 5]} />*/}
                {/*<meshStandardMaterial color='#fff' emissive='orange' emissiveIntensity={4}/>*/}
                <meshBasicMaterial color={[2, 2, 5]}/>
            </mesh>

            <mesh position={[-1, 0, 0]}>
                <sphereGeometry/>
                <meshStandardMaterial color={'#f0f'} toneMapped={false}/>
            </mesh>

            <mesh rotation-x={Math.PI * -0.5} scale={10} position-y={-1}>
                <planeGeometry/>
                <meshStandardMaterial color={'#00f'} metalness={0} roughness={0}/>
            </mesh>

            {/*<color args={['#20d0ae']} attach='background'/>*/}
            <color args={['#000']} attach='background'/>
        </>
    );
};

export default Three50;