const fs = require('fs');
function readInput(filePath) {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}
function decodeValue(value, base) {
    return parseInt(value, base);
}
function lagrangeInterpolation(points, k) {
    let secret = 0;
    for (let i = 0; i < k; i++) {
        let xi = points[i].x;
        let yi = points[i].y;
        let li = 1;

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                let xj = points[j].x;
                li *= (0 - xj) / (xi - xj);  
            }
        }

        secret += yi * li;
    }
    return Math.round(secret); 
}

function solveSecret(filePath) {
    const input = readInput(filePath);
    const n = input.keys.n;
    const k = input.keys.k;

    
    let points = [];
    for (let i = 1; i <= n; i++) {
        if (input[i]) {
            const x = i;
            const y = decodeValue(input[i].value, input[i].base);
            points.push({ x, y });
        }
    } const secret = lagrangeInterpolation(points, k);
    console.log(`The secret (constant term 'c') is: ${secret}`);
}
solveSecret('input.json');
