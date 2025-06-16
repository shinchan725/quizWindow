import axios from 'axios';
import {IAnswer, IAttemptedTestDetail} from "../App";


export const submitAnswers = async (answers: IAnswer[],
     testId: number,
     studentPhoneNo: number) => {
  const attemptedTestDetail :IAttemptedTestDetail = {
    testId,
    studentPhoneNo,
    answers
  };
  // const response = await axios.post('submitAnswers', attemptedTestDetail);
  // return response.data;
  return "";
};





