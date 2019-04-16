import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Header = ({name, id, handleClick}) => {
    return (
        //<div className='row justify-content-between server-item-container'>
            <span className='col-1 col-sm-6 blcck' onClick={() => {handleClick(id)}}>
                {name}
            </span>
        //</div>
    );
};

// ServerItem.propTypes = {
//     name: PropTypes.string,
//     id: PropTypes.number,
// };

export default Header;