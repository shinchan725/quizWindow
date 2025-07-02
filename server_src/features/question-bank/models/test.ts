import { IQuestion } from "./question";

export interface ITest {
    examName: string;
    tenant: string;
    testName: string;
    questions: IQuestion[];
  }