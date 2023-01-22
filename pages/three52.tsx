import React, {useRef, useEffect, useState, useMemo} from 'react';

import {useKeyboardControls, Grid, useGLTF} from '@react-three/drei'
import {useThree, useFrame, extend} from '@react-three/fiber'
import {
    Physics,
    RigidBody,
    Debug,
    CuboidCollider,
    RigidBodyApi,
    CylinderCollider,
    InstancedRigidBodies,
    Vector3Array,
} from '@react-three/rapier'
import {Perf} from 'r3f-perf'
import {Mesh, Euler, Quaternion, Vector3, InstancedMesh, Matrix4} from "three";
import {Controls} from "./_app";

// const instancedMesh = new InstancedMesh(undefined, undefined, 100)
//
// extend({InstancedMesh: instancedMesh})

const Three52 = () => {

    const [hitAudio] = useState(() => new Audio('/hit.mp3'))
    const hamburger = useGLTF('/hamburger.glb')
    console.log(hitAudio)

    const cube = useRef<RigidBodyApi | null>(null)
    const twister = useRef<RigidBodyApi | null>(null)
    const twisterRef = useRef<Mesh | null>(null)
    const cubeRef = useRef<Mesh | null>(null)
    const cubes = useRef<InstancedMesh | null>(null)

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
        const eulerRotation = new Euler(0, elapsedTime * 3, 0)
        const quaternionRotation = new Quaternion()
        quaternionRotation.setFromEuler(eulerRotation)
        twister.current?.setNextKinematicRotation(quaternionRotation)

        const angle = elapsedTime * 0.5
        const x = Math.cos(angle) * 5
        const z = Math.sin(angle) * 5
        twister.current?.setNextKinematicTranslation({x, y: -1.1, z})

        // console.log(twisterRef.current?.position)
    })

    console.log(cubeRef.current?.getWorldPosition(vec)!)

    const cubesCount = 300

    useEffect(() => {
        for (let i = 0; i < cubesCount; i++) {
            const matrix4 = new Matrix4()
            matrix4.compose(
                new Vector3(i * 2, 0, 0),
                new Quaternion(),
                new Vector3(1, 1, 1)
            )
            cubes.current?.setMatrixAt(i, matrix4)
        }
    }, [])

    const cubeTransforms = useMemo(() => {
        const positions: Vector3Array[] = []
        const rotations: Vector3Array[] = []
        const scales: Vector3Array[] = []

        for (let i = 0; i < cubesCount; i++) {
            positions.push([(Math.random() - 0.5) * 10, i + 5, (Math.random() - 0.5) * 10])
            rotations.push([0, 0, 0])
            scales.push([1, 1, 1])
        }

        return {
            positions,
            rotations,
            scales,
        }
    }, [])

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
                        <boxGeometry args={[30, 0.5, 30]}/>
                        <meshStandardMaterial color='#1BD387'/>
                    </mesh>

                    <mesh receiveShadow position={[0, .75, 15]} rotation-x={Math.PI * -0.5}>
                        <boxGeometry args={[30.5, 0.5, 5]}/>
                        <meshStandardMaterial color='#1BD387'/>
                    </mesh>

                    <mesh receiveShadow position={[0, .75, -15]} rotation-x={Math.PI * -0.5}>
                        <boxGeometry args={[30.5, 0.5, 5]}/>
                        <meshStandardMaterial color='#1BD387'/>
                    </mesh>

                    <mesh receiveShadow position={[-15, .75, 0]} rotation-x={Math.PI * -0.5}
                          rotation-z={Math.PI * -0.5}>
                        <boxGeometry args={[30, 0.5, 5]}/>
                        <meshStandardMaterial color='#1BD387'/>
                    </mesh>

                    <mesh receiveShadow position={[15, .75, 0]} rotation-x={Math.PI * -0.5} rotation-z={Math.PI * -0.5}>
                        <boxGeometry args={[30, 0.5, 5]}/>
                        <meshStandardMaterial color='#1BD387'/>
                    </mesh>
                </RigidBody>

                {/*<instansedMesh args={[null, null, cubesCount]} ref={cubes}>*/}
                {/*    <boxGeometry/>*/}
                {/*    <meshStandardMaterial/>*/}
                {/*</instansedMesh>*/}

                <InstancedRigidBodies

                    positions={ cubeTransforms.positions }
                    rotations={ cubeTransforms.rotations }
                    scales={ cubeTransforms.scales }
                >
                    <instancedMesh ref={cubes} castShadow receiveShadow args={[undefined, undefined, cubesCount]}>
                        <boxGeometry/>
                        <meshStandardMaterial color="tomato"/>
                    </instancedMesh>
                </InstancedRigidBodies>


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