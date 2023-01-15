import React, {useRef, lazy, Suspense} from 'react';
import {Mesh, DoubleSide} from 'three'
import {Float} from '@react-three/drei'
import {useFrame, useLoader} from '@react-three/fiber'
import {Perf} from 'r3f-perf'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader'
import {FoxModel, SuspendedMesh} from "../components";

const DracoModel = lazy(() => import('../components/DracoModel'))

const Three46 = () => {
    const cubeRef = useRef<Mesh | null>(null)

    useFrame((state, delta) => {
        const elapsedTime = state.clock.elapsedTime
        if (cubeRef.current) cubeRef.current.position.x = Math.sin(elapsedTime) - 2
        if (cubeRef.current) cubeRef.current.position.y = Math.abs(Math.sin(elapsedTime)) * 2
    })

    const model = useLoader(
        GLTFLoader,
        // '/hamburger-draco.glb',
        '/FlightHelmet/glTF/FlightHelmet.gltf',
        (loader) => {
            // console.log(loader)
            const dracoLoader = new DRACOLoader()
            dracoLoader.setDecoderPath('/draco/')
            loader.setDRACOLoader(dracoLoader)
        }
    )

    return (
        <>
            <Perf position='top-left'/>

            <directionalLight position={[0, 2, 2]} castShadow shadow-normalBias={0.04}/>
            <ambientLight intensity={0.4}/>
            <color args={['#20d0ae']} attach='background'/>
            {/*<mesh position={[-2, 0, 0]} castShadow ref={cubeRef}>*/}
            {/*    <boxGeometry/>*/}
            {/*    <meshStandardMaterial color='#f00'/>*/}
            {/*</mesh>*/}

            {/*<Float*/}
            {/*    speed={5}*/}
            {/*    floatIntensity={4}*/}
            {/*>*/}
            {/*    <mesh position={[2, 2, 0]} castShadow>*/}
            {/*        <sphereGeometry/>*/}
            {/*        <meshStandardMaterial color='#00f'/>*/}
            {/*    </mesh>*/}
            {/*</Float>*/}

            {/*<mesh castShadow position={[0, -0.8, 0]}>*/}
            {/*    <primitive object={model.scene} scale={3}/>*/}
            {/*</mesh>*/}


            <mesh
                position={[0, -1, 0]}
                rotation-x={Math.PI * -0.5}
                scale={10}
                receiveShadow
            >
                <planeGeometry/>
                <meshStandardMaterial color='#0f0' side={DoubleSide}/>
            </mesh>

            <FoxModel/>

            <Suspense fallback={<SuspendedMesh/>}>
                <DracoModel/>
            </Suspense>

        </>
    );
};

export default Three46;