import Movie from './Movie';
import { useEffect } from 'react';
import './style.css';
import { CircularProgress } from '@material-ui/core';

type Props = {
  movies: any;
  setMovies: any;
  setTempMovies: any;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
type Movie = {
  imdbID: string;
  title: string;
  image: string;
  year: string;
};

const API_KEY = '8e2ca52d';

const series = ['Harry Potter', 'fast and furious', 'iron man', 'Jumanji'];

const Movies: React.FC<Props> = (props) => {
  useEffect(() => {
    const promises = series.map((series) => {
      return fetch(
        `http://www.omdbapi.com/?s=${encodeURIComponent(
          series
        )}&apikey=${API_KEY}&page=1`
      )
        .then((response) => response.json())
        .then((response) => console.log(response));
    });

    Promise.all(promises).then((movies: any) => {
      const updatedMovies: Movie[] = movies
        .map((movie: any) => movie.search)
        .flat(2)
        .map((movie: any) => ({
          title: movie.Title,
          year: movie.Year,
          image: movie.Poster,
          imdb: movie.imdbID,
        }));
      props.setMovies(updatedMovies);
      props.setTempMovies(updatedMovies);
    });
  }, []);

  if (props.movies.length === 0) {
    return (
      <div className="loader">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="movies">
      {props.movies.map((movie: Movie) => {
        return (
          <Movie
            key={movie.imdbID}
            title={movie.title}
            year={movie.year}
            image={movie.image}
          />
        );
      })}
    </div>
  );
};

export default Movies;
