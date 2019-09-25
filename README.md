# Isolation Forest (JS / TS)
Isolation Forest for JavaScript / TypeScript.

Use it to efficiently detect anomalies in your dataset.

## Install

```sh
$ npm install --save isolation-forest
```

## Usage

```javascript
import { IsolationForest } from 'isolation-forest-js'

var isolationForest = new IsolationForest();
isolationForest.fit(data) // Type ObjectArray ({}[]); 

var scores = isolationForest.scores()
```

## Anomaly score

As stated in [1]:

If instances return a score very **close to 1**, then they are definitely **anomalies**.

If instances have a score much **smaller than 0.5**, then they are quite **safe to be regarded as normal instances**.

If all the instances return a **score ≈ 0.5**, then the entire sample **does not really have any distinct anomaly**.


## References

1. Liu, F. T., Ting, K. M., & Zhou, Z. H. (2008, December). Isolation forest. In Data Mining, 2008. ICDM’08. Eighth IEEE International Conference on (pp. 413–422). IEEE.

