import { keyframes, Skeleton, styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom"
import { grayColor, matBlack } from "../../constants/color";

const VisuallyHiddenInput = styled("input")({
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    whiteSpace: "nowrap",
    width: 1
});


const Link = styled(LinkComponent)`
text-decoration : none;
color:black;
padding:1rem;
&:hover{
background-color:rgba(0,0,0,0.1);
}
`;


const InputBox = styled("input")(({ theme }) => ({
  border: "none",
  outline: "none",
  borderRadius: "1.5rem",
  backgroundColor: grayColor,
  fontSize: "1rem",
  boxSizing: "border-box",
  width: "100%",
  height: "100%",
  padding: "0.5rem 1rem",
  color: "#fff",
  // Responsive tweaks
  "@media (max-width: 600px)": {
    fontSize: "0.9rem",
  }
}));



const SearchFeild = styled("input")(({ theme }) => ({
  padding: "1rem 2rem",
  width: "20vmax",
  borderRadius: "1.5rem",
  border: "none",
  outline: "none",
  backgroundColor: "#e0e0e0", // or use your `grayColor` variable
  fontSize: "1.1rem",
  // Hide on small screens
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const CurveButton = styled("button")(({ theme }) => ({
    borderRadius: "1.5rem",
    padding: "1rem 2rem",
    border: "none",
    outline: "none",
    cursor: "pointer",
    backgroundColor: "#1C1C1C", // or use a variable like matBlack
    color: "white",
    fontSize: "1rem",
    "&:hover": {
        backgroundColor: "rgba(0,0,0,0.8)",
    },
    // Hide on small screens
    [theme.breakpoints.down("sm")]: {
        display: "none",
    },
}));



// When user typing
const bounceAnimation = keyframes`
0% {transform : translateY(0) scale(1) }
50% {transform : translateY(-0.5rem) scale(1.2) }
100% {transform :translateY(0) scale(1) }
`
const BouncingSkeleton = styled(Skeleton)(() => ({
    animation: `${bounceAnimation} 1s infinite`,
}))

export {
    VisuallyHiddenInput,
    Link,
    InputBox,
    SearchFeild,
    CurveButton,
    BouncingSkeleton
}