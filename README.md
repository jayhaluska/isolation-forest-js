# Isolation Forest (JS / TS)
Isolation Forest for JavaScript / TypeScript.

Use it to efficiently detect anomalies in your dataset.

#### Install

```sh
$ npm install --save isolation-forest
```

#### Usage

```javascript
import { IsolationForest } from 'isolation-forest'

var isolationForest = new IsolationForest();
isolationForest.fit(data) // Type ObjectArray ({}[]); 

var scores = isolationForest.scores()
```

#### Parameters

`IsolationForest(numberOfTrees, subsamplingSize)` takes 2 optional paramaters.

**numberOfTrees**:
Amount of trees the forest should generate. Default is 100, because for most datasets the anomaly scores converges with less than 100 trees.

**subsamplingSize**:
 Size of used subsamples of the dataset during trainging phase. Helps avoiding common problems in anomaly detection (*swamping* and *masking*). Default is 256 or the dataset size, if smaller.

For more info, see [1].

#### Anomaly score

As stated in [1]:

If instances return a score **very close to 1**, then they are definitely **anomalies**.

If instances have a score much **smaller than 0.5**, then they are quite **safe to be regarded as normal instances**.

If **all** the instances return a **score ≈ 0.5**, then the entire sample **does not really have any distinct anomaly**.

#### Misc

Thank you for using my package. If you find bugs or have ideas to improve the package, open a PR on GitHub with your changes. I'll add the changes as soon as possible.


#### References

1. Liu, F. T., Ting, K. M., & Zhou, Z. H. (2008, December). Isolation forest. In Data Mining, 2008. ICDM’08. Eighth IEEE International Conference on (pp. 413–422). IEEE.

