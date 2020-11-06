import { DataObject } from './index';
import { TreeNode } from './treeNode';
export declare class ITree {
    private rootNode;
    constructor(X: DataObject[], heightLimit: number);
    pathLength(x: DataObject, treeNode: TreeNode, currentPathLength: number): number;
    size(): number;
    getRootNode(): TreeNode;
}
export declare function averagePathLength(n: number): number;
export declare const EULER_MASCHERONI = 0.57721;
export declare function harmonicNumber(i: number): number;
