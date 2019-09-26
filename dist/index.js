"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var iTree_1 = require("./iTree");
var shuffle = require('knuth-shuffle').knuthShuffle;
var IsolationForest = /** @class */ (function () {
    function IsolationForest(numberOfTrees, subsamplingSize, shuffleData) {
        if (numberOfTrees === void 0) { numberOfTrees = 100; }
        if (subsamplingSize === void 0) { subsamplingSize = -1; }
        if (shuffleData === void 0) { shuffleData = false; }
        this.subsamplingSize = subsamplingSize;
        this.numberOfTrees = numberOfTrees;
        this.trees = [];
        this.X = [];
        this.shuffleData = shuffleData;
    }
    IsolationForest.prototype.fit = function (X) {
        this.X = X;
        var heightLimit = Math.ceil(Math.log2(this.subsamplingSize));
        if (this.subsamplingSize === -1) {
            this.subsamplingSize = this.X.length;
            heightLimit = Math.ceil(Math.log2(this.X.length));
        }
        if (this.shuffleData) {
            // shuffle dataset
            this.X = shuffle(this.X);
        }
        for (var i = 0; i < this.numberOfTrees; i++) {
            var subsample = this.getSubsample((i * this.subsamplingSize) % this.X.length);
            var iTree = new iTree_1.ITree(this.X, heightLimit);
            this.trees.push(iTree);
        }
        return this.trees;
    };
    IsolationForest.prototype.scores = function () {
        var scoreArray = [];
        for (var _i = 0, _a = this.X; _i < _a.length; _i++) {
            var x = _a[_i];
            var pathLength = 0;
            for (var j = 0; j < this.numberOfTrees; j++) {
                pathLength += this.trees[j].pathLength(x, this.trees[j].getRootNode(), 0);
            }
            var meanPathLength = pathLength / this.numberOfTrees;
            var score = Math.pow(2, -(meanPathLength / iTree_1.averagePathLength(this.X.length)));
            scoreArray.push(score);
        }
        return scoreArray;
    };
    IsolationForest.prototype.getSubsample = function (offset) {
        var subsample = [];
        for (var i = offset; i < offset + this.subsamplingSize; i++) {
            subsample.push(this.X[i]);
        }
        return subsample;
    };
    return IsolationForest;
}());
exports.IsolationForest = IsolationForest;
//# sourceMappingURL=index.js.map