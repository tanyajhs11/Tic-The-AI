import React from "react";
import { Box, styled } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Tic = ({ leftSpace }) => {
	return (
		<div
			style={{
				zIndex: "1",
				marginLeft: `${leftSpace}rem`,
			}}
		>
			<IconWrapper/>
		</div>
	);
};

export default Tic;

const IconWrapper = styled(CloseRoundedIcon)({
	transform: "scale(10)",
	backgroundColor: "transparent",
	color: "#b52d04",
	margin: "auto",
	marginTop: "7rem",
	position: "absolute",
});
