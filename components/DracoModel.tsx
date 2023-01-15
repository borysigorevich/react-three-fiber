import React from 'react';
import {useLoader} from '@react-three/fiber'
import {useGLTF, Clone} from '@react-three/drei'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader'

useGLTF.preload('/hamburger.glb')

const DracoModel = (props: {}) => {

    // const model = useLoader(
    //     GLTFLoader,
    //     '/hamburger.glb',
    //     (loader) => {
    //         const dracoLoader = new DRACOLoader()
    //         dracoLoader.setDecoderPath('/draco/')
    //         loader.setDRACOLoader(dracoLoader)
    //     }
    // )

    const {nodes, materials} = useGLTF('/hamburger-draco.glb')


    console.log('draco model render')

    return (
        <>
            {/*<Clone object={model.scene} position={[0, -0.9, 0]} scale={0.1}/>*/}
            {/*<Clone object={model.scene} position={[2, -0.9, 0]} scale={0.1}/>*/}
            {/*<Clone object={model.scene} position={[-2, -0.9, 0]} scale={0.1}/>*/}
            <group {...props} dispose={null} scale={0.1} position={[0, -1, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.meat.geometry}
                    material={materials.SteakMaterial}
                    position={[0, 2.82, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.topBun.geometry}
                    material={materials.BunMaterial}
                    position={[0, 1.77, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.bottomBun.geometry}
                    material={materials.BunMaterial}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.cheese.geometry}
                    material={materials.CheeseMaterial}
                    position={[0, 3.04, 0]}
                />
            </group>
        </>
    );
};

export default DracoModel