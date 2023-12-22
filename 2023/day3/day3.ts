const inputFile = Bun.file("./input.txt");
const input = await inputFile.text();

// Part 1
(function part1() {
    let rows = input.split("\n");
    let sum = 0;

    const isSymbol = (character: string) => {
        return character !== "." && isNaN(character as unknown as number);
    };

    const checkSurrounding = (x1: number, x2: number, y: number) => {
        let localX1 = x1 > 0 ? x1 - 1 : x1;
        let localX2 = rows[y][x2] === undefined ? x2 - 1 : x2; // I hope all rows are the same length
        let isPartNumber: boolean = false;

        // Check top of number
        if (y >= 1) {
            for (let c = localX1; c <= localX2; c++) {
                if (isSymbol(rows[y - 1][c])) isPartNumber = true;
            }
        }

        // Check left and right of number
        if (isSymbol(rows[y][localX1])) isPartNumber = true;
        if (rows[y][x2] !== undefined && isSymbol(rows[y][localX2]))
            isPartNumber = true;

        // Check bottom of number
        if (y < rows.length - 1) {
            for (let c = localX1; c <= localX2; c++) {
                if (isSymbol(rows[y + 1][c])) isPartNumber = true;
            }
        }

        return isPartNumber;
    };

    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].length; j++) {
            let currentNum: string = "";

            // Little hacky in typescript but isNaN works for strings
            if (!isNaN(rows[i][j] as unknown as number)) {
                let endOfNumber = j;

                while (!isNaN(rows[i][endOfNumber] as unknown as number)) {
                    endOfNumber += 1;
                }

                currentNum = rows[i].slice(j, endOfNumber);

                if (checkSurrounding(j, endOfNumber, i) === true)
                    sum += Number(currentNum);

                j = endOfNumber;
            }
        }
    }

    console.log("Part 1: " + sum);
})();

// Part 2
// NOPE
