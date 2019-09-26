import { averagePathLength, ITree } from './iTree';

const shuffle = require('knuth-shuffle').knuthShuffle;

export interface DataObject {
    [key: string]: number,
}

export class IsolationForest {

	public trees: ITree[];
	public X: DataObject[];

	private subsamplingSize: number;
	private numberOfTrees: number;
	private shuffleData: boolean;

	constructor (numberOfTrees: number = 100, subsamplingSize: number = -1, shuffleData: boolean = false) {
		this.subsamplingSize = subsamplingSize;
		this.numberOfTrees = numberOfTrees;
		this.trees = [];
		this.X = [];
		this.shuffleData = shuffleData;
	}

	public fit(X: DataObject[]): ITree[] {
		this.X = X;
		let heightLimit = Math.ceil(Math.log2(this.subsamplingSize));
		if (this.subsamplingSize === -1) {
			this.subsamplingSize = this.X.length;
			heightLimit = Math.ceil(Math.log2(this.X.length));
		}

		if (this.shuffleData) {
			// shuffle dataset
			this.X = shuffle(this.X);
		}

		for (let i = 0; i < this.numberOfTrees; i++) {
			const subsample = this.getSubsample((i * this.subsamplingSize) % this.X.length);

			const iTree: ITree = new ITree(this.X, heightLimit);
			this.trees.push(iTree);
		} 
		return this.trees;
	}

	public scores(): number[] {
		const scoreArray: number[] = [];
		for (const x of this.X) {
			let pathLength: number = 0;
			for (let j = 0; j < this.numberOfTrees; j++) {
				pathLength += this.trees[j].pathLength(x, this.trees[j].getRootNode(), 0);
			}
			const meanPathLength = pathLength / this.numberOfTrees;
			const score = Math.pow(2, -(meanPathLength / averagePathLength(this.X.length)));
			scoreArray.push(score);
		}
		return scoreArray;
	}

	private getSubsample(offset: number): DataObject[] {
		const subsample = [];
		for (let i = offset; i < offset + this.subsamplingSize; i++) {
			subsample.push(this.X[i]);
		}
		return subsample;
	}
}