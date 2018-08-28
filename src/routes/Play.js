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
