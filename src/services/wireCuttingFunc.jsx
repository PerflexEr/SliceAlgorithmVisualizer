function cut(n, prices) {
    let results = Array(n + 1).fill(0);
    let cuts = Array(n + 1).fill(0);

    for (let j = 1; j <= n; j++) {
        let max_val = 0;
        for (let i = 1; i <= j; i++) {
            if (prices[i - 1] !== undefined && max_val < prices[i - 1] + results[j - i]) {
                max_val = prices[i - 1] + results[j - i];
                cuts[j] = i;
            }
        }
        results[j] = max_val;
    }

    let lengths = [];
    while (n > 0) {
        lengths.push(cuts[n]);
        n = n - cuts[n];
    }

    let decisionTree = buildDecisionTree(lengths);

    return { maxProfit: results[results.length - 1], lengths: lengths, decisionTree: decisionTree };
}

function buildDecisionTree(lengths) {
    if (lengths.length === 0) {
        return null;
    }

    let name = lengths[0].toString();
    let children = buildDecisionTree(lengths.slice(1));

    return { name: name, children: children };
}

export default cut;
