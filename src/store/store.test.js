import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as twitterFeedActions from '../actions/twitterFeedActions';

describe('Store', function () {
  it('Should handle creating courses', function () {
    // arrange
    const store = createStore(rootReducer, initialState);
    const tweet = ['test1', 'test2'];

    // act
    const action = twitterFeedActions.twitterFeedActionsSuccess(tweet);
    store.dispatch(action);

    // assert
    const actual = store.getState().tweet[0];
    const expected = tweet;

    expect(actual).toEqual(expected);
  });
});
