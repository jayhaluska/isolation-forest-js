"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var treeNode_1 = require("./treeNode");
var ITree = /** @class */ (function () {
    function ITree(X, heightLimit) {
        this.rootNode = new treeNode_1.TreeNode(X, 0, heightLimit);
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
    ITree.prototype.getRootNode = function () {
        return this.rootNode;
    };
    return ITree;
}());
exports.ITree = ITree;
function averagePathLength(n) {
    if (n === 0 || n === 1) {
        return 0;
    }
    return (2 * harmonicNumber(n - 1)) - (2 * (n - 1) / n);
}
exports.averagePathLength = averagePathLength;
exports.EULER_MASCHERONI = 0.57721;
function harmonicNumber(i) {
    return Math.log(i) + exports.EULER_MASCHERONI;
}
exports.harmonicNumber = harmonicNumber;
//# sourceMappingURL=iTree.js.map