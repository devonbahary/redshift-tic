import React from 'react';
import { connect } from 'react-redux';
import { move } from '../../redux/actions';
import { map } from 'react-immutable-proptypes';
import { func } from 'prop-types';

import './TicTacToe.css';

export class TicTacToe extends React.Component {
  checkForWin(row, column) {
    const board = this.props.game.get('board').toArray().map(list => list.toArray());
    const symbols = ['X', 'O'];
    const currentPlayerSymbol = symbols[this.props.game.get('currentPlayerIndex')];

    // check row
    const hasOpponentInRow = board[row].some((cell, index) => cell !== currentPlayerSymbol && index !== column);
    if (!hasOpponentInRow) {
      return true;
    }

    // check column
    const hasOpponentInColumn = [ board[0][column], board[1][column], board[2][column] ].some((cell, index) => cell !== currentPlayerSymbol && index !== row);;
    if (!hasOpponentInColumn) {
      return true;
    }

    // check diagonal1
    if (row === column) {
      const isAllInDiagonal1 = [ board[0][0], board[1][1], board[2][2] ].every((cell, index) => cell === currentPlayerSymbol || (index === row && index === column));
      if (isAllInDiagonal1) {
        return true;
      }
    }

    // check diagonal2
    if (row + column === 2) {
      const isAllInDiagonal2 = [ board[0][2], board[1][1], board[2][0] ].every((cell, index) => cell === currentPlayerSymbol || (index === row && 2 - index === column));
      if (isAllInDiagonal2) {
        return true;
      }
    }

    return false;
  }

  checkForStalemate() {
    const rows = this.props.game.get('board').toArray();
    // count 'null' occurences
    let nullCount = 0;
    for (var i = 0; i < rows.length; i++) {
      const cells = rows[i].toArray();
      for (var j = 0; j < cells.length; j++) {
        if (cells[j] === null) {
          nullCount++;
          if (nullCount > 1) {
            return false;
          }
        }
      }
    }

    return true;
  }

  submitMove(row, column) {
    const { dispatch } = this.props;

    if (row !== '' && column !== '') {
      // check if move already made
      if (this.props.game.getIn(['board', row, column])) {
        alert('Move already made!');
      } else {
        dispatch(move(row, column));
        // this.setState(() => ({ row: '', column: '' }));
      }

      // TODO: Determine win or stalemate
      if (this.checkForWin(row, column)) {
        const players = this.props.game.get('players');
        const playerName = players.get(this.props.game.get('currentPlayerIndex'));
        setTimeout(() => alert(`Player ${playerName} wins!`), 0);
      } else if (this.checkForStalemate()) {
        setTimeout(() => alert('Bummer. Neither player won!'), 0);
      }
    } else {
      alert('You need to pick a row and column before you can move!');
    }
  }

  render() {
    const rows = this.props.game.get('board').toArray();

    return (
      <div className="TicTacToe mt2 mb2">
        {rows.map((row, rowIndex) => (
          <div className="TicTacToe__row" key={rowIndex}>
            {row.toArray().map((rowCell, columnIndex) => {
              const className = "TicTacToe__rowCell typ--actionable" + (rowCell ? ` ${rowCell}` : '');
              return (
                <div
                  className={className}
                  key={columnIndex}
                  onClick={() => this.submitMove(rowIndex, columnIndex)}
                />
              );
            })}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game
});

TicTacToe.propTypes = {
  game: map.isRequired,
  dispatch: func.isRequired
};


export default connect(mapStateToProps)(TicTacToe);
