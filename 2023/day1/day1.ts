const inputFile = Bun.file("./input.txt");
const input = await inputFile.text();

// Part 1
(function part1() {
    let strings = input.split("\n");
    let sum = 0;

    for (let i = 0; i < strings.length; i++) {
        // Strip all letters
        let tempStr = strings[i].replace(/\D+/g, "");

        // Combine first and last number
        let numStr = tempStr.slice(0, 1) + tempStr.slice(-1);

        // Parse numStr to an int and add to sum
        sum += +numStr;
    }

    console.log("Part 1: " + sum);
})();

// Part 2 (uh oh)
(function part2() {
    let strings = input.split("\n");
    // let strings = ["7pqrstsixteen"];

    let sum = 0;
    const numLetters = [
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
    ];

    // time complexity? what's that?
    for (let i = 0; i < strings.length; i++) {
        // Just declare current string
        let currStr = strings[i];
        // Keep track of letters
        let currStrNum = "";
        let firstNum: string = "";
        let lastNum: string = "";

        // Find first number
        for (let j = 0; j < currStr.length; j++) {
            // Check if it's an actual number
            if (!Number.isNaN(Number(currStr.at(j) as string))) {
                firstNum = currStr.at(j) as string;
                break;
            } else {
                // Add the letter to the end of the current string
                currStrNum += currStr.at(j);
                // Check if the string contains any of the word numbers
                let found = numLetters.some((value: string) => {
                    if (currStrNum.includes(value)) {
                        // 0 based but still corresponds to numbers, so we add one
                        firstNum = (numLetters.indexOf(value) + 1).toString();
                        // .some() stops execution on first 'true' returned
                        return true;
                    }
                });
                if (found) break;
            }
        }

        // Find last number (working backwards)
        for (let j = 1; j < currStr.length; j++) {
            let currIndex = currStr.length - j;
            // Check if it's an actual number
            if (!Number.isNaN(Number(currStr.at(currIndex) as string))) {
                lastNum = currStr.at(currIndex) as string;
                break;
            } else {
                // Add the letter to the end of the current string
                currStrNum = currStr.slice(j * -1);
                // Check if the string contains any of the word numbers
                let found = numLetters.some((value: string) => {
                    if (currStrNum.includes(value)) {
                        // 0 based but still corresponds to numbers, so we add one
                        lastNum = (numLetters.indexOf(value) + 1).toString();
                        // .some() stops execution on first 'true' returned
                        return true;
                    }
                });
                if (found) break;
            }
        }

        // If only first number was found, make lastNum that as well
        if (lastNum === "") lastNum = firstNum;

        let finalNum = Number(firstNum + lastNum);
        sum += finalNum;
    }

    console.log("Part 2: " + sum);
})();
