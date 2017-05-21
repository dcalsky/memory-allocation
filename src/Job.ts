/**
 * Created by Dcalsky on 2017/5/21.
 */

import Page from './Page'
import MemoryBlock from './MemoryBlock'

const PageLimit = 32

export default class Job {
    private space: Array<Page>
    private blocks: Array<MemoryBlock>
    public lackPageTime: number = 0
    public totalTime = 0
    constructor(blocks: Array<MemoryBlock>) {
        this.blocks = blocks
        for (let i = 0; i < PageLimit; ++i) {
            this.space.push(new Page(i))
        }
    }
    private storePage(page: Page) {
        let block: MemoryBlock
        for (let i = 0; i < this.blocks.length; ++i) {
            if (this.blocks[i].free) {
                block = this.blocks[i]
                break
            }
        }
        if (!block) {
            block = this.getNRUMemory()
        }
        block.replacePage(page)
    }
    private getNRUMemory(): MemoryBlock {
        let farthestDate = this.blocks[0].lastUpdate,
            NRUMemory = this.blocks[0]
        for (let i = 1; i < this.blocks.length; ++i) {
            const block = this.blocks[i]
            if (block.lastUpdate > farthestDate) {
                farthestDate = block.lastUpdate
                NRUMemory = block
            }
        }
        return NRUMemory
    }
    public visitInstrction(id: number): number {
        const page = this.space[id / 10]
        this.totalTime += 1
        for (let i = 0; i < this.blocks.length; ++i) {
            const block = this.blocks[i]
            const address = block.getAddress(id)
            if (address !== -1) {
                return address
            }
        }
        // Lack page exception
        this.lackPageTime += 1
        this.storePage(page)
    }
}