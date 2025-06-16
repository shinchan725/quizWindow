import axiosClient from "../Utils/axios-client";
import { Question } from "../App";

const axiosClientObj = axiosClient();

export const getTestPaper = async (): Promise<Question[]> =>  {
  try {
    const response = await axiosClientObj.get(`testPaper`);
    console.log(response);
    return response.data['data'];
  } catch (error) {
    throw new Error("Error fetching exam data");
  }
};


