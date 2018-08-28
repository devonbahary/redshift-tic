import React from 'react';
import { connect } from 'react-redux';
import { map } from 'react-immutable-proptypes';
import { func } from 'prop-types';

import { move } from '../redux/actions';
import CoreLayout from '../containers/CoreLayout';

export class Play extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      row: '',
      column: ''
    };
  }

  checkForWin(row, column) {
    const board = this.props.game.get('board').toArray().map(list => list.toArray());
    const symbols = ['X', 'O'];
    const currentPlayerSymbol = symbols[this.props.game.get('currentPlayerIndex')];

    // check row
    const hasOpponentInRow = board[row].some((cell, index) => cell !== currentPlayerSymbol && index != column);
    if (!hasOpponentInRow) {
      return true;
    }

    // check column
    const hasOpponentInColumn = [ board[0][column], board[1][column], board[2][column] ].some((cell, index) => cell !== currentPlayerSymbol && index != row);;
    if (!hasOpponentInColumn) {
      return true;
    }

    // check diagonal1
    const hasOpponentInDiagonal1 = [ board[0][0], board[1][1], board[2][2] ].some((cell, index) => cell !== currentPlayerSymbol && index != row && index != column);
    if (!hasOpponentInDiagonal1) {
      return true;
    }

    // check diagonal2
    const hasOpponentInDiagonal2 = [ board[0][2], board[1][1], board[2][0] ].some((cell, index) => cell !== currentPlayerSymbol && index != row && index != column);
    if (!hasOpponentInDiagonal2) {
      return true;
    }

    return false;
  }

  submitMove() {
    const { dispatch } = this.props;
    const { row, column } = this.state;

    if (row !== '' && column !== '') {
      // check if move already made
      if (this.props.game.getIn(['board', row, column])) {
        alert('Move already made!');
      } else {
        dispatch(move(row, column));
        this.setState(() => ({ row: '', column: '' }));
      }

      // TODO: Determine win or stalemate
      if (this.checkForWin(row, column)) {
        const players = this.props.game.get('players');
        const playerName = players.get(this.props.game.get('currentPlayerIndex'));
        console.log()
        alert(`Player ${playerName} wins!`)
      }
    } else {
      alert('You need to pick a row and column before you can move!');
    }
  }

  render () {
    const { game } = this.props;

    const players = game.get('players');
    const rows = game.get('board');
    const boardCellNumber = 3;
    const cellIndices = [...Array(boardCellNumber).keys()];

    const drawRow = (row) => {
      const center = cellIndices.map(ind => row.get(ind) || ' ')
        .join(' | ');
      return `| ${ center } |`;
    };

    const verticalBorder = cellIndices.reduce((string) => string.concat('----'), '-')
    const rowHTML = [verticalBorder, ...rows.map(drawRow), verticalBorder]
      .map((row, ind) => <p key={ ind }>{ row }</p>);

    return (
      <CoreLayout>
        <div>
          <h2>{ players.get(0) } vs. { players.get(1) }</h2>
          <p>{ `${players.get(game.get('currentPlayerIndex'))}'s turn` }</p>
          <div>
            { rowHTML }
          </div>

          <div>
            Select a row:
            <select
              value={ this.state.row }
              onChange={ (event) => { this.setState({ row: event.target.value }) } }
            >
              <option value={ '' } />
              {
                cellIndices.map(ind => (
                  <option value={ ind } key={ ind } >{ ind }</option>
                ))
              }
            </select>
          </div>

          <div>
            Select a column:
            <select
              value={ this.state.column }
              onChange={ (event) => { this.setState({ column: event.target.value }) } }
            >
              <option value={ '' } />
              {
                cellIndices.map(ind => (
                  <option value={ ind } key={ ind } >{ ind }</option>
                ))
              }
            </select>
          </div>

          <input
            className="submit"
            type="submit"
            onClick={ () => { this.submitMove(); } }
          />
        </div>
      </CoreLayout>
    );
  }
};

const mapStateToProps = state => ({
  game: state.game
});

Play.propTypes = {
  game: map.isRequired,
  dispatch: func.isRequired
};

export default connect(mapStateToProps)(Play);
