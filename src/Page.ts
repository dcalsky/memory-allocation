/**
 * Created by Dcalsky on 2017/5/21.
 */

const InstructionLimit = 10

class Instruction {
    id: number
    constructor(id: number) {
        this.id = id
    }
}

export default class Page {
    public id: number
    public instructions: Array<Instruction> = []

    constructor(offset: number) {
        this.id = offset
        for (let i = 0; i < InstructionLimit; ++i) {
            this.instructions.push(new Instruction(offset * InstructionLimit + i))
        }
    }
    public getInstructionOrder(id: number): number {
        for (let i = 0; i < this.instructions.length; ++i) {
            const instruct = this.instructions[i]
            if (instruct.id === id) {
                return i
            }
        }
        return -1
    }

}
