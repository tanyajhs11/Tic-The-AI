export const getComputerMove = (matrix, difficulty) => {
	console.log(`difficulty:${difficulty}`);
	if (difficulty === 1) {
		return getRandomMove(matrix);
	} else if (difficulty === 2) {
		return getMoveForMedium(matrix);
	} else {
		return getAIEnhancedMove(matrix, Infinity);
	}
};

const getRandomMove = (matrix) => {
	let row = Math.floor(Math.random() * 3);
	let col = Math.floor(Math.random() * 3);
	while (matrix[row][col] !== -1) {
		row = Math.floor(Math.random() * 3);
		col = Math.floor(Math.random() * 3);
	}
	return [row, col];
};
const getMoveForMedium = (matrix) => {
	let res = [];
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (matrix[i][j] === -1) {
				console.log(`i:${i}, j:${j}`);
				matrix[i][j] = 0;
				const playerWinner = checkWinner(matrix, 0);
				console.log(playerWinner);
				if (playerWinner === 0) {
					res = [i, j];
				}

				matrix[i][j] = 1;
				const computerWinner = checkWinner(matrix, 1);
				console.log(computerWinner);
				if (computerWinner === 1) {
					res = [i, j];
				}
				matrix[i][j] = -1;
			}
		}
	}
	if (res.length === 0) {
		console.log("Taking Random!");
		res = getRandomMove(matrix);
	}

	return res;
};

export const checkWinner = (matrix, turn) => {
	let tie = true;
	for (let row of matrix) {
		if (
			row.filter((value) => value == 0).length == 3 ||
			row.filter((value) => value == 1).length == 3
		) {
			return turn;
		}
		if (row.includes(-1)) {
			tie = false;
		}
	}
	for (let col = 0; col < 3; col++) {
		if (
			(matrix[0][col] === 0 && matrix[1][col] === 0 && matrix[2][col] === 0) ||
			(matrix[0][col] === 1 && matrix[1][col] === 1 && matrix[2][col] === 1)
		) {
			return turn;
		}
		if (matrix[col].includes(-1)) {
			tie = false;
		}
	}
	if (
		(matrix[0][0] === 0 && matrix[1][1] === 0 && matrix[2][2] === 0) ||
		(matrix[0][0] === 1 && matrix[1][1] === 1 && matrix[2][2] === 1)
	) {
		return turn;
	}
	if (
		(matrix[0][2] === 0 && matrix[1][1] === 0 && matrix[2][0] === 0) ||
		(matrix[0][2] === 1 && matrix[1][1] === 1 && matrix[2][0] === 1)
	) {
		return turn;
	}
	return tie ? -1 : -2;
};

function assignScore(matrix, turn) {
	let score = 0;
	const winner = checkWinner(matrix, turn);
	if (winner === -1) {
		score = 5;
	} else if (winner === 0) {
		score = -10;
	} else if (winner === 1) {
		score = 10;
	} else {
		score = 0;
	}
	return score;
}

function dfs(matrix, steps, row, col, currScoreMap, turn) {
	if (steps === 0) {
		const score = assignScore(matrix, turn);
		return score;
	}

	matrix[row][col] = turn;
	if (checkWinner(matrix, turn) !== -2) {
		const score = assignScore(matrix, turn);
		matrix[row][col] = -1;
		return score;
	}

	let MaxCurrScore = -Number.MAX_VALUE;
	let MinCurrScore = Number.MAX_VALUE;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (matrix[i][j] === -1) {
				const score = dfs(
					matrix,
					steps - 1,
					i,
					j,
					currScoreMap,
					turn === 1 ? 0 : 1
				);
				MaxCurrScore = Math.max(MaxCurrScore, score);
				MinCurrScore = Math.min(MinCurrScore, score);
			}
		}
	}

	matrix[row][col] = -1;

	if (turn === 1) {
		return MinCurrScore;
	} else {
		return MaxCurrScore;
	}
}

function getAIEnhancedMove(matrix, steps) {
	const res = [-Number.MAX_VALUE, -1, -1];
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (matrix[i][j] === -1) {
				const score = dfs(matrix, steps, i, j, 0, 1);
				if (score > res[0]) {
					res[0] = score;
					res[1] = i;
					res[2] = j;
				}
			}
		}
	}

	return [res[1], res[2]];
}
