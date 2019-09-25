export type DataObject = {
    [key: string]: number;
}

export class ITree {

	rootNode: TreeNode;

	constructor (X: DataObject[], heightLimit: number) {
		this.rootNode = new TreeNode(X, 0, heightLimit);
	}

	pathLength (x: DataObject, treeNode: TreeNode, currentPathLength: number): number {
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

	size(): number {
		return this.rootNode.size();
	}
}

export class IsolationForest {

	trees: ITree[];
	X: DataObject[];
	subsamplingSize: number;
	numberOfTrees: number;

	constructor (numberOfTrees: number = 100, subsamplingSize: number = -1) {
		this.subsamplingSize = subsamplingSize;
		this.numberOfTrees = numberOfTrees;
		this.trees = [];
		this.X = [];
	}

	fit(X: DataObject[]): ITree[] {
		this.X = X;
		let heightLimit = Math.ceil(Math.log2(this.subsamplingSize));
		if (this.subsamplingSize === -1) {
			this.subsamplingSize = this.X.length;
			heightLimit = Math.ceil(Math.log2(this.X.length));
		}

		for (let i = 0; i < this.numberOfTrees; i++) {
			//const subsample = this.getSubsample(i % this.subsamplingSize);

			let iTree: ITree = new ITree(this.X, heightLimit);
			this.trees.push(iTree);
		} 
		return this.trees;
	}

	getSubsample(offset: number): DataObject[] {
		const subsample = [];
		for (let i = 0 + offset; i < this.X.length; i + this.subsamplingSize) {
			subsample.push(this.X[i]);
		}
		return subsample;
	}

	scores(): number[] {
		let scoreArray: number[] = [];
		for (let i = 0; i < this.X.length; i++) {
			let pathLength: number = 0;
			for (let j = 0; j < this.numberOfTrees; j++) {
				pathLength += this.trees[j].pathLength(this.X[i], this.trees[j].rootNode, 0);
			}
			let meanPathLength = pathLength / this.numberOfTrees;

			const score = Math.pow(2, -(meanPathLength/averagePathLength(this.X.length)));
			scoreArray.push(score);
		}
		return scoreArray;
	}

}

class TreeNode {

	X: DataObject[];
	splitAttribute: string = undefined;
	splitValue: number = undefined;
	height: number;
	heightLimit: number;
	leftChild: TreeNode = undefined;
	rightChild: TreeNode = undefined;

	constructor (X: DataObject[], height: number, heightLimit: number) {
		this.height = height;
		this.heightLimit = heightLimit;
		if (height >= heightLimit || X.length <= 1) {
			this.X = X;
			return this;
		}
		else {
			let attributes = getAttributes(X[0]);
			this.splitAttribute = attributes[Math.floor(Math.random() * attributes.length)];
			const attributeMax = Math.max.apply(Math, X.map((x) => { return x[this.splitAttribute]; }));
			const attributeMin = Math.min.apply(Math, X.map((x) => { return x[this.splitAttribute]; }));
			this.splitValue = Math.random() * (attributeMax - attributeMin) + attributeMin;
			const dataSplitA = X.filter((x) => x[this.splitAttribute] < this.splitValue);
			const dataSplitB = X.filter((x) => x[this.splitAttribute] >= this.splitValue);
			this.leftChild = new TreeNode(dataSplitA, height + 1, heightLimit);
			this.rightChild = new TreeNode(dataSplitB, height + 1, heightLimit);
			return this;
		}
	}

	isExternalNode(): boolean {
		return this.leftChild === undefined && this.rightChild === undefined;
	}

	isInternalNode(): boolean {
		return this.leftChild !== undefined && this.rightChild !== undefined;
	}

	size(): number {
		if (this.X !== undefined) {
			return this.X.length;
		}
	}
}

function getAttributes (dataObject: DataObject): string[] {
	return Object.keys(dataObject);
}

export function averagePathLength(n: number) {
	return (2 * harmonicNumber(n-1)) - (2*(n-1)/n);
}

export const EULER_MASCHERONI =  0.57721;

export function harmonicNumber(i: number): number {
	return Math.log(i) + EULER_MASCHERONI;
}