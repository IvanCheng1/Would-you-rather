export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_ANSWER_TO_USER = "ADD_ANSWER_TO_USER";
export const ADD_QUESTION_TO_USER = "ADD_QUESTION_TO_USER";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

function addAnswerToUser(authedUser, qid, option) {
  return {
    type: ADD_ANSWER_TO_USER,
    authedUser,
    qid,
    option,
  };
}

function addQuestionToUser(authedUser, qid) {
  return {
    type: ADD_QUESTION_TO_USER,
    authedUser,
    qid,
  };
}

export function handleAddAnswerToUser(qid, option) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(addAnswerToUser(authedUser, qid, option));
  };
}

export function handleAddQuestionToUser(qid) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(addQuestionToUser(authedUser, qid));
  };
}
