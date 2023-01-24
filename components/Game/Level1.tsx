import React, {ElementType, useEffect, useMemo, useRef, useState} from 'react';

import {Vector3, BoxGeometry, MeshStandardMaterial, ColorManagement, Quaternion, Euler, Mesh} from 'three'
import {useFrame} from '@react-three/fiber'
import {useGLTF} from '@react-three/drei'
import {RigidBody, RigidBodyApi, CuboidCollider} from '@react-three/rapier'

type BlockStartType = {
    position?: Vector3
}

type Level1Type = {
    count: number
    types: ElementType[]
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

export const BlockSpinner = ({position = new Vector3(0, 0, 0)}: BlockStartType) => {

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

export const BlockLimbo = ({position = new Vector3(0, 0, 0)}: BlockStartType) => {

    const [timeOffset] = useState(() => Math.random() * 2 * Math.PI)

    const upDownObstacle = useRef<RigidBodyApi | null>(null)

    useFrame((state) => {
        const elapsedTime = state.clock.elapsedTime

        const y = Math.sin(elapsedTime + timeOffset) + 1.15
        const quaternionTranslation = new Quaternion(position.x, position.y + y, position.z)
        upDownObstacle.current?.setNextKinematicTranslation(quaternionTranslation)
        // twisterObstacle.current?.setNextKinematicRotation(quaternionRotation)
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
                ref={upDownObstacle}
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

export const BlockAxe = ({position = new Vector3(0, 0, 0)}: BlockStartType) => {

    const [timeOffset] = useState(() => Math.random() * 2 * Math.PI)
    const [speed] = useState(() => Math.random() + 1.2)

    const upDownObstacle = useRef<RigidBodyApi | null>(null)

    useFrame((state) => {
        const elapsedTime = state.clock.elapsedTime * speed

        const x = Math.sin(elapsedTime + timeOffset) * 1.2
        const quaternionTranslation = new Quaternion(position.x + x, position.y + 0.75, position.z)
        upDownObstacle.current?.setNextKinematicTranslation(quaternionTranslation)
        // twisterObstacle.current?.setNextKinematicRotation(quaternionRotation)
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
                ref={upDownObstacle}
                type='kinematicPosition'
                restitution={0.1}
                friction={0}
                position={[0, 0.3, 0]}
            >
                <mesh
                    geometry={boxGeometry}
                    material={obstacleMaterial}
                    scale={[1.5, 1.5, 0.3]}
                    castShadow
                    receiveShadow
                />
            </RigidBody>
        </group>
    )
}

export const BlockEnd = (
    {
        position = new Vector3(0, 0, 0)
    }: BlockStartType
) => {

    const hamburger = useGLTF('/hamburger.glb')

    hamburger.scene.children.forEach(mesh => mesh.castShadow = true)

    return (

        <group position={position}>
            <RigidBody type='fixed'>
                <mesh
                    receiveShadow
                    geometry={boxGeometry}
                    material={floor2Material}
                    scale={[4, 0.2, 4]}
                />
            </RigidBody>
            <RigidBody type='fixed' colliders='cuboid' restitution={0.2} friction={0} position-y={0.25}>
                <primitive object={hamburger.scene} scale={0.25}/>
            </RigidBody>
        </group>
    )
}

const SideWall = (
    {
        position,
        wallLength,
        receiveShadow
    }: { position: number, wallLength: number, receiveShadow: boolean }) => {

    const zScale = 8 + (wallLength * 4)

    return (
        <mesh
            geometry={boxGeometry}
            material={wallMaterial}
            scale={[1.9, 0.3, zScale]}
            // position={[position, 1.8, -(4 + (wallLength * 8)) / 2]}
            position={[position, 0.75, -(zScale - 4) / 2]}
            rotation={[0, 0, Math.PI * 0.5]}
            castShadow
            receiveShadow={receiveShadow}
        />
    )
}

const EndWall = ({count}: { count: number }) => {
    return (
        <mesh
            scale={[4, 1.6, 0.3]}
            geometry={boxGeometry}
            material={wallMaterial}
            position={[0, 0.9, -count * 4 + 2.15]}
        />
    )
}

export const Level1 = ({count = 5, types = [BlockSpinner, BlockAxe, BlockLimbo]}: Level1Type) => {

    const roadOfDeath = useMemo(() => {

        const obstacles: ElementType[] = []

        for (let i = 0; i < count; i++) {
            obstacles.push(types[Math.floor(Math.random() * types.length)])
        }

        return obstacles
    }, [count, types])

    return (
        <>
            <RigidBody type='fixed' restitution={0.2} friction={0}>
                <SideWall position={2.15} wallLength={count} receiveShadow={false}/>
                <SideWall position={-2.15} wallLength={count} receiveShadow={true}/>
                <EndWall count={count + 2}/>
            </RigidBody>
            <BlockStart position={new Vector3(0, 0, 0)}/>
            {roadOfDeath.map((Obstacle, index) => (
                <Obstacle key={index} position={new Vector3(0, 0, (index + 1) * -4)}/>
            ))}
            <BlockEnd position={new Vector3(0, 0, (roadOfDeath.length + 1) * -4)}/>
            <CuboidCollider
                args={[2, 0.1, 4 + count * 2]}
                position={[0, -0.1, count * -2 - 2]}
                restitution={0.2}
                friction={1}
            />
        </>
    );
};