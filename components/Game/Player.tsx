import React, {useRef, useEffect, useState} from 'react';

import {RigidBody, RigidBodyApi, useRapier} from '@react-three/rapier'
import {useFrame} from '@react-three/fiber'
import {useKeyboardControls} from '@react-three/drei'
import {Vector3} from 'three'
import {Controls} from "../../pages/_app";

export const Player = () => {

    const [smoothedCameraPosition] = useState(() => new Vector3())
    const [smoothedCameraTarget] = useState(() => new Vector3())

    const player = useRef<RigidBodyApi | null>(null)
    const {rapier, world} = useRapier()

    const rapierWorld = world.raw()

    const [subscribeKeys, getKeys] = useKeyboardControls<Controls>()


    const jump = () => {
        const origin = player.current?.translation()
        origin?.set(0, origin.y - 0.31, 0)
        console.log(world)
        // origin!.y -= 0.31
        //
        const direction = {x: 0, y: -1, z: 0}
        const ray = new rapier.Ray(origin!, direction)
        const hit = rapierWorld.castRay(ray, 10, true)
        console.log(hit)
        if (!hit || hit.toi > 0) return
        player.current?.applyImpulse({x: 0, y: 0.5, z: 0})
    }

    useEffect(() => {
        const unsubscribe = subscribeKeys(
            (state) => state.jump,
            (value) => value && jump()
        )

        return () => unsubscribe()

    }, [])

    useFrame((state, delta) => {

        const {right, back, left, forward, jump} = getKeys()

        const impulse = {x: 0, y: 0, z: 0}
        const torque = {x: 0, y: 0, z: 0}

        const impulseStrength = 0.6 * delta
        const torqueStrength = 0.2 * delta

        if (forward) {
            impulse.z -= impulseStrength
            torque.x -= torqueStrength
        }

        if (back) {
            impulse.z += impulseStrength
            torque.x += torqueStrength
        }

        if (left) {
            impulse.x -= impulseStrength
            torque.z += torqueStrength
        }

        if (right) {
            impulse.x += impulseStrength
            torque.z -= torqueStrength
        }

        // if (jump) {
        //     impulse.y += impulseStrength * 2.5
        // }

        player.current?.applyImpulse(impulse)
        player.current?.applyTorqueImpulse(torque)

        const position = player.current?.translation()

        const cameraPosition = new Vector3()
        cameraPosition.copy(position!)
        cameraPosition.y += 1.65
        cameraPosition.z += 3.25

        const cameraTarget = new Vector3()
        cameraTarget.copy(position!)
        cameraTarget.y += 0.25

        smoothedCameraPosition.lerp(cameraPosition, 0.1)
        smoothedCameraTarget.lerp(cameraTarget, 0.1)

        state.camera.position.copy(smoothedCameraPosition)
        state.camera.lookAt(smoothedCameraTarget)

    })

    return (
        <>
            <RigidBody
                ref={player}
                colliders='ball'
                restitution={0.3}
                friction={1}
                position={[0, 1.5, 0]}
                linearDamping={0.5}
                angularDamping={0.5}
            >
                <mesh castShadow>
                    <icosahedronGeometry args={[0.3, 1]}/>
                    <meshStandardMaterial flatShading color='mediumpurple'/>
                </mesh>
            </RigidBody>
        </>
    );
};