import React, {useRef} from 'react';
import {DirectionalLight, DirectionalLightHelper, DoubleSide, Mesh, Object3D} from 'three'
import {useFrame} from '@react-three/fiber'
import {
    Environment,
    Sky,
    useHelper,
    ContactShadows,
    BakeShadows,
    softShadows,
    AccumulativeShadows,
    RandomizedLight,
    Lightformer,
    Stage
} from '@react-three/drei'
import {Perf} from 'r3f-perf'
import {useControls} from 'leva'

// softShadows({
//     near: 9.5,
//     frustum: 3.75,
//     size: 0.005,
//     samples: 17,
//     rings: 11
// })

export const Lesson52 = () => {
    const cubeRef = useRef<Mesh | null>(null)
    const directionalLightRef = useRef<DirectionalLight | null>(null)

    useFrame((state, delta) => {
        const elapsedTime = state.clock.elapsedTime

        if (cubeRef.current) {
            cubeRef.current.rotation.y += delta * 0.2
            cubeRef.current.position.z = Math.sin(elapsedTime) * 2
        }
    })

    const {color, opacity, blur} = useControls('contact-shadow', {
        color: '#000',
        opacity: {
            value: 0.5, min: 0, max: 1
        },
        blur: {
            value: 1, min: 0, max: 10
        }
    })

    const {sunPosition} = useControls('sky', {
        sunPosition: {
            value: [1, 2, 3]
        }
    })

    const {envMapIntensity} = useControls('environment map', {
        envMapIntensity: {
            value: 3.5,
            min: 0,
            max: 12
        }
    })

    // @ts-ignore
    // useHelper(directionalLightRef, DirectionalLightHelper, 1)

    return (
        <>
            <Perf position='top-left'/>
            {/*<BakeShadows/>*/}

            {/*<AccumulativeShadows*/}
            {/*    position={[0, -0.99, 0]}*/}
            {/*    scale={10}*/}
            {/*    // frames={1000}*/}
            {/*    frames={Infinity}*/}
            {/*    opacity={0.8}*/}
            {/*    blend={100}*/}
            {/*>*/}
            {/*    <RandomizedLight*/}
            {/*        // castShadow*/}
            {/*        position={[1, 3, 1]}*/}
            {/*        amount={8}*/}
            {/*        radius={1}*/}
            {/*        ambient={0.5}*/}
            {/*        intensity={1}*/}
            {/*        bias={0.001}*/}
            {/*    />*/}
            {/*</AccumulativeShadows>*/}

            {/*<Environment*/}
            {/*    background*/}
            {/*    files={[*/}
            {/*        '/environmentMaps/0/px.jpg',*/}
            {/*        '/environmentMaps/0/nx.jpg',*/}
            {/*        '/environmentMaps/0/py.jpg',*/}
            {/*        '/environmentMaps/0/ny.jpg',*/}
            {/*        '/environmentMaps/0/pz.jpg',*/}
            {/*        '/environmentMaps/0/nz.jpg',*/}
            {/*    ]}*/}
            {/*    files='/environmentMaps/the_sky_is_on_fire_2k.hdr'*/}
            {/*    preset='sunset'*/}
            {/*    resolution={1024 * 2}*/}
            {/*    ground={{*/}
            {/*        height: 7,*/}
            {/*        radius: 28,*/}
            {/*        scale: 100*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <color args={['#000']} attach='background'/>*/}
            {/*    <Lightformer*/}
            {/*        position-z={-5}*/}
            {/*        scale={10}*/}
            {/*        color='red'*/}
            {/*        intensity={2}*/}
            {/*        form='ring'*/}
            {/*    />*/}
            {/*    <mesh scale={20} position-z={-10}>*/}
            {/*        <planeGeometry/>*/}
            {/*        <meshBasicMaterial color='#f00'/>*/}
            {/*    </mesh>*/}
            {/*</Environment>*/}
            <color args={['#20d0ae']} attach='background'/>
            <ContactShadows
                position={[0, 0, 0]}
                resolution={1024}
                color={color}
                opacity={opacity}
                blur={blur}
                // frames={1} baked shadow only render shadow for the first render
            />

            {/*<directionalLight*/}
            {/*    castShadow*/}
            {/*ref={directionalLightRef}*/}
            {/*position={sunPosition}*/}
            {/*shadow-mapSize={[1024, 1024]}*/}
            {/*shadow-camera-near={1}*/}
            {/*shadow-camera-far={15}*/}
            {/*shadow-camera-top={2}*/}
            {/*shadow-camera-bottom={-2}*/}
            {/*shadow-camera-right={2}*/}
            {/*shadow-camera-left={-2}*/}
            {/*/>*/}

            {/*<Sky*/}
            {/*    sunPosition={sunPosition}*/}
            {/*/>*/}

            {/*<ambientLight*/}
            {/*    castShadow*/}
            {/*    intensity={0.4}*/}
            {/*/>*/}


            {/*<mesh*/}
            {/*    position={[2, 1, 0]}*/}
            {/*    ref={cubeRef}*/}
            {/*    castShadow*/}
            {/*>*/}
            {/*    <boxGeometry/>*/}
            {/*    <meshStandardMaterial color='#e52170' envMapIntensity={envMapIntensity}/>*/}
            {/*</mesh>*/}

            {/*<mesh*/}
            {/*    position={[-2, 1, 0]}*/}
            {/*    castShadow*/}
            {/*>*/}
            {/*    <sphereGeometry/>*/}
            {/*    <meshStandardMaterial color='#f0f' envMapIntensity={envMapIntensity}/>*/}
            {/*</mesh>*/}
            {/*<mesh rotation-x={Math.PI * -0.5} scale={10} position-y={-0.01} receiveShadow>*/}
            {/*    <planeGeometry/>*/}
            {/*    <meshStandardMaterial color='#54e514' side={DoubleSide} envMapIntensity={envMapIntensity}/>*/}
            {/*</mesh>*/}

            <Stage
                environment='sunset'
                preset='portrait'
            >
                <mesh
                    position={[2, 1, 0]}
                    ref={cubeRef}

                >
                    <boxGeometry/>
                    <meshStandardMaterial color='#e52170' envMapIntensity={envMapIntensity}/>
                </mesh>

                <mesh
                    position={[-2, 1, 0]}

                >
                    <sphereGeometry/>
                    <meshStandardMaterial color='#f0f' envMapIntensity={envMapIntensity}/>
                </mesh>
            </Stage>
        </>
    );
};