import React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import useSearchQueryKeyStore from "@/store/SearchQueryKeyStore";
import { useRouter } from "next/navigation";

const NavbarSearch = () => {
  const router = useRouter();
  const { search, setSearch, setQueryKey, queryKey } = useSearchQueryKeyStore();

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQueryKey(e.target.value);
  };
  const onKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && queryKey.length > 2) {
      setSearch(true);
      router.push(`search?q=${queryKey}`);
    }
  };
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon opacity={queryKey.length > 2 ? "1" : ".1"} />
      </SearchIconWrapper>

      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        onChange={(e) => onInputChange(e)}
        onKeyDown={(e) => onKeyDown(e)}
        value={queryKey}
      />
    </Search>
  );
};

export default NavbarSearch;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
  },
  marginLeft: 0,
  width: "80%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    //transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "70ch",
      "&:focus": {
        width: "80ch",
      },
    },
  },
}));
