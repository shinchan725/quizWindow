import ExamRepository from "../repositories/examRepository";
import { Request, Response } from "express";
import * as XLSX from "xlsx";
import Logger from "../core/Logger";
import ExcelRepository from "../repositories/excelRepository";
const {
  NotFoundError,
  ValidationError,
} = require("../utils/errors/app-errors");

export interface ITest {
    examName: string;
    tenant: string;
    testName: string;
    questions: IQuestion[];
  }

 export  interface IQuestion {
    questionNumber: number;
    language: string;
    questionText: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    answer: string;
    explanation: string;
    subject: string;
    marks: number;
  }
  export  interface IOptions{
    OptionId : number;
    OptionDescr : string ;
  }


  class ExcelService {
    private excelRepository: ExcelRepository;
  
    constructor() {
      this.excelRepository = new ExcelRepository();
    }
  
    async saveExcelData(): Promise<number> {
      try {
        // Fetch exam details from the repository
        const filePath = "E:/indian-professor/iprof-api/src/utils/excel/IndianProfessor_Questions.xlsx";
        const itestObj = await this.getDataFromExcel(filePath);
        const save = await this.excelRepository.CreateExamDetail(itestObj);
        return save;
        
      } catch (error) {
        throw error;
      }
    }
  
    async getDataFromExcel(filePath: string): Promise<ITest> {
      try {
        const excelData = await this.readExcel(filePath);
        return excelData;
      } catch (error) {
        const errorObj = error as Error;
        Logger.error(`500 - ${errorObj.message}`);
        throw errorObj;
      }
    }
  
    private readExcel(filePath: string): ITest {
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);
  
      return this.createTestObject(data);
    }
    private createTestObject(excelData: any[]): ITest {
        const { Tenant, Exam, Test } = excelData[0];
        const questions = this.mapExcelDataToIQuestions(excelData.slice(1));
        const testObject: ITest = {
          examName: Exam,
          tenant: Tenant,
          testName: Test,
          questions: questions,
        };
        return testObject;
    }
    private mapExcelDataToIQuestions(excelData: any[]): IQuestion[] {
      const dataStartingFromFifthRow = excelData.slice(2);
      return dataStartingFromFifthRow.map((row) => ({
        questionNumber: row["Exam"] || "",
        language: row["Test"] || "",
        questionText: row["__EMPTY"] || "",
        option1: row["__EMPTY_1"] || "",
        option2: row["__EMPTY_2"] || "",
        option3: row["__EMPTY_3"] || "",
        option4: row["__EMPTY_4"] || "",
        answer: row["__EMPTY_5"] || "",
        explanation: row["__EMPTY_6"] || "",
        subject: row["__EMPTY_7"] || "",
        marks: parseInt(row["__EMPTY_8"]) || 0,
      }));
    }
  

}

export default ExcelService;
