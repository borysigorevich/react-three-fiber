import React, {useRef, useEffect, useState} from 'react';

import {useKeyboardControls, Grid, useGLTF} from '@react-three/drei'
import {useThree, useFrame,} from '@react-three/fiber'
import {Physics, RigidBody, Debug, CuboidCollider, RigidBodyApi, CylinderCollider} from '@react-three/rapier'
import {Perf} from 'r3f-perf'
import {Mesh, Euler, Quaternion, Vector3} from "three";
import {Controls} from "./_app";

const Three52 = () => {

    const [hitAudio] = useState(() => new Audio('/hit.mp3'))
    const hamburger = useGLTF('/hamburger.glb')
    console.log(hitAudio)

    const cube = useRef<RigidBodyApi | null>(null)
    const twister = useRef<RigidBodyApi | null>(null)
    const twisterRef = useRef<Mesh | null>(null)
    const cubeRef = useRef<Mesh | null>(null)

    const cubeJump = () => {
        cube.current?.applyImpulse({x: 1, y: 5, z: 0})
        cube.current?.applyTorqueImpulse({x: 0, y: 1, z: 0})
    }

    // const {camera} = useThree()
    const target = new Vector3(0, 0, 0)
    const vec = new Vector3()

    const forwardPressed = useKeyboardControls<Controls>(state => state.forward)
    const backPressed = useKeyboardControls<Controls>(state => state.back)
    const leftPressed = useKeyboardControls<Controls>(state => state.left)
    const rightPressed = useKeyboardControls<Controls>(state => state.right)
    const jumpPressed = useKeyboardControls<Controls>(state => state.jump)
    // console.log({forwardPressed, backPressed, leftPressed, rightPressed, jumpPressed})

    useFrame((state, delta) => {
        // console.log(cubeRef.current?.getWorldDirection())
        // cubeRef.current && camera.lookAt(cubeRef.current?.position)
        // camera.position.set(cubeRef.current?.position.x! + 2 , cubeRef.current?.position.y! + 15, cubeRef.current?.position.z! + 40)
        if (forwardPressed) {
            cube.current?.applyImpulse({x: 0, y: 0, z: -0.1})
            // if(cubeRef.current) cubeRef.current.position.z -= 0.1
        }
        if (backPressed) {
            cube.current?.applyImpulse({x: 0, y: 0, z: 0.1})
            // if(cubeRef.current) cubeRef.current.position.z += 0.1
        }
        if (leftPressed) {
            cube.current?.applyImpulse({x: -0.1, y: 0, z: 0})
            // if(cubeRef.current) cubeRef.current.position.x -= 0.1
        }
        if (rightPressed) {
            cube.current?.applyImpulse({x: 0.1, y: 0, z: 0})
            // if(cubeRef.current) cubeRef.current.position.x += 0.1
        }
        if (jumpPressed) {
            cube.current?.applyImpulse({x: 0, y: 0.1, z: 0})
            // if(cubeRef.current) cubeRef.current.position.y += 0.1
        }

        // target.lerp(cubeRef.current?.getWorldPosition(vec)!, 0.02)
        // state.camera.lookAt(target)
        // console.log(cubeRef.current?.position)

        const elapsedTime = state.clock.elapsedTime
        const eulerRotation = new Euler(0, elapsedTime, 0)
        const quaternionRotation = new Quaternion()
        quaternionRotation.setFromEuler(eulerRotation)
        twister.current?.setNextKinematicRotation(quaternionRotation)

        const angle = elapsedTime * 0.5
        const x = Math.cos(angle) * 2
        const z = Math.sin(angle) * 2
        twister.current?.setNextKinematicTranslation({x, y: -1.1, z})

        // console.log(twisterRef.current?.position)
    })

    console.log(cubeRef.current?.getWorldPosition(vec)!)

    const moveCube = (event: KeyboardEvent) => {
        // switch (event.key) {
        //     case 'ArrowUp': {
        //         cube.current?.applyImpulse({x: 0, y: 0, z: -1})
        //         break;
        //     }
        //     case 'ArrowDown': {
        //         cube.current?.applyImpulse({x: 0, y: 0, z: 1})
        //         break;
        //     }
        //     case 'ArrowLeft': {
        //         cube.current?.applyImpulse({x: -1, y: 0, z: 0})
        //         break;
        //     }
        //     case 'ArrowRight': {
        //         cube.current?.applyImpulse({x: 1, y: 0, z: 0})
        //         break;
        //     }
        //     case ' ': {
        //         cube.current?.applyImpulse({x: 0, y: 1, z: 0})
        //         break;
        //     }
        //     default:
        //         break;
        // }
    }

    // useEffect(() => {
    //     window.addEventListener('keydown', moveCube)
    //     window.addEventListener('keypress', moveCube)
    //
    //     return () => {
    //         window.removeEventListener('keydown', moveCube)
    //         window.removeEventListener('keypress', moveCube)
    //     }
    // }, [])

    return (
        <>

            <Perf
                position='top-left'
            />

            <directionalLight
                castShadow
                position={[1, 2, 3,]}
                intensity={1.5}
                shadow-mapSize={[1024, 1024]}
            />
            <ambientLight intensity={0.5}/>

            <Physics gravity={[0, -9.81, 0]}>

                {/*<Debug/>*/}

                {/*<mesh castShadow>*/}
                {/*    <boxGeometry/>*/}
                {/*    <meshStandardMaterial color='mediumpurple'/>*/}
                {/*</mesh>*/}
                {/*<Grid position={[0, -1, 0]}/>*/}

                <RigidBody
                    ref={cube}
                    restitution={1}
                    colliders={false}
                    // friction={0}
                    onSleep={() => {
                        console.log('sleep')
                    }}
                >
                    <mesh castShadow onClick={cubeJump} ref={cubeRef}>
                        <boxGeometry/>
                        <meshStandardMaterial color='mediumpurple'/>
                    </mesh>
                    <CuboidCollider mass={1} args={[.5, .5, 0.5]}/>
                </RigidBody>


                <RigidBody
                    onCollisionEnter={(event) => {
                        console.log(event)
                        hitAudio.play()
                    }}
                    // restitution={1}
                    // friction={0}
                    // colliders='trimesh'
                    ref={twister}
                    position={[3, -1.1, 2]}
                    type='kinematicPosition'
                >
                    <mesh
                        ref={twisterRef}
                        castShadow
                        scale={[0.4, 0.4, 10]}
                    >
                        <boxGeometry/>
                        <meshStandardMaterial color='red'/>
                    </mesh>
                    {/*<CuboidCollider mass={0.5} args={[.5, .5, 0.5]}/>*/}
                </RigidBody>

                <RigidBody
                    colliders='ball'
                    // gravityScale={0.2}
                    position={[0, 3, 0]}
                    restitution={1}
                >
                    <mesh castShadow position-x={-3} position-y={3}>
                        <sphereGeometry/>
                        <meshStandardMaterial color='orange'/>
                    </mesh>
                </RigidBody>


                {/*<RigidBody colliders={false} position-x={-3} rotation-x={Math.PI * -0.5}>*/}
                {/*    <CuboidCollider args={[1, 1, 1]}/>*/}
                {/*    <mesh castShadow>*/}
                {/*        <torusGeometry args={[1, 0.5, 16, 32]}/>*/}
                {/*        <meshStandardMaterial color='teal'/>*/}
                {/*    </mesh>*/}
                {/*</RigidBody>*/}

                {/*<RigidBody colliders='trimesh'>*/}
                {/*    <mesh position-x={-3} rotation-x={Math.PI * -0.5} castShadow>*/}
                {/*        <torusGeometry args={[1, 0.5, 16, 32]}/>*/}
                {/*        <meshStandardMaterial color='teal'/>*/}
                {/*    </mesh>*/}
                {/*</RigidBody>*/}


                <RigidBody type='fixed' friction={0}>
                    <mesh receiveShadow position-y={-1.5}>
                        <boxGeometry args={[20, 0.5, 20]}/>
                        <meshStandardMaterial color='#1BD387'/>
                    </mesh>

                    <mesh receiveShadow position={[0, .75, 10]} rotation-x={Math.PI * -0.5}>
                        <boxGeometry args={[20.5, 0.5, 5]}/>
                        <meshStandardMaterial color='#1BD387'/>
                    </mesh>

                    <mesh receiveShadow position={[0, .75, -10]} rotation-x={Math.PI * -0.5}>
                        <boxGeometry args={[20.5, 0.5, 5]}/>
                        <meshStandardMaterial color='#1BD387'/>
                    </mesh>

                    <mesh receiveShadow position={[-10, .75, 0]} rotation-x={Math.PI * -0.5} rotation-z={Math.PI * -0.5}>
                        <boxGeometry args={[20, 0.5, 5]}/>
                        <meshStandardMaterial color='#1BD387'/>
                    </mesh>

                    <mesh receiveShadow position={[10, .75, 0]} rotation-x={Math.PI * -0.5} rotation-z={Math.PI * -0.5}>
                        <boxGeometry args={[20, 0.5, 5]}/>
                        <meshStandardMaterial color='#1BD387'/>
                    </mesh>
                </RigidBody>


                <RigidBody position={[4, 4, 0]}>
                    <primitive object={hamburger.scene} scale={0.25}/>
                    {/*<CylinderCollider args={[0.5, 1.25]}/>*/}
                </RigidBody>

                {/*<RigidBody*/}
                {/*    colliders={false}*/}

                {/*    // position={[0, 4, 5]}*/}
                {/*>*/}
                {/*    <primitive object={hamburger.scene} scale={0.25}/>*/}
                {/*    <CylinderCollider args={[0.5, 1.25]}/>*/}
                {/*</RigidBody>*/}

            </Physics>

            {/*<color args={['#1bd387']}/>*/}
        </>
    );
};

export default Three52;