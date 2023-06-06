"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class History {
    constructor() {
        this.buffer = [];
    }
    add(blocks) {
        const existingIndex = this.buffer.findIndex((historicBlocks) => {
            if (blocks.length !== historicBlocks.length)
                return false;
            return historicBlocks.every((historicBlock, index) => historicBlock === blocks[index]);
        });
        // Remove it from this.buffer so we can move it to the top
        if (existingIndex > 0) {
            this.buffer.splice(existingIndex, 1);
        }
        // Add to the this.buffer
        if (existingIndex !== 0) {
            if (this.buffer.length >= this.bufferLimit) {
                this.buffer.pop();
            }
            this.buffer.unshift(blocks);
        }
    }
    get() {
        return this.buffer;
    }
    clear() {
        this.buffer = [];
    }
    setBufferLimit(bufferLimit) {
        this.bufferLimit = bufferLimit;
        this.buffer = this.buffer.slice(0, bufferLimit);
    }
}
exports.default = History;
//# sourceMappingURL=History.js.map