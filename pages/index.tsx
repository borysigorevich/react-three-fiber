import Head from 'next/head'
import {Color} from 'three'
import {Canvas, RootState} from '@react-three/fiber'
import {OrbitControls} from '@react-three/drei'
import {Leva} from 'leva'
import {Experience, Lesson52} from "../components";


export default function Home() {

    const created = ({gl, scene}: RootState) => {

        // gl.setClearColor('#19c979', 1)
        scene.background = new Color('#20d0ae')
    }

    return (
        <>
            {/*<main className='h-screen'>*/}
            {/*    <Canvas*/}
            {/*        shadows*/}
            {/*        dpr={[1, 2]} //default value - device pixel ratio*/}
            {/*        camera={{*/}
            {/*            fov: 45,*/}
            {/*            near: 0.1,*/}
            {/*            far: 200,*/}
            {/*            position: [3, 5, 20]*/}
            {/*        }}*/}
            {/*onCreated={created}*/}
            {/*>*/}
            {/*<Leva />*/}

            {/*<color args={['#20d0ae']} attach='background'/>*/}
            <Experience/>
            {/*<Lesson52/>*/}

            {/*<mesh position={[3, 0, 0]}>*/}
            {/*    <torusKnotGeometry/>*/}
            {/*    <meshNormalMaterial/>*/}
            {/*</mesh>*/}
            {/*<OrbitControls makeDefault/>*/}
            {/*</Canvas>*/}
            {/*</main>*/}
        </>
    )
}
