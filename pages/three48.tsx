import React, {useRef} from 'react';

import {shaderMaterial, useGLTF, useTexture, Center, Sparkles} from '@react-three/drei'
import {extend, useFrame} from '@react-three/fiber'
import {Color} from 'three'

import {Perf} from 'r3f-perf'

import vertexShader from '../shaders/portal/vertex'
import fragmentShader from '../shaders/portal/fragment'

const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new Color('#fff'),
        uColorEnd: new Color('#000')
    },
    vertexShader,
    fragmentShader
)

extend({PortalMaterial})

const Three48 = () => {

    const portalShaderRef = useRef()

    const {nodes} = useGLTF('/model/portal.glb')
    const bakedTexture = useTexture('/model/baked.jpg')
    // bakedTexture.flipY = false

    useFrame((state, delta) => {

        // @ts-ignore
        portalShaderRef.current!.uTime += delta

    })

    console.log(portalShaderRef)

    return (
        <>
            <Perf position='top-left'/>

            <color args={['#201919']} attach='background'/>

            <Center>
                <mesh
                    /*@ts-ignore*/
                    geometry={nodes.baked.geometry}
                >
                    <meshBasicMaterial map={bakedTexture} map-flipY={false}/>
                </mesh>

                <mesh
                    /*@ts-ignore*/
                    geometry={nodes.poleLightA.geometry}
                    position={nodes.poleLightA.position}
                >
                    <meshBasicMaterial color='#ffffe5'/>
                </mesh>

                <mesh
                    /*@ts-ignore*/
                    geometry={nodes.poleLightB.geometry}
                    position={nodes.poleLightB.position}
                >
                    <meshBasicMaterial color='#ffffe5'/>
                </mesh>

                <mesh
                    /*@ts-ignore*/
                    geometry={nodes.portalLight.geometry}
                    position={nodes.portalLight.position}
                    rotation={nodes.portalLight.rotation}
                >
                    {/*<shaderMaterial*/}
                    {/*    vertexShader={vertexShader}*/}
                    {/*    fragmentShader={fragmentShader}*/}
                    {/*    uniforms={{*/}
                    {/*        uTime: {value: 0},*/}
                    {/*        uColorStart: {value: new Color('#fff')},*/}
                    {/*        uColorEnd: {value: new Color('#000')}*/}
                    {/*    }}*/}
                    {/*/>*/}

                    {/*@ts-ignore*/}
                    <portalMaterial ref={portalShaderRef}/>
                </mesh>

                <Sparkles
                    size={6}
                    scale={[4, 2, 4]}
                    position={[0, 1, 0]}
                    speed={0.5}
                    count={70}
                />
            </Center>

        </>
    );
};

export default Three48;