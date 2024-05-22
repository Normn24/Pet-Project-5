import { styled } from '@mui/system';
import { NavLink } from "react-router-dom";

export const NavBarWrapper = styled("div")({
    display: "flex",
    justifyContent: "space-between",
    width: "auto",
    height: "56px",
    backgroundColor: "#F0F0F4",
});

export const NavBarItem = styled("div")({
    minWidth: "120px",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 15px",
    "&:hover": {
        borderBottom: "4px solid #1c62cd",
        borderRadius: "4px",
    },
});

export const StyledNavBarLink = styled(NavLink)({
    color: '#2f3035',
    textDecoration: 'none',
    fontFamily: '"Gill Sans", sans-serif',
    fontSize: '20px',
    fontWeight: 500,
    textTransform: "uppercase",
});