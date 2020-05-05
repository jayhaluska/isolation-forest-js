import { IsolationForest } from './index';
import { averagePathLength, EULER_MASCHERONI, harmonicNumber, ITree } from './iTree';

const testData = [
  { x: 0, y: 0 },
  { x: 1, y: 1 },
  { x: 9, y: 9 },
  { x: 10, y: 10 },
  { x: 6, y: 4 },
  { x: 6.5, y: 3.5 },
  { x: 5.09293, y: 5.26732 },
  { x: 4.87771, y: 4.59428 },
  { x: 5.09293, y: 5.26732 },
  { x: 5.11965, y: 5.29609 },
  { x: 5.08414, y: 5.00916 },
  { x: 5.0337, y: 4.96123 },
  { x: 4.75541, y: 4.54878 },
  { x: 4.91022, y: 5.12956 },
  { x: 4.90553, y: 5.08737 },
  { x: 4.90517, y: 5.19417 },
  { x: 4.92016, y: 4.95199 },
  { x: 4.83467, y: 5.04121 },
  { x: 5.13095, y: 4.74027 },
  { x: 4.96081, y: 5.33069 },
  { x: 5.06028, y: 4.5048 },
  { x: 4.88643, y: 4.64825 },
  { x: 5.19672, y: 4.58193 },
  { x: 4.82115, y: 5.00123 },
  { x: 4.8445, y: 5.29715 },
  { x: 5.25089, y: 5.03243 },
  { x: 5.08388, y: 4.87099 },
  { x: 5.06507, y: 4.98373 },
  { x: 4.72947, y: 5.02362 },
  { x: 5.25667, y: 5.32349 },
  { x: 4.76998, y: 4.33478 },
  { x: 5.08607, y: 5.13606 },
  { x: 5.19918, y: 5.47229 },
  { x: 5.04805, y: 5.14404 },
  { x: 5.37764, y: 4.84826 },
  { x: 5.07868, y: 4.8248 },
  { x: 4.95304, y: 5.05827 },
  { x: 4.96549, y: 4.77646 },
  { x: 5.08609, y: 5.01636 },
  { x: 4.82153, y: 5.01416 },
  { x: 5.18546, y: 4.74202 },
  { x: 5.00205, y: 4.93361 },
  { x: 4.91049, y: 4.87134 },
  { x: 4.66037, y: 4.95384 },
  { x: 5.17988, y: 5.14343 },
  { x: 4.97886, y: 4.96577 },
  { x: 5.07198, y: 4.97647 },
  { x: 5.15061, y: 4.9985 },
  { x: 4.99445, y: 5.00095 },
  { x: 5.37441, y: 4.77881 },
  { x: 4.86993, y: 5.47866 },
  { x: 5.07264, y: 5.15265 },
  { x: 5.03996, y: 4.74454 },
  { x: 5.10389, y: 5.36696 },
  { x: 5.18207, y: 4.71863 },
  { x: 4.92096, y: 5.15562 },
  { x: 5.21876, y: 4.91317 },
  { x: 4.5918, y: 4.99366 },
  { x: 5.14091, y: 4.80263 },
  { x: 5.01395, y: 5.02764 },
  { x: 5.26264, y: 4.57595 },
  { x: 4.72919, y: 4.90301 },
  { x: 5.05713, y: 4.8006 },
  { x: 5.21515, y: 4.94057 },
  { x: 4.77601, y: 4.77968 },
  { x: 5.47094, y: 4.95647 },
  { x: 4.96313, y: 5.25192 },
  { x: 5.17995, y: 5.55642 },
  { x: 4.9564, y: 5.21279 },
  { x: 5.09232, y: 5.16609 },
  { x: 5.03716, y: 5.02718 },
  { x: 5.21291, y: 4.78653 },
  { x: 5.15735, y: 4.96552 },
  { x: 4.68664, y: 4.77827 },
  { x: 5.38525, y: 4.99602 },
  { x: 4.65778, y: 5.20757 },
  { x: 4.97876, y: 5.22635 },
  { x: 4.84866, y: 5.36753 },
  { x: 4.99069, y: 5.29085 },
  { x: 4.72165, y: 4.91946 },
  { x: 4.42386, y: 4.6582 },
  { x: 5.09765, y: 4.90336 },
  { x: 5.38941, y: 5.0604 },
  { x: 5.435, y: 5.40231 },
  { x: 4.79473, y: 4.83491 },
  { x: 4.86015, y: 5.11407 },
  { x: 5.08449, y: 4.43947 },
  { x: 4.49819, y: 4.68155 },
  { x: 4.83322, y: 4.91597 },
  { x: 4.99414, y: 4.66051 },
  { x: 4.78818, y: 5.32719 },
  { x: 5.08315, y: 4.69518 },
  { x: 4.84742, y: 5.23106 },
  { x: 5.14417, y: 4.88326 },
  { x: 4.63349, y: 4.861 },
  { x: 5.1592, y: 4.73212 },
  { x: 4.7223, y: 5.08323 },
  { x: 4.73146, y: 4.52831 },
  { x: 4.88045, y: 4.98338 },
  { x: 4.57501, y: 4.32943 },
  { x: 4.71084, y: 5.04985 },
  { x: 4.91618, y: 5.35497 },
  { x: 5.17132, y: 4.64872 },
  { x: 4.89595, y: 5.08621 },
  { x: 4.94951, y: 4.8479 },
  { x: 5.05284, y: 4.68681 },
  { x: 5.28378, y: 5.28121 },
];

