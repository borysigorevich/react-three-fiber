import React, {useRef, useEffect, useState} from 'react';

import {RigidBody, RigidBodyApi, useRapier} from '@react-three/rapier'
import {useFrame} from '@react-three/fiber'
import {useKeyboardControls} from '@react-three/drei'
import {Vector3} from 'three'
import {Controls} from "../../pages/_app";
import {useGameStore} from "../../stores";

export const Player = () => {

    const [color] = useState(() => Math.random() * 360)

    const [smoothedCameraPosition] = useState(() => new Vector3(10, 10, 10))
    const [smoothedCameraTarget] = useState(() => new Vector3())

    const startGame = useGameStore(state => state.start)
    const phase = useGameStore(state => state.phase)
    const blocksCount = useGameStore(state => state.blocksCount)
    const endGame = useGameStore(state => state.end)
    const restartGame = useGameStore(state => state.restart)
    const resetTimer = useGameStore(state => state.resetTimer)

    const player = useRef<RigidBodyApi | null>(null)
    const {rapier, world} = useRapier()

    const rapierWorld = world.raw()

    const [subscribeKeys, getKeys] = useKeyboardControls<Controls>()

    const jump = () => {
        const origin = player.current?.translation()
        origin?.set(0, origin.y - 0.31, 0)
        // origin!.y -= 0.31
        //
        const direction = {x: 0, y: -1, z: 0}
        const ray = new rapier.Ray(origin!, direction)
        const hit = rapierWorld.castRay(ray, 10, true)

        if (!hit || hit.toi > 0) return
        player.current?.applyImpulse({x: 0, y: 0.5, z: 0})
    }

    const reset = () => {
        player.current?.setTranslation({x: 0, y: 0, z: 0})
        player.current?.setLinvel({x: 0, y: 0, z: 0})
        player.current?.setAngvel({x: 0, y: 0, z: 0})

        resetTimer()
    }

    useEffect(() => {
        const unsubscribePhase = useGameStore.subscribe(
            state => state.phase,
            (value) => {
                if (value === 'ready') {
                    reset()
                }
            }
        )

        const unsubscribeJump = subscribeKeys(
            (state) => state.jump,
            (value) => value && jump()
        )

        const unsubscribeAnyKeys = subscribeKeys(() => {
            phase === 'ready' && startGame()
        })

        return () => {
            unsubscribeJump()
            unsubscribeAnyKeys()
            unsubscribePhase()
        }

    }, [phase])


    useFrame((state, delta) => {

        const elapsedTime = state.clock.elapsedTime

        const {right, back, left, forward} = getKeys()

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

        smoothedCameraPosition.lerp(cameraPosition, 5 * delta)
        smoothedCameraTarget.lerp(cameraTarget, 5 * delta)

        state.camera.position.copy(smoothedCameraPosition)
        state.camera.lookAt(smoothedCameraTarget)

        if (phase !== 'ended' && position!.z < -(blocksCount * 4) - 2) {
            endGame()
        }

        if (position!.y < -4 && phase !== 'ready') restartGame()
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
                    <meshStandardMaterial flatShading color={`hsl(${color}, 50%, 75%)`}/>
                </mesh>
            </RigidBody>
        </>
    );
};