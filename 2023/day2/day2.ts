const inputFile = Bun.file("./input.txt");
const input = await inputFile.text();

// Part 1
(function part1() {
    let strings: Array<string> = input.split("\n");
    let sum: number = 0;

    const maxRed = 12;
    const maxGreen = 13;
    const maxBlue = 14;

    // Preparing as if part two has something to do with storing, instead of just adding to the sum
    const possibleGames = [];

    for (let i = 0; i < strings.length; i++) {
        const [gameIDRaw, gameInfo] = strings[i].split(": ");
        // Define the game ID
        const gameID = Number(gameIDRaw.split(" ")[1]);

        const rounds = gameInfo.split("; ");
        let gamePossible = true;

        for (let j = 0; j < rounds.length; j++) {
            const draws = rounds[j].split(", ");

            for (let k = 0; k < draws.length; k++) {
                // See if color is greater than max for that color. If it's an impossible game, break the loop
                if (
                    (draws[k].includes("red") &&
                        Number(draws[k].slice(0, draws[k].indexOf(" "))) >
                            maxRed) ||
                    (draws[k].includes("green") &&
                        Number(draws[k].slice(0, draws[k].indexOf(" "))) >
                            maxGreen) ||
                    (draws[k].includes("blue") &&
                        Number(draws[k].slice(0, draws[k].indexOf(" "))) >
                            maxBlue)
                ) {
                    gamePossible = false;
                    break;
                }
            }
        }

        if (gamePossible) possibleGames.push(gameID);
    }

    sum = possibleGames.reduce((a, c) => (a += c));

    console.log("Part 1: " + sum);
})();

// Part 2
(function part2() {
    let strings: Array<string> = input.split("\n");
    let sum: number = 0;

    // Preparing as if part two has something to do with storing, instead of just adding to the sum
    const gameData = [];

    for (let i = 0; i < strings.length; i++) {
        const [_gameID, gameInfo] = strings[i].split(": ");
        const rounds = gameInfo.split("; ");

        // Push new object to keep track of cube minimums
        gameData.push({
            red: 0,
            blue: 0,
            green: 0,
        });

        // Just gather all the data
        for (let j = 0; j < rounds.length; j++) {
            const draws = rounds[j].split(", ");

            // If the number is higher than the previous draws, set that as the new minimum
            // (executed for each color ^)
            for (let k = 0; k < draws.length; k++) {
                if (draws[k].includes("red")) {
                    if (
                        Number(draws[k].slice(0, draws[k].indexOf(" "))) >
                        gameData[i].red
                    ) {
                        gameData[i].red = Number(
                            draws[k].slice(0, draws[k].indexOf(" "))
                        );
                    }
                }

                if (draws[k].includes("green")) {
                    if (
                        Number(draws[k].slice(0, draws[k].indexOf(" "))) >
                        gameData[i].green
                    ) {
                        gameData[i].green = Number(
                            draws[k].slice(0, draws[k].indexOf(" "))
                        );
                    }
                }

                if (draws[k].includes("blue")) {
                    if (
                        Number(draws[k].slice(0, draws[k].indexOf(" "))) >
                        gameData[i].blue
                    ) {
                        gameData[i].blue = Number(
                            draws[k].slice(0, draws[k].indexOf(" "))
                        );
                    }
                }
            }
        }
    }

    sum = gameData.reduce((a, c) => (a += c.red * c.green * c.blue), 0);

    console.log("Part 2: " + sum);
})();
