"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TreeNode = /** @class */ (function () {
    function TreeNode(X, height, heightLimit) {
        var _this = this;
        this.leftChild = undefined;
        this.rightChild = undefined;
        this.splitAttribute = undefined;
        this.splitValue = undefined;
        this.height = height;
        this.heightLimit = heightLimit;
        if (height >= heightLimit || X.length <= 1) {
            this.X = X;
            return this;
        }
        else {
            var attributes = this.getAttributes(X[0]);
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
    TreeNode.prototype.getAttributes = function (x) {
        return Object.keys(x);
    };
    return TreeNode;
}());
exports.TreeNode = TreeNode;
//# sourceMappingURL=treeNode.js.map