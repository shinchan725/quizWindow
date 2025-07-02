import ExamRepository from "../repositories/examRepository";
import { ExamDetailModel, IExamDetails } from "../models/examDetail";
const {
  NotFoundError,
  ValidationError,
} = require("../utils/errors/app-errors");

class ExamDetailService {
  private examRepository: ExamRepository;
  constructor() {
    this.examRepository = new ExamRepository();
  }
  async getExamDetails() {
    try{
      return await this.examRepository.getExamDetails();
    }catch(error){
      throw error;
    }
  
  }
  async getExamDetailById( examName:string ) {
    try{
      return await this.examRepository.getExamDetailById(examName);
    }catch(error){
      throw error;
    }
   

  }

  async CreateExamDetail(examDetail: IExamDetails) {
    try{
      const newExamDetail = await this.examRepository.CreateExamDetail(examDetail);
      return newExamDetail; 
    }catch(error){
      throw error;
    }

  }
  async DeleteExamDetailByExamName(examName:string) {
    try{
      return await this.examRepository.DeleteExamDetailByExamName(examName);
    }catch(error){
      throw error;
    }

  }

}

export default ExamDetailService;
