import {create} from 'zustand'
import {subscribeWithSelector} from 'zustand/middleware'

type GameStoreType = {
    blocksCount: number
    phase: 'ready' | 'playing' | 'ended'
    start: () => void
    restart: () => void
    end: () => void
    miliSec: number
    sec: number
    timer: () => void
    resetTimer: () => void
}

export const useGameStore = create(subscribeWithSelector<GameStoreType>((setState) => {
    return {
        blocksCount: 10,
        phase: 'ready',
        miliSec: 0,
        sec: 0,
        start: () => setState((state) => ({phase: 'playing'})),
        restart: () => setState((state) => ({phase: 'ready'})),
        end: () => setState((state) => ({phase: 'ended'})),
        timer: () => setState(state => {
            if (state.miliSec >= 90) {
                return {
                    miliSec: 0,
                    sec: state.sec + 1
                }
            }

            return {
                sec: state.sec,
                miliSec: state.miliSec + 10,
            }
        }),
        resetTimer: () => setState(state => {
            return {
                miliSec: 0,
                sec: 0
            }
        })
    }
}))