import React from 'react';
import {Lights} from "../components";
import {BlockAxe, BlockLimbo, BlockSpinner, Effects, Level1, Player} from "../components/Game";
import {Physics, Debug} from '@react-three/rapier'
import {Sky} from '@react-three/drei'

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

    // function correct(string: string) {
    //     const strArr = string.split('')
    //
    //     return strArr.map(char => {
    //         switch (char) {
    //             case '5':
    //                 return 'S';
    //             case '0':
    //                 return 'O';
    //             case '1':
    //                 return 'I';
    //             default:
    //                 return char;
    //         }
    //     }).join('')
    // }

    function correct(string: string) {
        let arr = string.split('');

        let lettersArr = arr.map(value => {
            if (value === '5') {
                return 'S'
            } else if (value === '0') {
                return 'O'
            } else if (value === '1') {
                return 'I'
            } else {
                return value;
            }
        })

        let correctArr = lettersArr.reduce((sum, current) => sum + current)

        return correctArr;
    }


    console.log(correct('HE50LL1'))

    return (
        <>
            <Perf position='top-left'/>

            <Lights/>
            <Physics>
                {/*<Debug/>*/}
                <Level1 count={blocksCount} types={[BlockSpinner, BlockLimbo, BlockAxe]}/>
                <Player/>
            </Physics>
            <Effects/>
            <color args={['#252731']} attach='background'/>
            {/*<Sky/>*/}
        </>
    );
};

export default Three53;