import React, {ElementType, useEffect, useMemo, useRef, useState} from 'react';

import {Vector3, BoxGeometry, MeshStandardMaterial, ColorManagement, Quaternion, Euler, Mesh} from 'three'
import {useFrame} from '@react-three/fiber'
import {useGLTF, Float, Text} from '@react-three/drei'
import {RigidBody, RigidBodyApi, CuboidCollider} from '@react-three/rapier'
import {useControls} from "leva";

type BlockStartType = {
    position?: Vector3
    speedMultiply?: number
}

type Level1Type = {
    count: number
    types: ElementType[]
}

ColorManagement.legacyMode = false

const boxGeometry = new BoxGeometry(1, 1, 1)

const floor1Material = new MeshStandardMaterial({color: '#111', metalness: 0, roughness: 0})
// const floor1Material = new MeshStandardMaterial({color: 'limegreen', metalness: 0, roughness: 0})
// const floor2Material = new MeshStandardMaterial({color: `hsl(${Math.random() * 360}, 50%, 75%)`})
const floor2Material = new MeshStandardMaterial({color: '#222', metalness: 0, roughness: 0})
// const floor2Material = new MeshStandardMaterial({color: 'greenyellow', metalness: 0, roughness: 0})
const obstacleMaterial = new MeshStandardMaterial({color: '#f00', metalness: 0, roughness: 1})
// const obstacleMaterial = new MeshStandardMaterial({color: 'orangered', metalness: 0, roughness: 1})
const wallMaterial = new MeshStandardMaterial({color: '#877', metalness: 0, roughness: 0})
// const wallMaterial = new MeshStandardMaterial({color: 'slategrey', metalness: 0, roughness: 0})

const BlockStart = (
    {
        position = new Vector3(0, 0, 0)
    }: BlockStartType
) => {
    return (
        <group position={position}>
            <Float>
                <Text
                    position={[1.2, 1, 0]}
                    scale={0.5}
                    textAlign='right'
                    lineHeight={0.75}
                    maxWidth={2}
                    rotation-y={Math.PI * -0.2}
                    font='/bebas-neue-v9-latin-regular.woff'
                >Marble Race</Text>
            </Float>
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

export const BlockSpinner = ({position = new Vector3(0, 0, 0), speedMultiply = 1}: BlockStartType) => {

    const [speed] = useState(() => (Math.random() + 0.3) * (Math.random() < 0.5 ? -1 : 1))

    const twisterObstacle = useRef<RigidBodyApi | null>(null)

    useFrame((state) => {
        const elapsedTime = state.clock.elapsedTime

        const eulerRotation = new Euler(0, (elapsedTime * speedMultiply) * speed, 0)
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
                >
                    {/*<meshStandardMaterial color={`hsl(${Math.random() * 360}, 50%, 75%)`}/>*/}
                </mesh>
            </RigidBody>
        </group>
    )
}

export const BlockLimbo = ({position = new Vector3(0, 0, 0), speedMultiply = 1}: BlockStartType) => {

    const [timeOffset] = useState(() => Math.random() * 2 * Math.PI)

    const upDownObstacle = useRef<RigidBodyApi | null>(null)

    useFrame((state) => {
        const elapsedTime = state.clock.elapsedTime
        const y = Math.sin(elapsedTime * speedMultiply + timeOffset) + 1.15
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
                >
                    {/*<meshStandardMaterial color={`hsl(${Math.random() * 360}, 50%, 75%)`}/>*/}
                </mesh>
            </RigidBody>
        </group>
    )
}

export const BlockAxe = ({position = new Vector3(0, 0, 0), speedMultiply = 1}: BlockStartType) => {

    const [timeOffset] = useState(() => Math.random() * 2 * Math.PI)
    const [speed] = useState(() => Math.random() + 1.2)

    const upDownObstacle = useRef<RigidBodyApi | null>(null)

    useFrame((state) => {
        const elapsedTime = state.clock.elapsedTime * speed

        const x = Math.sin(elapsedTime * speedMultiply + timeOffset) * 1.2
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
                >
                    {/*<meshStandardMaterial color={`hsl(${Math.random() * 360}, 50%, 75%)`}/>*/}
                </mesh>
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

    const {speed} = useControls({
        speed: {
            value: 1,
            min: 1,
            max: 20,
            step: 1
        }
    })

    return (
        <>
            <RigidBody type='fixed' restitution={0.2} friction={0}>
                <SideWall position={2.15} wallLength={count} receiveShadow={false}/>
                <SideWall position={-2.15} wallLength={count} receiveShadow={true}/>
                <EndWall count={count + 2}/>
            </RigidBody>
            <BlockStart position={new Vector3(0, 0, 0)}/>
            {roadOfDeath.map((Obstacle, index) => (
                <Obstacle key={index} speedMultiply={speed} position={new Vector3(0, 0, (index + 1) * -4)}/>
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