test('Empty ITree has size 0', () => {
  const tree = new ITree([], 5);
  expect(tree.size()).toBe(0);
});

test('Isolation Forest.fit(), default values', () => {
  const isfo = new IsolationForest();
  isfo.fit(testData);
  const scores = isfo.scores();

  const outlierIndices: number[] = [];
  const sosoIndices: number[] = [];
  const normalIndices: number[] = [];
  isfo.X.forEach((x, i) => {
    if (x.x >= 7 || x.y <= 3 || x.x <= 3 || x.y >= 7) {
      outlierIndices.push(i);
    } else if (x.x === 6 || x.x === 6.5 || x.y === 3.5 || x.y === 4) {
      sosoIndices.push(i);
    } else {
      normalIndices.push(i);
    }
  });

  outlierIndices.forEach(x => {
    expect(scores[x]).toBeGreaterThan(0.75);
  });

  sosoIndices.forEach(x => {
    expect(scores[x]).toBeLessThanOrEqual(0.75);
    expect(scores[x]).toBeGreaterThan(0.55);
  });

  normalIndices.forEach(x => {
    expect(scores[x]).toBeLessThanOrEqual(0.55);
  });
});

test('Isolation Forest.fit(), subsampling = 60', () => {
  const isfo = new IsolationForest(100, 60);
  isfo.fit(testData);
  const scores = isfo.scores();

  const outlierIndices: number[] = [];
  const sosoIndices: number[] = [];
  const normalIndices: number[] = [];
  isfo.X.forEach((x, i) => {
    if (x.x >= 7 || x.y <= 3 || x.x <= 3 || x.y >= 7) {
      outlierIndices.push(i);
    } else if (x.x === 6 || x.x === 6.5 || x.y === 3.5 || x.y === 4) {
      sosoIndices.push(i);
    } else {
      normalIndices.push(i);
    }
  });

  outlierIndices.forEach(x => {
    expect(scores[x]).toBeGreaterThan(0.75);
  });

  sosoIndices.forEach(x => {
    expect(scores[x]).toBeLessThanOrEqual(0.75);
    expect(scores[x]).toBeGreaterThan(0.55);
  });

  normalIndices.forEach(x => {
    expect(scores[x]).toBeLessThanOrEqual(0.55);
  });
});

test('averagePathLength(0)', () => {
  expect(averagePathLength(0)).toBe(0);
});

test('averagePathLength(1)', () => {
  expect(averagePathLength(1)).toBe(0);
});

test('averagePathLength(2)', () => {
  expect(averagePathLength(2)).toBe(1);
});

test('averagePathLength(3)', () => {
  expect(averagePathLength(3)).toBe(1.2073810277865575);
});

test('harmonicNumber(0)', () => {
  expect(harmonicNumber(0)).toBe(-Infinity);
});

test('harmonicNumber(1)', () => {
  expect(harmonicNumber(1)).toBe(EULER_MASCHERONI);
});
