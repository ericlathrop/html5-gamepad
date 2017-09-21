declare class SingleGamepad {
    gamepad: Gamepad
    constructor(gp: Gamepad)
    axis(name: string): number
    button(name: string): boolean
}

export = SingleGamepad