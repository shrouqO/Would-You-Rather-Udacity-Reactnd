import {ADD_QUESTION, RECEIVE_QUESTIONS, ANSWER_QUESTION} from '../actions/questions';

export default function questions(state = {}, action) {
    switch (action.type) {
      case ADD_QUESTION:
      const { question } = action;
      return {
        ...state,
        [question.id]: question,
      };
      case RECEIVE_QUESTIONS:
        return {
          ...state,
          ...action.questions
        };
        case ANSWER_QUESTION:
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat([action.authedUser]),
          }
        }
      }
        default:
          return state;
    }
 }