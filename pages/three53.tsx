import React from 'react';
import {Lights} from "../components";
import {Level1} from "../components/Game";
import {Physics, Debug} from '@react-three/rapier'

import {Perf} from 'r3f-perf'

const Three53 = () => {
    return (
        <>
            <Perf position='top-left'/>

            <Lights/>
            <Physics>
                <Debug/>
                <Level1/>
            </Physics>
            <color args={['#000']} attach='background'/>
        </>
    );
};

export default Three53;