import React, {useEffect} from 'react';
import {useKeyboardControls} from "@react-three/drei";
import {Controls} from "../../pages/_app";
import {useGameStore} from "../../stores";

const key = (active: boolean) => `flex items-center justify-center h-10 w-10 border-2 border-white ${active ? 'bg-[rgba(255,255,255,.99)]' : 'bg-[rgba(255,255,255,.44)]'}`
const space = (active: boolean) => `flex items-center justify-center h-10 w-[128px] ${active ? 'bg-[rgba(255,255,255,.99)]' : 'bg-[rgba(255,255,255,.44)]'} border-2 border-white`


export const Interface = () => {

    const forward = useKeyboardControls<Controls>(state => state.forward)
    const left = useKeyboardControls<Controls>(state => state.left)
    const right = useKeyboardControls<Controls>(state => state.right)
    const back = useKeyboardControls<Controls>(state => state.back)
    const jump = useKeyboardControls<Controls>(state => state.jump)

    const restartGame = useGameStore(state => state.restart)
    const phase = useGameStore(state => state.phase)
    const miliSec = useGameStore(state => state.miliSec)
    const sec = useGameStore(state => state.sec)
    const timer = useGameStore(state => state.timer)

    useEffect(() => {
        let intervalId: number

        if (phase === 'playing') {
            intervalId = window.setInterval(() => {
                timer()
            }, 100)
        }

        return () => window.clearInterval(intervalId)
    }, [phase])

    return (
        <div className='fixed inset-0 w-full h-full pointer-events-none'>
            <div
                className='text-white absolute top-[15%] select-none left-0 w-full text-[6vh] pt-[5px] text-center bg-[rgba(0,0,0,.33)]'
            >
                {sec}.{miliSec}
            </div>

            <div
                onClick={restartGame}
                className={`flex ${phase === 'ended' ? 'pointer-events-auto' : 'pointer-events-none'} 
                ${phase === 'ended' ? 'opacity-1' : 'opacity-0'} absolute select-none cursor-pointer pt-[10px] 
                justify-center top-[40%] left-0 w-full text-white text-[80px] bg-[rgba(0,0,0,.33)] transition duration-300`}>
                Restart
            </div>

            <div className='flex flex-col gap-1 absolute bottom-[10%] w-full'>
                <div className='flex justify-center'>
                    <div className={key(forward)}>W</div>
                </div>
                <div className='flex gap-1 justify-center'>
                    <div className={key(left)}>A</div>
                    <div className={key(back)}>S</div>
                    <div className={key(right)}>D</div>
                </div>
                <div className='flex justify-center'>
                    <div className={space(jump)}>Space</div>
                </div>
            </div>
        </div>
    );
};