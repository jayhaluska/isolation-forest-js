export declare type DataObject = {
    [key: string]: number;
};
export declare class ITree {
    rootNode: TreeNode;
    constructor(X: DataObject[], heightLimit: number);
    pathLength(x: DataObject, treeNode: TreeNode, currentPathLength: number): number;
    size(): number;
}
export declare class IsolationForest {
    trees: ITree[];
    X: DataObject[];
    subsamplingSize: number;
    numberOfTrees: number;
    constructor(numberOfTrees?: number, subsamplingSize?: number);
    fit(X: DataObject[]): ITree[];
    getSubsample(offset: number): DataObject[];
    scores(): number[];
}
declare class TreeNode {
    X: DataObject[];
    splitAttribute: string;
    splitValue: number;
    height: number;
    heightLimit: number;
    leftChild: TreeNode;
    rightChild: TreeNode;
    constructor(X: DataObject[], height: number, heightLimit: number);
    isExternalNode(): boolean;
    isInternalNode(): boolean;
    size(): number;
}
export declare function averagePathLength(n: number): number;
export declare const EULER_MASCHERONI = 0.57721;
export declare function harmonicNumber(i: number): number;
export {};
