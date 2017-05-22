/**
 * Created by Dcalsky on 2017/5/21.
 */

import MemoryBlock from './MemoryBlock'
import Job, {PageLimit} from './Job'
import {JobElement, BlockElement} from './ViewModel'
import * as $ from 'jquery'

// Constant declare
const MemoryBlockUpperLimit = 4
const initialAddress = 100
const totalInstructions = PageLimit * 10

// Create Memory blocks
const memoryBlocks: Array<MemoryBlock> = []
for (let i = 0; i < MemoryBlockUpperLimit; ++i) {
    memoryBlocks.push(new MemoryBlock(initialAddress + i * 80, new BlockElement(i)))
}

// Create Job
const job = new Job(memoryBlocks, new JobElement())

// Create instruction list
const instructions: Array<number> = []
for (let i = 0; i < totalInstructions; ++i) {
    instructions.push(i)
}

// React UI event
const $visitBtn = $('#visit')
const $freeBtn = $('#free')
const $idInput = $('#instruct')
$freeBtn.click(() => {
    memoryBlocks.forEach(block => {
        block.freePage()
    })
})
$visitBtn.click(() => {
    const id = parseInt($idInput.val())
    if (id >= totalInstructions || id < 0) {
        alert('错误的指令编号')
        return
    }
    job.visitInstruction(id)
})

// Random visiting instructions
// todo: update random algorithm
let time = 0
const timer = setInterval(() => {
    if (time >= totalInstructions) clearInterval(timer)
    const m = getRandomNumber(0, totalInstructions - 1)
    job.visitInstruction(m)
    time ++
}, 200)

// Utils functions
function getRandomNumber(start: number, end: number): number {
    return start + Math.floor(Math.random() * (end - start))
}

