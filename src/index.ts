export class IsolationForest {

	trees: iTree[];
	X: {}[];
	subsamplingSize: number;
	numberOfTrees: number;

	constructor (subsamplingSize: number = -1, numberOfTrees: number = 100) {
		this.subsamplingSize = subsamplingSize;
		this.numberOfTrees = numberOfTrees;
		this.trees = [];
		this.X = null;
	}

	fit(X: {}[]): iTree[] {
		if (this.subsamplingSize === -1) {
			this.subsamplingSize = X.length;
		}

		const heightLimit = Math.ceil(Math.log2(subsamplingSize));
		for (let i = 0; i < numberOfTrees; i++) {
			const subsample = getSubsample(i % subsamplingSize);
			let iTree = new iTree(X, heightLimit);
			this.trees.push(iTree);
		} 
		return this.trees;
	}

	getSubsample(offset: number): {}[] {
		const subsample = [];	
		for (let i = 0 + offset; i + this.subsamplingSize) {
			subsample.push(this.X[i]);
		} 
		return subsample;
	}

	scores(): number[] {
		let scoreArray = [];
		for (let i = 0; i < X.length; i++) {
			let score = 0;
			for (let j = 0; j < this.numberOfTrees; j++) {
				score += this.trees[j].pathLength(this.X[i]);
			}
			score /= this.numberOfTrees;
			scoreArray.push[score];
		}
		return scoreArray;
	}

}

class iTree {

	rootNode: TreeNode;
	size: number;

	constructor (X: {}[], heightLimit: number) {
		rootNode = new TreeNode(X, 0, heightLimit);
		size = X.length;
	}

	pathLength (x: {}, treeNode: TreeNode, currentPathLength: number): number {
		if (treeNode.isExternalNode()) {
			return currentPathLength + averagePathLength(this.size);
		}
		const splitAttr = treeNode.splitAttribute;
		if (x[splitAttr] < treeNode.splitValue) {
			return this.pathLength(x. treeNode.leftChild, e+1);
		}
		else {
			return this.pathLength(x, treeNode.rightChild, e+1);
		}
	}
}

class TreeNode {

	splitAttribute: string;
	splitValue = number;
	height: number;
	heightLimit: number;
	leftChild: TreeNode;
	rightChild: TreeNode;

	constructor (X: {}[], height: number, heightLimit: number) {
		this.height = height;
		this.heightLimit = heightLimit;
		if (height >= heightLimit || X.length <= 1) {
			return this;
		}
		else {
			let attributes = getAttributes(X[0]);
			splitAttribute = attributes[Math.floor(Math.random() * attributes.length)];
			const attributeMax = Math.max.apply(Math, X.map(function(x) => { return x[splitAttribute]; }));
			const attributeMin = Math.min.apply(Math, X.map(function(x) => { return x[splitAttribute]; }));
			splitValue = Math.random() * (attributeMax - attributeMin) + attributeMin;;
			const dataSplitA = X.filter((x) => x[attributeSplit] < splitValue);
			const dataSplitB = X.filter((x) => x[attributeSplit] >= splitValue);
			leftChild = new TreeNode(dataSplitA, height + 1, heightLimit);
			rightChild = new TreeNode(dataSplitB, height + 1, heightLimit);
			return this;
		}
	}

	isExternalNode(): boolean {
		return leftChild === null && rightChild === null;
	}

	isInternalNode(): boolean {
		return leftChild !== null && rightChild !== null;
	}
}

function getAttributes (dataObject: {}) : [] {
	return Object.keys(dataObject);
}

function averagePathLength(n: number) {
	return (2 * harmonicNumber(n-1)) - (2*(n-1)/n);

}

function harmonicNumber(i: number): number {
	return Math.log2(i) + Math.E;
}