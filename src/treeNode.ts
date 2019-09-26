import { DataObject } from './index';

export class TreeNode {

	public leftChild: TreeNode = undefined;
    public rightChild: TreeNode = undefined;
    public splitAttribute: string = undefined;
	public splitValue: number = undefined;

	private X: DataObject[];
	private height: number;
	private heightLimit: number;

	constructor (X: DataObject[], height: number, heightLimit: number) {
		this.height = height;
		this.heightLimit = heightLimit;
		if (height >= heightLimit || X.length <= 1) {
			this.X = X;
			return this;
		}
		else {
			const attributes = this.getAttributes(X[0]);
			this.splitAttribute = attributes[Math.floor(Math.random() * attributes.length)];
			const attributeMax = Math.max.apply(Math, X.map((x) => x[this.splitAttribute]));
			const attributeMin = Math.min.apply(Math, X.map((x) => x[this.splitAttribute]));
			this.splitValue = Math.random() * (attributeMax - attributeMin) + attributeMin;
			const dataSplitA = X.filter((x) => x[this.splitAttribute] < this.splitValue);
			const dataSplitB = X.filter((x) => x[this.splitAttribute] >= this.splitValue);
			this.leftChild = new TreeNode(dataSplitA, height + 1, heightLimit);
			this.rightChild = new TreeNode(dataSplitB, height + 1, heightLimit);
			return this;
		}
	}

	public isExternalNode(): boolean {
		return this.leftChild === undefined && this.rightChild === undefined;
	}

	public isInternalNode(): boolean {
		return this.leftChild !== undefined && this.rightChild !== undefined;
	}

	public size(): number {
		if (this.X !== undefined) {
			return this.X.length;
		}
    }
    
    private getAttributes(x: DataObject): string[] {
		return Object.keys(x);
	}
}