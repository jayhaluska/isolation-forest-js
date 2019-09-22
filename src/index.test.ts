import { ITree, IsolationForest } from './index'

test('Empty ITree has size 0', () => {
	const tree = new ITree([], 5);
	expect(tree.size).toBe(0);
});

test('Isolation Forest.fit()', () => {
	const testData = [
		{'a': 2, 'b': 3},
		{'a': 2, 'b': 3},
		{'a': 2, 'b': 3},
		{'a': 2, 'b': 3},
		{'a': 2, 'b': 3},
		{'a': 2, 'b': 3},
		{'a': 2, 'b': 3},
		{'a': 2, 'b': 3}
	];
	const isfo = new IsolationForest(2, 2);
	isfo.fit(testData);
	const val = isfo.scores();
	console.log(isfo.trees[0]);
	expect(3).toBe(5);
});