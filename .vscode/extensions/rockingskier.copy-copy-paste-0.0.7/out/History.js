"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class History {
    constructor(storage) {
        var _a;
        this.storage = storage;
        this.bufferLimit = 25;
        this.buffer = ((_a = this.storage) === null || _a === void 0 ? void 0 : _a.get("history")) || [];
    }
    add(blocks) {
        var _a;
        const existingIndex = this.buffer.findIndex((historicBlocks) => {
            if (blocks.length !== historicBlocks.length) {
                return false;
            }
            return historicBlocks.every((historicBlock, index) => historicBlock === blocks[index]);
        });
        // Remove it from this.buffer so we can move it to the top
        if (existingIndex > 0) {
            this.buffer.splice(existingIndex, 1);
        }
        // Add to the this.buffer
        if (existingIndex !== 0) {
            // index === 0 means it is already at the top
            if (this.buffer.length >= this.bufferLimit) {
                this.buffer.pop();
            }
            this.buffer.unshift(blocks);
        }
        (_a = this.storage) === null || _a === void 0 ? void 0 : _a.update("history", this.buffer);
    }
    get() {
        return this.buffer;
    }
    clear() {
        var _a;
        this.buffer = [];
        (_a = this.storage) === null || _a === void 0 ? void 0 : _a.update("history", this.buffer);
    }
    setBufferLimit(bufferLimit) {
        var _a;
        this.bufferLimit = bufferLimit;
        this.buffer = this.buffer.slice(0, bufferLimit);
        (_a = this.storage) === null || _a === void 0 ? void 0 : _a.update("history", this.buffer);
    }
}
exports.default = History;
//# sourceMappingURL=History.js.map