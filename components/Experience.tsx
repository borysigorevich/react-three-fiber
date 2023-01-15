import React, {RefObject, useRef} from 'react';
import {useFrame} from '@react-three/fiber'
import {Group, Mesh, DoubleSide} from "three";
import {TransformControls, PivotControls, Html, Text, Float, MeshReflectorMaterial} from '@react-three/drei'
import {useControls, button} from 'leva'
import {Perf} from 'r3f-perf'
import {CustomObject} from "./CustomObject";

export const Experience = () => {
    const cubeRef = useRef<Mesh | null>(null)
    const groupRef = useRef<Group | null>(null)
    const sphereRef = useRef<Mesh | null>(null)

    useFrame((state, delta, frame) => {
        // if(cubeRef.current) cubeRef.current.rotation.y += delta
        const angle = state.clock.elapsedTime
        // state.camera.position.x = Math.sin(angle) * 8
        // state.camera.position.z = Math.cos(angle) * 8
        // state.camera.lookAt(0, 0, 0)
        // if (groupRef.current) groupRef.current.rotation.y += delta * 0.2
    })

    const {perfVisibility} = useControls({
        perfVisibility: true
    })

    const controls = useControls('name', {
        position: {
            value: {
                x: -2,
                y: 0,
                // z: 0
            },
            min: -4,
            max: 4,
            step: 0.01,
            joystick: 'invertY'
        },
        color: '#57e533',
        visible: true,
        clickMe: button(() => console.log('clicked')),
        choice: {
            options: ['a', 'b', 'c']
        }
    })

    console.log(controls)

    return (
        // <mesh scale={[1.1, 1.1, 1.1]}>
        <>
            {perfVisibility && <Perf position='top-left'/>}
            <directionalLight position={[1, 2, 3]}/>
            <ambientLight intensity={1.2}/>
            <group ref={groupRef}>
                {/*<TransformControls*/}
                {/*    mode='translate'*/}
                {/*    rotation-y={Math.PI * -0.04}*/}
                {/*    rotation-x={Math.PI * 0.03}*/}
                {/*    rotation-z={Math.PI * 0.02}*/}
                {/*    scale={1.5}*/}
                {/*>*/}
                <mesh
                    rotation-y={Math.PI * -0.04}
                    rotation-x={Math.PI * 0.03}
                    rotation-z={Math.PI * 0.02}
                    position={[controls.position.x, controls.position.y, 0]}
                    scale={1.5}
                    ref={cubeRef}
                >
                    {/*<sphereGeometry/>*/}
                    <boxGeometry/>
                    <meshStandardMaterial args={[{color: '#00f'}]}/>
                </mesh>
                {/*</TransformControls>*/}

                <mesh rotation-x={Math.PI * -0.5} position={[0, -2, 0]} scale={10}>
                    {/*<sphereGeometry/>*/}
                    <planeGeometry/>
                    {/*<meshStandardMaterial args={[{color: '#0f0', side: DoubleSide}]}/>*/}
                    <MeshReflectorMaterial
                        side={DoubleSide}
                        resolution={512}
                        // blur={[1000, 1000]}
                        // mixBlur={1}
                        mirror={0.5}
                        color={controls.color}
                    />
                </mesh>


                <PivotControls anchor={[0, 1, 0]}>
                    <Float
                        speed={2}
                        floatIntensity={3}
                    >
                        <mesh position={[4, 0, 0]} scale={1} ref={sphereRef} visible={controls.visible}>
                            <sphereGeometry/>
                            <meshStandardMaterial args={[{color: '#ff0', side: DoubleSide}]}/>
                            <Html
                                // occlude={[cubeRef, sphereRef]}
                                center
                                as='div'
                                position={[1, 1, 0]}
                                wrapperClass='child:text-white child:p-4 child:bg-[#00000088] child:rounded-[30px] child:font-sans whitespace-nowrap select-none'
                                distanceFactor={8}
                            >
                                That's a sphere
                            </Html>
                        </mesh>
                    </Float>
                </PivotControls>

                <Float>
                    <Text
                        fontSize={1}
                        color='salmon'
                        maxWidth={2}
                        textAlign='center'
                    >
                        I Love R3F
                    </Text>
                </Float>

                {/*@ts-ignore*/}
                <TransformControls object={cubeRef} mode='translate'/>
                {/*<CustomObject/>*/}
            </group>
        </>
    );
};