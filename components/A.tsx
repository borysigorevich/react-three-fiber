import React, {useEffect, useLayoutEffect} from 'react';
import {B} from "./B";

export const A = () => {

    console.log('A render')

    useLayoutEffect(() => {
        console.log('A use layout effect')
    }, [])

    useEffect(() => {

        console.log('A use effect')
    }, [])


    const filterNumbersOptimal = (arr: number[]) => {
        return arr.filter((value) => {
            return value % 2 === 0 && value * 2 >= 1000
        })
    }

    console.log(['one'].concat(['two']))
    console.log([1, 2].join(''))

    return (
        <div ref={() => console.log('A ref')}>
            <B/>
        </div>
    );
};