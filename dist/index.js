"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsolationForest = void 0;
var iTree_1 = require("./iTree");
var shuffle = require('knuth-shuffle').knuthShuffle;
var IsolationForest = /** @class */ (function () {
    function IsolationForest(numberOfTrees, subsamplingSize) {
        if (numberOfTrees === void 0) { numberOfTrees = 100; }
        if (subsamplingSize === void 0) { subsamplingSize = 256; }
        this.subsamplingSize = subsamplingSize;
        this.numberOfTrees = numberOfTrees;
        this.trees = [];
        this.X = [];
    }
    IsolationForest.prototype.fit = function (X) {
        this.X = X;
        if (this.X.length < this.subsamplingSize) {
            this.subsamplingSize = this.X.length;
        }
        var heightLimit = Math.ceil(Math.log2(this.subsamplingSize));
        for (var i = 0; i < this.numberOfTrees; i++) {
            var subsample = this.getSubsample(this.subsamplingSize);
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
            var score = Math.pow(2, -(meanPathLength / iTree_1.averagePathLength(this.subsamplingSize)));
            scoreArray.push(score);
        }
        return scoreArray;
    };
    IsolationForest.prototype.predict = function (X) {
        var scoreArray = [];
        for (var _i = 0, X_1 = X; _i < X_1.length; _i++) {
            var x = X_1[_i];
            var pathLength = 0;
            for (var j = 0; j < this.numberOfTrees; j++) {
                pathLength += this.trees[j].pathLength(x, this.trees[j].getRootNode(), 0);
            }
            var meanPathLength = pathLength / this.numberOfTrees;
            var score = Math.pow(2, -(meanPathLength / iTree_1.averagePathLength(this.subsamplingSize)));
            scoreArray.push(score);
        }
        return scoreArray;
    };
    IsolationForest.prototype.getSubsample = function (subsampleSize) {
        var subsample = [];
        var data = shuffle(this.X.slice(0));
        return data.slice(0, subsampleSize);
    };
    return IsolationForest;
}());
exports.IsolationForest = IsolationForest;
//# sourceMappingURL=index.js.map