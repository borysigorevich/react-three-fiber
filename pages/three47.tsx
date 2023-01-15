import React, {useState, useRef} from 'react';
import {Text3D, Center, useMatcapTexture} from '@react-three/drei'
import {useFrame} from '@react-three/fiber'
import {Perf} from 'r3f-perf'
import {Group, Mesh, MeshMatcapMaterial, TorusGeometry} from "three";

const Three47 = () => {
    const groupRef = useRef<Group | null>(null)
    const meshesArrayRef = useRef<Mesh[]>([])

    const [torusGeometry, setTorusGeometry] = useState<TorusGeometry | null>(null)
    const [material, setMaterial] = useState<MeshMatcapMaterial | null>(null)

    const [matcapTexture] = useMatcapTexture('482908_894E0D_FBDB52_CA7420', 256)
    const [donutTexture] = useMatcapTexture('5E5855_C6C4CD_C89B67_8F8E98', 256)

    const arr = [...Array(100)]
    const range = 50

    useFrame((state, delta) => {
        const elapsedTime = state.clock.elapsedTime

        // console.log(groupRef.current)

        // for (const mesh of groupRef.current!.children) {
        //     mesh.rotation.y += delta * 0.4
        // }

        for(const donut of meshesArrayRef.current) {
            donut.rotation.y += delta * 0.4
        }
    })

    console.log(meshesArrayRef.current)

    return (
        <>
            <Perf position='top-left'/>
            {/*<directionalLight*/}
            {/*    */}
            {/*/>*/}
            {/*<ambientLight/>*/}
            {/*<mesh>*/}
            {/*    <boxGeometry/>*/}
            {/*    <meshNormalMaterial/>*/}
            {/*</mesh>*/}

            <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]}/>
            <meshMatcapMaterial ref={setMaterial} matcap={donutTexture}/>
            <color args={['#20d0ae']} attach='background'/>
            <Center>
                <Text3D
                    font='/fonts/helvetiker_regular.typeface.json'
                    size={0.75}
                    height={0.2}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                >
                    Hello R3F
                    <meshMatcapMaterial matcap={matcapTexture}/>
                </Text3D>
            </Center>

            {/*<mesh position={[3, 4, 0]}>*/}
            {/*    <torusGeometry args={[1, 0.6, 16, 32]}/>*/}
            {/*    <meshMatcapMaterial matcap={donutTexture}/>*/}
            {/*</mesh>*/}

            <group ref={groupRef}>
                {arr.map((_, index) => (
                        <mesh
                            ref={(mesh) => {
                                if(mesh) meshesArrayRef.current[index] = mesh
                            }}
                            key={index}
                            geometry={torusGeometry!}
                            material={material!}
                            position={[
                                (Math.random() - 0.5) * range,
                                (Math.random() - 0.5) * range,
                                (Math.random() - 0.5) * range
                            ]}
                            scale={0.4 + Math.random() * 0.2}
                            rotation={[
                                Math.random() * Math.PI,
                                Math.random() * Math.PI,
                                0
                            ]}
                        >
                            {/*<torusGeometry args={[1, 0.6, 16, 32]}/>*/}
                            {/*<meshMatcapMaterial matcap={donutTexture}/>*/}
                        </mesh>
                    )
                )}
            </group>
        </>
    );
};

export default Three47;