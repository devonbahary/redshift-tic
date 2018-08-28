import React from 'react';
import { fromJS } from 'immutable';
import { spy } from 'sinon';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { init as gameInit } from '../../redux/reducers/game';

import { TicTacToe } from '../../components/TicTacToe';

Enzyme.configure({ adapter: new Adapter() })

describe('TicTacToe', () => {
  describe('Move submission', () => {
    it('dispatches the appropriate action to the store', () => {
      const dispatch = spy();
      const component = shallow(<TicTacToe dispatch={ dispatch } game={ gameInit } />);

      const input = component.find('.TicTacToe__rowCell').at(1);
      input.simulate('click');

      expect(dispatch.lastCall.args[0]).toEqual({
        type: 'MOVE',
        row: 0,
        column: 1
      });
    });

    it('does not dispatch if row + column combination has already been made', () => {
      const dispatch = spy();
      const testRow = Math.floor(Math.random() * 3);
      const testColumn = Math.floor(Math.random() * 3);
      const playerSymbol = Math.round(Math.random()) === 0 ? 'O' : 'X';
      const modifiedGame = gameInit.setIn(['board', testRow, testColumn], playerSymbol);

      const component = shallow(<TicTacToe dispatch={ dispatch } game={ modifiedGame } />);

      const input = component.find('.TicTacToe__rowCell').at(3 * testRow + testColumn);
      input.simulate('click');

      expect(dispatch.lastCall).toEqual(null);
    });
  });
})
