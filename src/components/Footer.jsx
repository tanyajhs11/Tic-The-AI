import React from "react";
import CachedRoundedIcon from "@mui/icons-material/CachedRounded";
import { styled, Box, Tooltip, IconButton } from "@mui/material";

const Footer = ({
	points,
	setPoints,
	setWinner,
	setMatrix,
	setTurn,
	mode,
	setMode,
}) => {
	const handleModeChange = () => {
		setMode(mode === 1 ? 0 : 1);
		newGame();
		setPoints({ tic: 0, tac: 0, tie: 0 });
	};
	const newGame = () => {
		setMatrix(
			Array(3)
				.fill(0)
				.map((row) => new Array(3).fill(-1))
		);
		setTurn(0);
		setWinner(false);
	};
	return (
		<Foot>
			<div>
				<h2>
					{" "}
					TIC : {points.tic} | TAC : {points.tac} | TIE : {points.tie}
				</h2>
			</div>
			<div style={{ display: "flex", flexDirection: "row" }}>
				<Tooltip title={mode === 1 ? "vs AI" : "vs Friend"} placement="top">
					<Mode sx={{ marginRight: "1rem" }} onClick={() => handleModeChange()}>
						{mode === 1 ? "1v" : "2v"}
					</Mode>
				</Tooltip>
				<Tooltip title="Reset_Game">
					<Restart onClick={() => newGame()}>
						<CachedRoundedIcon
							style={{
								backgroundColor: "#000",
								zIndex: 7,
								transform: "scale(1.4)",
								color: "#fff",
								borderRadius: "50%",
								"&:hover": {
									backgroundColor: "rgb(250 228 199)",
								},
							}}
						/>
					</Restart>
				</Tooltip>
			</div>
		</Foot>
	);
};

export default Footer;

const Foot = styled(Box)({
	display: "flex",
	justifyContent: "space-between",
	flexDirection: "row",
	width: "43rem",
	marginTop: "1rem",
});
const Restart = styled(IconButton)({
	borderRadius: "20",
	backgroundColor: "#",
	transition: "all 0.3s ease-in-out",
	"&:hover": {
		backgroundColor: "#000",
		opacity: "0.7",
	},
});

const Mode = styled(Box)({
	backgroundColor: "black",
	transition: "all 0.3s ease-in-out",
	fontcolor: "#fff",
	fontSize: "1.5rem",
	color: "#fff",
	cursor: "pointer",
	padding: "0.5rem",
	borderRadius: "0.5rem",
	"&:hover": {
		backgroundColor: "#00",
		opacity: "0.7",
	},
});
