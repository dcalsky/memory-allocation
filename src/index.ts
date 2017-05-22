/**
 * Created by Dcalsky on 2017/5/21.
 */

import MemoryBlock from './MemoryBlock'
import Job, {PageLimit} from './Job'
import {JobElement, BlockElement} from './ViewModel'
import * as $ from 'jquery'
import {last} from "rxjs/operator/last";

// Constant declare
const MemoryBlockUpperLimit = 4
const initialAddress = 100
const totalInstructions = PageLimit * 10
const instructionDelay = 200

// Create Memory blocks
const memoryBlocks: Array<MemoryBlock> = []
for (let i = 0; i < MemoryBlockUpperLimit; ++i) {
    memoryBlocks.push(new MemoryBlock(initialAddress + i * 80, new BlockElement(i)))
}

// Create Job
let job = new Job(memoryBlocks, new JobElement())

// Create instruction list
const instructions: Array<number> = []
for (let i = 0; i < totalInstructions; ++i) {
    instructions.push(i)
}

// React UI event
const $visitBtn = $('#visit')
const $freeBtn = $('#free')
const $idInput = $('#instruct')
const $auto = $('#auto')
let autoLock = false

// Free memory of all memory blocks
$freeBtn.click(() => {
    memoryBlocks.forEach(block => {
        block.freePage()
    })
})

// Visiting instruction by manually
$visitBtn.click(() => {
    const id = parseInt($idInput.val())
    if (id >= totalInstructions || id < 0 || (id !== 0 && !id )) {
        alert('错误的指令编号')
        return
    }
    job.visitInstruction(id)
})

// Visiting instructions automatically
$auto.click(() => {
    if (autoLock) return
    let time = 0, m = getRandomNumber(0, totalInstructions - 1)
    job =  new Job(memoryBlocks, new JobElement())
    autoLock = true
    $auto.addClass('active')
    const timer = setInterval(() => {
        if (time >= totalInstructions) {
            const lackTime = parseInt($('#lacktime').text())
            clearInterval(timer)
            autoLock = false
            $auto.remove('active')
            alert(`Rate of missing page: ${ lackTime / time }`)
            return
        }
        job.visitInstruction(m)
        time ++
        job.visitInstruction(m + 1)
        time ++
        m = getRandomNumber(0, m - 1)
        job.visitInstruction(m)
        time ++
        job.visitInstruction(m + 1)
        time ++
        m = getRandomNumber(m + 2, totalInstructions - 1)
    }, instructionDelay)

})

// Utils functions
function getRandomNumber(start: number, end: number): number {
    return start + Math.floor(Math.random() * (end - start))
}

