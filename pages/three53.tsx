import React from 'react';
import {Lights} from "../components";
import {BlockAxe, BlockLimbo, BlockSpinner, Level1, Player} from "../components/Game";
import {Physics, Debug} from '@react-three/rapier'

import {Perf} from 'r3f-perf'

const Three53 = () => {
    return (
        <>
            <Perf position='top-left'/>

            <Lights/>
            <Physics>
                <Debug/>
                <Level1 count={10} types={[BlockSpinner, BlockLimbo, BlockAxe]}/>
                <Player/>
            </Physics>
            <color args={['#000']} attach='background'/>
        </>
    );
};

export default Three53;