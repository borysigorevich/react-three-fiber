import React, {useEffect} from 'react';
import {useGLTF, useAnimations} from '@react-three/drei'
import {useControls, button} from 'leva'

export const FoxModel = () => {

    const model = useGLTF('/Fox/glTF/Fox.gltf')
    const animations = useAnimations(model.animations, model.scene)

    const {animationNames} = useControls('animation', {
        animationNames: {
            options: animations.names
        }
    })

    console.log(animationNames)
    useEffect(() => {
        const action = animations.actions[animationNames]
        action?.reset()
            .fadeIn(0.5)
            .play()
        // console.log(run)
        // run?.play()

        // const timeout = window.setTimeout(() => {
        //     animations.actions.Walk?.play()
        //     animations.actions.Walk?.crossFadeFrom(run!, 1)
        // }, 2000)
        //
        // return () => window.clearTimeout(timeout)
        return () => {
            action?.fadeOut(0.5)
        }
    }, [animationNames])

    return (
        <>
            <primitive
                object={model.scene}
                scale={0.01}
                position={[2, -1, 0]}
                rotation-y={-0.4}
                // rotation-x={0.2}
            />
        </>
    );
};