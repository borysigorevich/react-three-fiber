import React, {useMemo, useRef, useLayoutEffect} from 'react';
import {BufferGeometry} from "three";

export const CustomObject = () => {
    const bufferGeometryRef = useRef<BufferGeometry | null>(null)

    const verticesCount = 10 * 3
    const position = useMemo(() => {
        const positions = new Float32Array(verticesCount * 3)

        for (let i = 0; i < verticesCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 3
        }
        return positions
    }, [])

    useLayoutEffect(() => {
        bufferGeometryRef.current?.computeVertexNormals()
    })

    return (
        <mesh position={[2, 2, 0]}>
            {/*<boxGeometry/>*/}
            <bufferGeometry ref={bufferGeometryRef}>
                <bufferAttribute
                    attach='attributes-position'
                    count={verticesCount}
                    itemSize={3}
                    array={position}
                />
            </bufferGeometry>
            <meshStandardMaterial color={'#fff'}/>
        </mesh>
    );
};