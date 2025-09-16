const fs = require('fs');

function decodeBase(value, base) {
    return parseInt(value, base);
}

function lagrangeInterpolation(points) {
    const k = points.length;
    
    let c = 0;
    for (let i = 0; i < k; i++) {
        let [x_i, y_i] = points[i];
        let term = y_i;
        
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                let [x_j, _] = points[j];
                term *= x_j / (x_j - x_i);
            }
        }
        c += term;
    }
    
    return Math.round(c); 
}

function findSecret(jsonInput) {
    const keys = jsonInput.keys;
    const n = keys.n;
    const k = keys.k;

    let points = [];

    for (let i = 1; i <= n; i++) {
        const x = i;
        const base = parseInt(jsonInput[i.toString()]["base"]);
        const encodedValue = jsonInput[i.toString()]["value"];
        const y = decodeBase(encodedValue, base);
        points.push([x, y]);

        if (points.length === k) {
            break;
        }
    }

    const secret = lagrangeInterpolation(points);
    return secret;
}

// Reading the test case input from the JSON file
function readAndSolveTestCase(filename) {
    const jsonData = fs.readFileSync(filename);
    const jsonInput = JSON.parse(jsonData);
    const secret = findSecret(jsonInput);
    console.log(The secret (constant term c) is: ${secret});
}


readAndSolveTestCase('testCase1.json');
readAndSolveTestCase('testCase2.json');