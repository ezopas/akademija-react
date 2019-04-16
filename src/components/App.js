import React from 'react';
import Card from './Card';
import Header from './Header/index';
import axios from 'axios';
import { endpoints, getImageUrl } from '../../config';

class App extends React.Component {
  constructor() {
    super();
    
    this.state = {
      movieList: [],
      genreList: [],
      filter: false,
      genreId: 0,
      likedMovies: [],
    };
    
    this.getMovies();
    this.getGenres();
  }
  
  getMovies = () => {
    axios
      .get(endpoints.mostPopularMovies())
      .then((res) => this.setMovieList(res.data.results))
      .catch((error) => console.log(error));
  };
  
  setMovieList = (list) => {
    this.setState({
      movieList: list,
    });
  };

  getGenres = () => {
    axios
        .get(endpoints.genres())
        .then((res) => this.setGenresList(res.data.genres))
        .catch((error) => console.log(error));
    console.log("g: " + endpoints.genres());
  };

  setGenresList = (list) => {
    this.setState({
        genreList: list,
    });
  };

  handleClick = (id) => {
      this.setState(state => ({
          filter: true,
          genreId: id,
      }));
  };

  likedMoviesClick = (id) => {

    if(this.state.likedMovies.indexOf(id) === -1){
        this.setState(
            state => ({
                likedMovies: [...state.likedMovies, id],
            })
        );
    }else {
        let array = [...this.state.likedMovies]; // make a separate copy of the array
        //console.log("k:"+array.indexOf(id));
        let index = array.indexOf(id);
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({likedMovies: array});
        }
    }
  };

  genre(id){

    return(
        <div>
        {this.state.genreList.map( listItem  => {
                //console.log(listItem);
                return <Header key={listItem.id} id={listItem.id} name={listItem.name} handleClick={this.handleClick}/>
            })}

            {this.state.movieList.map((listItem) => {
            return(
                <div>
                    {listItem.genre_ids.map((genre_id) => {
                    if(id == genre_id){
                    return (
                    <Card
                        backgroundImage={getImageUrl(listItem.backdrop_path)}
                        title={listItem.original_title}
                        releaseDate={listItem.release_date}
                        score={listItem.vote_average}
                        votes={listItem.vote_count}
                        description={listItem.overview}
                        id={listItem.id}
                        likedMoviesClick={this.likedMoviesClick}
                        likedMovies={this.state.likedMovies}
                    />
                    );
                    }
                    })}
                </div>
            )
        })}
        </div>)
  }

  render() {
    const { movieList } = this.state;
    const { genreList } = this.state;

    if(this.state.filter){
       return this.genre(this.state.genreId);
    }else{
      return (
          <div>
              {/*<span onClick={() => this.handleClick(28)}> cv</span>*/}
              <div className='row justify-content-between server-item-container text-center'>
                  {genreList.map( listItem  => {
                      //console.log(listItem);
                      return <Header key={listItem.id} id={listItem.id} name={listItem.name} handleClick={this.handleClick}/>
                  })}
              </div>
              {movieList.map( listItem => {
                return (
                    <Card
                        backgroundImage={getImageUrl(listItem.backdrop_path)}
                        title={listItem.original_title}
                        releaseDate={listItem.release_date}
                        score={listItem.vote_average}
                        votes={listItem.vote_count}
                        description={listItem.overview}
                        id={listItem.id}
                        likedMoviesClick={this.likedMoviesClick}
                        likedMovies={this.state.likedMovies}
                    />
                )
              }
              )}
          </div>
          );
    }
  }
}

export default App;
