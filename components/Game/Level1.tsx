import React, {useRef, useState} from 'react';

import {Vector3, BoxGeometry, MeshStandardMaterial, ColorManagement, Quaternion, Euler} from 'three'
import {useFrame} from '@react-three/fiber'
import {RigidBody, RigidBodyApi} from '@react-three/rapier'

type BlockStartType = {
    position?: Vector3
}

ColorManagement.legacyMode = false

const boxGeometry = new BoxGeometry(1, 1, 1)

const floor1Material = new MeshStandardMaterial({color: 'limegreen'})
const floor2Material = new MeshStandardMaterial({color: 'greenyellow'})
const obstacleMaterial = new MeshStandardMaterial({color: 'orangered'})
const wallMaterial = new MeshStandardMaterial({color: 'slategrey'})

const BlockStart = (
    {
        position = new Vector3(0, 0, 0)
    }: BlockStartType
) => {
    return (

        <group position={position}>
            <mesh
                position-y={-0.1}
                receiveShadow
                geometry={boxGeometry}
                material={floor1Material}
                scale={[4, 0.2, 4]}
            />
        </group>
    )
}

const BlockSpinner = ({position = new Vector3(0, 0, 0)}: BlockStartType) => {

    const [speed] = useState(() => (Math.random() + 0.3) * (Math.random() < 0.5 ? -1 : 1))

    const twisterObstacle = useRef<RigidBodyApi | null>(null)

    useFrame((state) => {
        const elapsedTime = state.clock.elapsedTime

        const eulerRotation = new Euler(0, elapsedTime * speed, 0)
        const quaternionRotation = new Quaternion()
        quaternionRotation.setFromEuler(eulerRotation)
        twisterObstacle.current?.setNextKinematicRotation(quaternionRotation)
    })

    return (
        <group position={position}>
            <mesh
                geometry={boxGeometry}
                material={floor2Material}
                scale={[4, 0.2, 4]}
                position-y={-0.1}
                castShadow
                receiveShadow
            />
            <RigidBody
                ref={twisterObstacle}
                type='kinematicPosition'
                restitution={0.1}
                friction={0}
                position={[0, 0.3, 0]}
            >
                <mesh
                    geometry={boxGeometry}
                    material={obstacleMaterial}
                    scale={[3.5, 0.3, 0.3]}
                    castShadow
                    receiveShadow
                />
            </RigidBody>
        </group>
    )
}

const BlockLimbo = ({position = new Vector3(0, 0, 0)}: BlockStartType) => {

    const [speed] = useState(() => (Math.random() + 0.3) * (Math.random() < 0.5 ? -1 : 1))

    const twisterObstacle = useRef<RigidBodyApi | null>(null)

    useFrame((state) => {
        const elapsedTime = state.clock.elapsedTime

        const eulerRotation = new Euler(0, elapsedTime * speed, 0)
        const quaternionRotation = new Quaternion()
        quaternionRotation.setFromEuler(eulerRotation)
        twisterObstacle.current?.setNextKinematicRotation(quaternionRotation)
    })

    return (
        <group position={position}>
            <mesh
                geometry={boxGeometry}
                material={floor2Material}
                scale={[4, 0.2, 4]}
                position-y={-0.1}
                castShadow
                receiveShadow
            />
            <RigidBody
                ref={twisterObstacle}
                type='kinematicPosition'
                restitution={0.1}
                friction={0}
                position={[0, 0.3, 0]}
            >
                <mesh
                    geometry={boxGeometry}
                    material={obstacleMaterial}
                    scale={[3.5, 0.3, 0.3]}
                    castShadow
                    receiveShadow
                />
            </RigidBody>
        </group>
    )
}

export const Level1 = () => {
    return (
        <>
            <BlockStart position={new Vector3(0, 0, 4)}/>
            <BlockSpinner position={new Vector3(0, 0, 0)}/>
        </>
    );
};