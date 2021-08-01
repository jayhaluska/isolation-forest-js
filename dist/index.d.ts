import { ITree } from './iTree';
export interface DataObject {
    [key: string]: number;
}
export declare class IsolationForest {
    trees: ITree[];
    X: DataObject[];
    private subsamplingSize;
    private numberOfTrees;
    private shuffleData;
    constructor(numberOfTrees?: number, subsamplingSize?: number);
    fit(X: DataObject[]): ITree[];
    scores(): number[];
    predict(X: DataObject[]): number[];
    private getSubsample;
}
