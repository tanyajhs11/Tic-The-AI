import React from "react";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { styled } from "@mui/material";

const Tac = ({ leftSpace }) => {
	return (
		<div
			style={{
				zIndex: "1",
				background: "transparent",
				marginLeft: `${leftSpace}rem`,
			}}
		>
			<IconWrapper />
		</div>
	);
};

export default Tac;

const IconWrapper = styled(CircleOutlinedIcon)({
	transform: "scale(7)",
	color: "#085fbd",
	backgroundColor: "transparent",
	margin: "auto",
	marginTop: "7rem",
	position: "absolute",
});
