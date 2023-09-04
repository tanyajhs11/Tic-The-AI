import { Card, Slider, Box, styled } from "@mui/material";
import Grid from "./components/Grid";
import Tic from "./components/Tic";
import Tac from "./components/Tac";
import Footer from "./components/Footer";
import "./App.css";
import { useEffect, useState } from "react";

const Difficulties = [
	{
		value: 1,
		label: "Easy",
	},
	{
		value: 2,
		label: "Medium",
	},
	{
		value: 3,
		label: "Hard",
	},
];

const App = () => {
	const [points, setPoints] = useState({ tic: 0, tac: 0, tie: 0 });
	const [winner, setWinner] = useState(false);
	const [matrix, setMatrix] = useState([
		[-1, -1, -1],
		[-1, -1, -1],
		[-1, -1, -1],
	]);
	const [turn, setTurn] = useState(0);
	const [mode, setMode] = useState(0);
	const [difficulty, setDifficulty] = useState(1);

	const preventHorizontalKeyboardNavigation = (event) => {
		if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
			event.preventDefault();
		}
	};

	const valueLabelFormat = (value) => {
		return Difficulties.findIndex((mark) => mark.value === value) + 1;
	};

	return (
		<Wrapper style={{ marginLeft: mode === 1 ? "25%" : "0" }}>
			<div
				style={{
					flex: 1,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Grid
					points={points}
					setPoints={setPoints}
					winner={winner}
					setWinner={setWinner}
					matrix={matrix}
					setMatrix={setMatrix}
					turn={turn}
					setTurn={setTurn}
					mode={mode}
					difficulty={difficulty}
				/>
				<Footer
					points={points}
					setPoints={setPoints}
					setWinner={setWinner}
					setMatrix={setMatrix}
					setTurn={setTurn}
					mode={mode}
					setMode={setMode}
				/>
			</div>
			{mode === 1 && (
				<Box
					sx={{
						width: "100%",
						height: ["30rem"],
						marginLeft: ["3rem"],
						flex: 2,
					}}
				>
					<MySlider
						orientation="vertical"
						defaultValue={1}
						aria-label="Difficulty"
						step={1}
						min={1}
						max={3}
						marks={Difficulties}
						valueLabelFormat={valueLabelFormat}
						valueLabelDisplay={"auto"}
						onKeyDown={preventHorizontalKeyboardNavigation}
						onChange={(e, value) => {
							setDifficulty(value);
						}}
					/>
				</Box>
			)}
		</Wrapper>
	);
};

export default App;

const Wrapper = styled(Box)({
	width: "100%",
	height: "100vh",
	display: "flex",
	flexDirection: "row",
	justifyContent: "center",
	alignItems: "center",
	alignContent: "center",
});

const MySlider = styled(Slider)({
	'& input[type="range"]': {
		WebkitAppearance: "slider-vertical",
	},
	color: "#000",
	textEmphasisColor: "#000",
	"& .MuiSlider-thumb": {
		width: "1rem",
		height: "1rem",
		backgroundColor: "#000",
		border: "none",
		"&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
			boxShadow: "inherit",
		},
	},
	"& .MuiSlider-valueLabel": {
		color: "#fff",
		textEmphasisColor: "#fff",
		"& span": {
			backgroundColor: "transparent",
			color: "#fff",
			textEmphasisColor: "#fff",
		},
	},

	"& .MuiSlider-markLabel": {
		color: "#000",
		textEmphasisColor: "#000",
	},
});
