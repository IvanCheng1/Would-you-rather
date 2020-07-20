import { RECEIVE_QUESTIONS, ADD_QUESTION, ANSWER_QUESTION } from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions,
      };
    case ADD_QUESTION :
      // const { question } = action 
      // console.log("here", action)
      return {
        ...state,
        [action.question.id]: action.question
      }
    case ANSWER_QUESTION :
      console.log("ANSWER state",state)
      console.log("ANSWER action",action)
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat([action.authedUser])
          }
        }
      }
    default :
      return state;
  }
}
