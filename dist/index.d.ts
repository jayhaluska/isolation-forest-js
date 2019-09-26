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
    constructor(numberOfTrees?: number, subsamplingSize?: number, shuffleData?: boolean);
    fit(X: DataObject[]): ITree[];
    scores(): number[];
    private getSubsample;
}
