import React from 'react';

const Card = ({backgroundImage,
                    title,
                    releaseDate,
                    score,
                    votes,
                    description,
                    id,
                    likedMoviesClick,
                  likedMovies}) => {
    return (
        <div className="card">
            <div
                className="card__image"
                style={{
                    backgroundImage: `url('${backgroundImage}')`,
                }}
            />

            <div className="card__title">
                {title}
            </div>

            <div className="card__like">
                {likedMovies.indexOf(id) === -1
                    ?
                    <i className="fa fa-heart-o" onClick={() => {likedMoviesClick(id)}}/>
                    :
                    <i className="fa fa-heart" onClick={() => {likedMoviesClick(id)}}/>
                }

            </div>
            <div className="card__subtitle">
                <span>{releaseDate}</span>
                <span>{score} ({votes} votes)</span>
            </div>
        </div>
    );
};

export default Card;
