import React, {useRef} from 'react';

import {useGLTF, meshBounds} from '@react-three/drei'
import {ThreeEvent, useFrame} from '@react-three/fiber'
import {Mesh, DoubleSide} from 'three'


const Three49 = () => {
    const cube = useRef<Mesh | null>(null)

    const burger = useGLTF('/hamburger.glb')

    useFrame((state, delta) => {
        if (cube) cube.current!.rotation.y += delta * 0.6
    })

    const eventHandler = (event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation()
        // @ts-ignore
        cube.current?.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`)
        // cube.current?.material.color.set('#000')
    }

    const binary = (arr: number[], target: number): number => {

        let left = 0
        let right = arr.length - 1

        while (left <= right) {
            const mid = Math.floor((left + right) / 2)
            if (arr[mid] === target) return mid
            else if(arr[mid] < target) left = mid + 1
            else right = mid - 1
        }

        return -1
    }

    // console.log(binary([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10))



    return (
        <>
            <directionalLight position={[0, 2, 2]}/>
            <ambientLight intensity={0.3}/>

            <color args={['#2eaf91']} attach='background'/>

            <mesh
                position-x={-2}
                raycast={meshBounds}
                ref={cube}
                onClick={eventHandler}
                onPointerEnter={() => document.body.style.cursor = 'pointer'}
                onPointerLeave={() => document.body.style.cursor = 'default'}
            >
                <boxGeometry/>
                <meshStandardMaterial color='#f0f'/>
            </mesh>

            <mesh
                position-x={2}
                onClick={event => event.stopPropagation()}
                // onContextMenu={} right button click
                // onDoubleClick={}
                // onPointerUp={}
                // onPointerDown={}
                // onPointerOver={() => console.log('over')}
                // onPointerEnter={() => console.log('enter')}
                // onPointerLeave={() => console.log('enter')}
                // onPointerOut={() => console.log('enter')}
                // onPointerMove={() => } on every mouse/pointer move
                // onPointerMissed={() => } when the user clicked outside of the object
            >
                <sphereGeometry/>
                <meshStandardMaterial color='#0ff'/>
            </mesh>

            <primitive
                position={[0, 2, 0]}
                object={burger.scene}
                scale={0.3}
                onClick={(event: ThreeEvent<MouseEvent>) => {
                    event.stopPropagation()
                    console.log(event)
                    console.log('burger')
                }}
            />

            <mesh rotation-x={Math.PI * -0.5} position-y={-1} scale={10} onClick={event => event.stopPropagation()}>
                <planeGeometry/>
                <meshStandardMaterial color='#2EAF30' side={DoubleSide}/>
            </mesh>
        </>
    );
};

export default Three49;