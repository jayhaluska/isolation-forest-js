import { DataObject } from './index';
import { TreeNode } from './treeNode';

export class ITree {

	private rootNode: TreeNode;

	constructor (X: DataObject[], heightLimit: number) {
		this.rootNode = new TreeNode(X, 0, heightLimit);
	}

	public pathLength (x: DataObject, treeNode: TreeNode, currentPathLength: number): number {
		if (treeNode.isExternalNode()) {
			return currentPathLength + averagePathLength(treeNode.size());
		}
		const splitAttr: string = treeNode.splitAttribute;
		if (x[splitAttr] < treeNode.splitValue) {
			return this.pathLength(x, treeNode.leftChild, currentPathLength+1);
		}
		else {
			return this.pathLength(x, treeNode.rightChild, currentPathLength+1);
		}
	}

	public size(): number {
		return this.rootNode.size();
    }
    
    public getRootNode(): TreeNode {
        return this.rootNode;
    }
}

export function averagePathLength(n: number) {
	if (n === 0 || n === 1) {
		return 0;
	}
	return (2 * harmonicNumber(n-1)) - (2*(n-1)/n);
}

export const EULER_MASCHERONI =  0.57721;

export function harmonicNumber(i: number): number {
	return Math.log(i) + EULER_MASCHERONI;
}