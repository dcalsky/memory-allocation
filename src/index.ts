/**
 * Created by Dcalsky on 2017/5/21.
 */

import MemoryBlock from './MemoryBlock'
import Job from './Job'

const MemoryBlockUpperLimit = 4
const initialAddress = 100

// Create Memory blocks
const memoryBlocks = []
for (let i = 0; i < MemoryBlockUpperLimit; ++i) {
    memoryBlocks.push(new MemoryBlock(initialAddress + i * 80))
}

// Create Job
const job = new Job(memoryBlocks)

// Bind job to UI
