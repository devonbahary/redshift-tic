import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { map } from 'react-immutable-proptypes';
import { func } from 'prop-types';

import { resetGame } from '../redux/actions';
import CoreLayout from '../containers/CoreLayout';
import TicTacToe from '../components/TicTacToe';

export const Play = (props) => {
  const { dispatch } = props;
  const { game } = props;
  const players = game.get('players');

  return (
    <CoreLayout>
      <div className="col--center typ--center">
        <h2>{ players.get(0) } vs. { players.get(1) }</h2>
        <p>{ `${players.get(game.get('currentPlayerIndex'))}'s turn` }</p>

        <TicTacToe />

        <Link to="/" className="btn" onClick={ () => dispatch(resetGame()) }>Start a new game</Link>
      </div>
    </CoreLayout>
  );
};

const mapStateToProps = state => ({
  game: state.game
});

Play.propTypes = {
  game: map.isRequired,
  dispatch: func.isRequired
};

export default connect(mapStateToProps)(Play);
