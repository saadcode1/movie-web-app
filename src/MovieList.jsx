import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import "./MovieList.css";
import { useState, useEffect } from "react";

export default function MovieList({ movie }) {
  const [movieList, setMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    setSelectedMovie(null)
    if (movie && movie.length > 0) {
      setMovieList([...movie])
    }
  }, [movie]);

  function getResult(index) {
    setSelectedMovie(movieList[index]);
  }

  return (
    <>
      <div className='card-div'>
        {!selectedMovie && movieList.length > 0 ? (
          movieList.map((item, index) => (
            <div key={index} onClick={() => getResult(index)}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="500"
                    image={item.Poster}
                    alt={item.Poster}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.Title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Year: {item.Year}&nbsp;Type: {item.Type}&nbsp;imdbID: {item.imdbID}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          ))
        ) : null}
      </div>
      {selectedMovie ? (
          <div className='root-div'>
            <div className="img-div">
              <img src={selectedMovie.Poster}/>
            </div>
            <div className="info-div">
              <h1>Name-{selectedMovie.Title}</h1>
              <h3>Year-{selectedMovie.Year}</h3>
              <h3>Released-{selectedMovie.Released}</h3>
              <h3>Genre-{selectedMovie.Genre}</h3>
              <h3>Director-{selectedMovie.Director}</h3>
              <p>Country-{selectedMovie.Country}</p>
              <p>Language-{selectedMovie.Language}</p>
              <p>Plot-{selectedMovie.Plot}</p>
              <p>Imdb Rating-<b>{selectedMovie.imdbRating}/10</b></p>
              <p>Cast-<b>{selectedMovie.Actors}</b></p>
              <p>BoxOffice-<b>{selectedMovie.BoxOffice}</b></p>
            </div>
          </div>
      ) : (
        <p>No data available</p>
      )}
    </>
  )
          }