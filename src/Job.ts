/**
 * Created by Dcalsky on 2017/5/21.
 */

import Page from './Page'
import MemoryBlock from './MemoryBlock'
import {JobElement} from './ViewModel'

export const PageLimit = 32

export default class Job {
    private space: Array<Page> = []
    private blocks: Array<MemoryBlock>
    public lackPageTime: number = 0
    public totalTime: number = 0
    private el: JobElement

    constructor(blocks: Array<MemoryBlock>, el: JobElement) {
        this.blocks = blocks
        this.el = el
        for (let i = 0; i < PageLimit; ++i) {
            this.space.push(new Page(i))
        }
        this.el.updateTotalTime(this.totalTime)
        this.el.updateLackTime(this.lackPageTime)
    }

    private storePage(id: number, page: Page) {
        let blockId: number
        for (let i = 0; i < this.blocks.length; ++i) {
            if (this.blocks[i].free) {
                blockId = i
                break
            }
        }
        if (!blockId) {
            blockId = this.getNRUMemory()
        }
        this.el.addMessage(id, null, blockId)
        this.blocks[blockId].replacePage(page)
    }

    private getNRUMemory(): number {
        let farthestDate = this.blocks[0].lastUpdate,
            NRUMemoryId = 0
        for (let i = 1; i < this.blocks.length; ++i) {
            const block = this.blocks[i]
            if (block.lastUpdate < farthestDate) {
                farthestDate = block.lastUpdate
                NRUMemoryId = i
            }
        }
        return NRUMemoryId
    }

    public visitInstruction(id: number): number {
        const page = this.space[Math.floor(id / 10)]
        this.totalTime += 1
        this.el.updateTotalTime(this.totalTime)
        for (let i = 0; i < this.blocks.length; ++i) {
            const block = this.blocks[i]
            const address = block.getAddress(id)
            if (address !== -1) {
                this.el.addMessage(id, address)
                return address
            }
        }
        // Lack page exception
        this.lackPageTime += 1
        this.storePage(id, page)
        this.el.updateLackTime(this.lackPageTime)
    }
}