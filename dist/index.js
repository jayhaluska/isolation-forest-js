"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ITree = /** @class */ (function () {
    function ITree(X, heightLimit) {
        this.rootNode = new TreeNode(X, 0, heightLimit);
    }
    ITree.prototype.pathLength = function (x, treeNode, currentPathLength) {
        if (treeNode.isExternalNode()) {
            return currentPathLength + averagePathLength(treeNode.size());
        }
        var splitAttr = treeNode.splitAttribute;
        if (x[splitAttr] < treeNode.splitValue) {
            return this.pathLength(x, treeNode.leftChild, currentPathLength + 1);
        }
        else {
            return this.pathLength(x, treeNode.rightChild, currentPathLength + 1);
        }
    };
    ITree.prototype.size = function () {
        return this.rootNode.size();
    };
    return ITree;
}());
exports.ITree = ITree;
var IsolationForest = /** @class */ (function () {
    function IsolationForest(numberOfTrees, subsamplingSize) {
        if (numberOfTrees === void 0) { numberOfTrees = 100; }
        if (subsamplingSize === void 0) { subsamplingSize = -1; }
        this.subsamplingSize = subsamplingSize;
        this.numberOfTrees = numberOfTrees;
        this.trees = [];
        this.X = [];
    }
    IsolationForest.prototype.fit = function (X) {
        this.X = X;
        var heightLimit = Math.ceil(Math.log2(this.subsamplingSize));
        if (this.subsamplingSize === -1) {
            this.subsamplingSize = this.X.length;
            heightLimit = Math.ceil(Math.log2(this.X.length));
        }
        for (var i = 0; i < this.numberOfTrees; i++) {
            //const subsample = this.getSubsample(i % this.subsamplingSize);
            var iTree = new ITree(this.X, heightLimit);
            this.trees.push(iTree);
        }
        return this.trees;
    };
    IsolationForest.prototype.getSubsample = function (offset) {
        var subsample = [];
        for (var i = 0 + offset; i < this.X.length; i + this.subsamplingSize) {
            subsample.push(this.X[i]);
        }
        return subsample;
    };
    IsolationForest.prototype.scores = function () {
        var scoreArray = [];
        for (var i = 0; i < this.X.length; i++) {
            var pathLength = 0;
            for (var j = 0; j < this.numberOfTrees; j++) {
                pathLength += this.trees[j].pathLength(this.X[i], this.trees[j].rootNode, 0);
            }
            var meanPathLength = pathLength / this.numberOfTrees;
            var score = Math.pow(2, -(meanPathLength / averagePathLength(this.X.length)));
            scoreArray.push(score);
        }
        return scoreArray;
    };
    return IsolationForest;
}());
exports.IsolationForest = IsolationForest;
var TreeNode = /** @class */ (function () {
    function TreeNode(X, height, heightLimit) {
        var _this = this;
        this.splitAttribute = undefined;
        this.splitValue = undefined;
        this.leftChild = undefined;
        this.rightChild = undefined;
        this.height = height;
        this.heightLimit = heightLimit;
        if (height >= heightLimit || X.length <= 1) {
            this.X = X;
            return this;
        }
        else {
            var attributes = getAttributes(X[0]);
            this.splitAttribute = attributes[Math.floor(Math.random() * attributes.length)];
            var attributeMax = Math.max.apply(Math, X.map(function (x) { return x[_this.splitAttribute]; }));
            var attributeMin = Math.min.apply(Math, X.map(function (x) { return x[_this.splitAttribute]; }));
            this.splitValue = Math.random() * (attributeMax - attributeMin) + attributeMin;
            var dataSplitA = X.filter(function (x) { return x[_this.splitAttribute] < _this.splitValue; });
            var dataSplitB = X.filter(function (x) { return x[_this.splitAttribute] >= _this.splitValue; });
            this.leftChild = new TreeNode(dataSplitA, height + 1, heightLimit);
            this.rightChild = new TreeNode(dataSplitB, height + 1, heightLimit);
            return this;
        }
    }
    TreeNode.prototype.isExternalNode = function () {
        return this.leftChild === undefined && this.rightChild === undefined;
    };
    TreeNode.prototype.isInternalNode = function () {
        return this.leftChild !== undefined && this.rightChild !== undefined;
    };
    TreeNode.prototype.size = function () {
        if (this.X !== undefined) {
            return this.X.length;
        }
    };
    return TreeNode;
}());
function getAttributes(dataObject) {
    return Object.keys(dataObject);
}
function averagePathLength(n) {
    return (2 * harmonicNumber(n - 1)) - (2 * (n - 1) / n);
}
exports.averagePathLength = averagePathLength;
exports.EULER_MASCHERONI = 0.57721;
function harmonicNumber(i) {
    return Math.log(i) + exports.EULER_MASCHERONI;
}
exports.harmonicNumber = harmonicNumber;
//# sourceMappingURL=index.js.map