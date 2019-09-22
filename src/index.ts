export type DataObject = {
    [key: string]: number;
}

export class ITree {

	rootNode: TreeNode;
	size: number;

	constructor (X: DataObject[], heightLimit: number) {
		this.rootNode = new TreeNode(X, 0, heightLimit);
		this.size = X.length;
	}

	pathLength (x: DataObject, treeNode: TreeNode, currentPathLength: number): number {
		if (treeNode.isExternalNode()) {
			return currentPathLength + averagePathLength(this.size);
		}
		const splitAttr: string = treeNode.splitAttribute;
		if (x[splitAttr] < treeNode.splitValue) {
			return this.pathLength(x, treeNode.leftChild, currentPathLength+1);
		}
		else {
			return this.pathLength(x, treeNode.rightChild, currentPathLength+1);
		}
	}
}

export class IsolationForest {

	trees: ITree[];
	X: {}[];
	subsamplingSize: number;
	numberOfTrees: number;

	constructor (subsamplingSize: number = -1, numberOfTrees: number = 100) {
		this.subsamplingSize = subsamplingSize;
		this.numberOfTrees = numberOfTrees;
		this.trees = [];
		this.X = [];
	}

	fit(X: DataObject[]): ITree[] {
		this.X = X;
		if (this.subsamplingSize === -1) {
			this.subsamplingSize = this.X.length;
		}

		const heightLimit = Math.ceil(Math.log2(this.subsamplingSize));
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
			let score: number = 0;
			for (let j = 0; j < this.numberOfTrees; j++) {
				score += this.trees[j].pathLength(this.X[i], this.trees[j].rootNode, 0);
			}
			score /= this.numberOfTrees;
			console.log(score);
			scoreArray.push(score);
		}
		return scoreArray;
	}

}

class TreeNode {

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
			return this;
		}
		else {
			let attributes = getAttributes(X[0]);
			this.splitAttribute = attributes[Math.floor(Math.random() * attributes.length)];
			const attributeMax = Math.max.apply(Math, X.map((x) => { return x[this.splitAttribute]; }));
			const attributeMin = Math.min.apply(Math, X.map((x) => { return x[this.splitAttribute]; }));
			this.splitValue = Math.random() * (attributeMax - attributeMin) + attributeMin;;
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
}

function getAttributes (dataObject: {}): string[] {
	return Object.keys(dataObject);
}

function averagePathLength(n: number) {
	return (2 * harmonicNumber(n-1)) - (2*(n-1)/n);

}

function harmonicNumber(i: number): number {
	return Math.log2(i) + Math.E;
}