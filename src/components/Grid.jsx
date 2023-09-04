import { Box, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import Tic from "./Tic";
import Tac from "./Tac";
import { getComputerMove, checkWinner } from "../Utils/Utils";

const Grid = ({
	points,
	setPoints,
	winner,
	setWinner,
	matrix,
	setMatrix,
	turn,
	setTurn,
	mode,
	difficulty,
}) => {
	const onChangeHandler = (row, column, win) => {
		if (win) return;

		let newMat = [...matrix];
		if (turn === 0) {
			newMat[row][column] = 0;
		} else {
			newMat[row][column] = 1;
		}
		let winner = checkWinner(newMat, turn);
		if (winner != -2) setWinner(true);

		if (winner === 0) {
			setPoints({ ...points, tic: points.tic + 1 });
		}
		if (winner === 1) {
			setPoints({ ...points, tac: points.tac + 1 });
		}
		if (winner === -1) {
			setPoints({ ...points, tie: points.tie + 1 });
		}
		setMatrix(newMat);
		setTurn(turn === 0 ? 1 : 0);
	};

	useEffect(() => {
		if (mode === 1 && turn === 1 && !winner) {
			let newMat = [...matrix];
			setTimeout(() => {
				const index = getComputerMove(newMat, difficulty);
				newMat[index[0]][index[1]] = 1;
				let winner = checkWinner(newMat, turn);
				if (winner != -2) setWinner(true);

				if (winner === 0) {
					setPoints({ ...points, tic: points.tic + 1 });
				}
				if (winner === 1) {
					setPoints({ ...points, tac: points.tac + 1 });
				}
				if (winner === -1) {
					setPoints({ ...points, tie: points.tie + 1 });
				}
				setMatrix(newMat);
				setTurn(turn === 0 ? 1 : 0);
			}, 300);
		}
	}, [turn]);

	const GenerateActionBox = () => {
		let grid = [];
		for (let i = 0; i < 3; i++) {
			grid.push(
				<div style={{ marginTop: `${i * 14.5}rem`, position: "absolute" }}>
					{matrix[i][0] === -1 ? (
						<ActionBox onClick={() => onChangeHandler(i, 0, winner)} />
					) : matrix[i][0] === 0 ? (
						<Tic leftSpace={7} />
					) : (
						<Tac leftSpace={7} />
					)}
					{matrix[i][1] === -1 ? (
						<ActionBox
							sx={{ marginLeft: "17rem" }}
							onClick={() => onChangeHandler(i, 1, winner)}
						/>
					) : matrix[i][1] === 0 ? (
						<Tic leftSpace={22} />
					) : (
						<Tac leftSpace={22} />
					)}
					{matrix[i][2] === -1 ? (
						<ActionBox
							sx={{ marginLeft: "32rem" }}
							onClick={() => onChangeHandler(i, 2, winner)}
						/>
					) : matrix[i][2] === 0 ? (
						<Tic leftSpace={36} />
					) : (
						<Tac leftSpace={36} />
					)}
				</div>
			);
		}
		return grid;
	};
	return (
		<Wrapper>
			{GenerateActionBox()}
			<SeparatorV sx={{ marginLeft: "15rem" }} />
			<SeparatorV sx={{ marginLeft: "30rem" }} />
			<SeparatorH sx={{ marginTop: "-7.5rem" }} />
			<SeparatorH sx={{ marginTop: "7.5rem" }} />
		</Wrapper>
	);
};

export default Grid;

const Wrapper = styled(Box)({
	backgroundColor: "#F5CBA7",
	// position: "absolute",
	width: "45rem",
	height: "45rem",
	borderRadius: "1.5rem",
});

const SeparatorV = styled(Box)({
	backgroundColor: "black",
	position: "absolute",
	width: "0.5rem",
	height: "86%",
	marginTop: "1%",
	borderRadius: "1.5rem",
});
const SeparatorH = styled(Box)({
	backgroundColor: "black",
	position: "absolute",
	width: "0.5rem",
	height: "86%",
	borderRadius: "1.5rem",
	transform: "rotate(90deg)",
	marginLeft: "22.5rem",
});
const ActionBox = styled(Box)({
	transition: "all 0.5s ease",
	backgroundColor: "black",
	width: "11rem",
	height: "11rem",
	margin: "auto",
	marginTop: "1.6rem",
	marginLeft: "2.5rem",
	position: "absolute",
	borderRadius: "1.5rem",
	boxShadow: "10px 10px 10px white",
	cursor: "pointer",
	"&:hover": {
		backgroundColor: "#fff",
	},
});
