import React from 'react';

const Algorithms = () => {

    const bubble = (arr: number[]): void => {
        for (let i = 0; i < arr.length - 1; i++) {
            console.log('here')
            for (let j = 0; j < arr.length - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    const tmp = arr[j]
                    arr[j] = arr[j + 1]
                    arr[j + 1] = tmp
                }
            }
        }
    }

    const descBubble = (arr: number[]): void => {
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - 1 - i; j++) {
                if (arr[j] < arr[j + 1]) {
                    const tmp = arr[j]
                    arr[j] = arr[j + 1]
                    arr[j + 1] = tmp
                }
            }
        }
    }

    const insert = (arr: number[]): void => {

        for (let i = 1; i < arr.length; i++) {
            const numberToInsert = arr[i]
            let j = i - 1

            while (j >= 0 && arr[j] > numberToInsert) {
                arr[j + 1] = arr[j]
                j--
            }
            arr[j + 1] = numberToInsert
        }
    }

    const descInsert = (arr: number[]): void => {
        for (let i = 1; i < arr.length; i++) {
            const numberToInsert = arr[i]
            let j = i - 1

            while (j >= 0 && arr[j] < numberToInsert) {
                arr[j + 1] = arr[j]
                j--
            }
            arr[j + 1] = numberToInsert
        }
    }

    const quick = (arr: number[]): number[] => {
        if (arr.length < 2) return arr

        const pivot = arr[arr.length - 1]

        const left = []
        const right = []

        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] < pivot) left.push(arr[i])
            else right.push(arr[i])
        }

        return [...quick(left), pivot, ...quick(right)]
    }

    const descQuick = (arr: number[]): number[] => {
        if (arr.length < 2) return arr

        const pivot = arr[arr.length - 1]
        const left = []
        const right = []

        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] < pivot) right.push(arr[i])
            else left.push(arr[i])
        }

        return [...descQuick(right), pivot, ...descQuick(left)]
    }

    const sort = (left: number[], right: number[]): number[] => {
        const sortedArr = []

        //asc
        // while (left.length && right.length) {
        //     if (left[0] > right[0]) sortedArr.push(right.shift() as number)
        //     else sortedArr.push(left.shift() as number)
        // }
        //desc
        while (left.length && right.length) {
            if (left[0] < right[0]) sortedArr.push(right.shift() as number)
            else sortedArr.push(left.shift() as number)
        }

        return [...sortedArr, ...left, ...right]
    }

    const merge = (arr: number[]): number[] => {
        if (arr.length < 2) return arr

        const mid = Math.floor(arr.length / 2)

        const left = arr.slice(0, mid)
        const right = arr.slice(mid)

        return sort(merge(left), merge(right))
    }

    const arr = [5, 4, 3, 2, 1]
    const descArr = [1, 2, 3, 4, 5]

    descBubble(descArr)
    console.log(descArr)
    // console.log(quick(arr))
    console.log(merge(arr))

    // bubble(arr)
    // insert(arr)
    // console.log(arr)

    return (
        <>
            <color args={['#000']} attach='background'/>
            <mesh>
                <boxGeometry/>
                <meshBasicMaterial/>
            </mesh>
        </>
    );
};

export default Algorithms;