import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { useState,useEffect } from 'react';
import MovieList from "./MovieList";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function NavBar() {
  const API_KEY = 'f446fa96';
  let [query, setQuery] = useState("");
  let [movie, setMovie] = useState([]); // initialize with an empty array

  let onChngBtn = (evt) => {
    setQuery(evt.target.value);
  }

  const url = `http://www.omdbapi.com/?t=${query ? query:"mission Impossible"}&apikey=${API_KEY}`;

  let searchBtn = async () => {
    setMovie([]);
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    setMovie((prevData) => [...prevData,result]);
  }
  useEffect(() => {
    async function get(){
    const url = `http://www.omdbapi.com/?t=${query ? query:"mission Impossible"}&apikey=${API_KEY}`;
    const response = await fetch(url);
    const result = await response.json();
    setMovie((prevData) => [...prevData,result])}
    get();

 
  }, []); 

  
  return (<>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MV-Lists
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={query}
              onChange={onChngBtn}
            />
          </Search>
          <Button variant="contained" style={{color:"black"}} onClick={searchBtn}>Search</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <MovieList movie={movie}/>
    </>
  );
}
