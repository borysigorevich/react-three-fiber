import React from 'react';
import {Lights} from "../components";
import {BlockAxe, BlockLimbo, BlockSpinner, Level1, Player} from "../components/Game";
import {Physics, Debug} from '@react-three/rapier'

import {Perf} from 'r3f-perf'
import {useGameStore} from "../stores";

import {useControls} from 'leva'

const Three53 = () => {

    const blocksCount = useGameStore(state => state.blocksCount)

    // const {blocksCount} = useControls({
    //     blocksCount: {
    //         value: 3,
    //         min: 3,
    //         max: 20,
    //         step: 1
    //     }
    // })

    return (
        <>
            <Perf position='top-left'/>

            <Lights/>
            <Physics>
                <Debug/>
                <Level1 count={blocksCount} types={[BlockSpinner, BlockLimbo, BlockAxe]}/>
                <Player/>
            </Physics>
            <color args={['#000']} attach='background'/>
        </>
    );
};

export default Three53;