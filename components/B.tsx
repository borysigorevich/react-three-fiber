import React, {useEffect, useLayoutEffect} from 'react';

export const B = () => {

    console.log('B render')

    useLayoutEffect(() => {
        console.log('B use layout effect')
    }, [])

    useEffect(() => {

        console.log('B use effect')
    }, [])

    return (
        <div ref={() => console.log('B ref')}>

        </div>
    );
};