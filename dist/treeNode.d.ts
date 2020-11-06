import { DataObject } from './index';
export declare class TreeNode {
    leftChild: TreeNode;
    rightChild: TreeNode;
    splitAttribute: string;
    splitValue: number;
    private X;
    private height;
    private heightLimit;
    private max;
    private min;
    constructor(X: DataObject[], height: number, heightLimit: number);
    isExternalNode(): boolean;
    isInternalNode(): boolean;
    size(): number;
    private getAttributes;
}
