/**
 *
 *
 * @export
 * @param {any} token
 * @returns
 */
export function twitterFeedActionsSuccess(tweetText) {
  return { type: 'twitterFeedActionsSuccess', tweetText };
}
/*
 * This is a thunk model. the first inner function is the thunk
 *
 * @export
 * @param {any} userId
 * @returns
 */
export function twitterFeedActions(tweet) {
  return function (dispatch) {
    return dispatch(twitterFeedActionsSuccess({ tweet }));
  };
}
