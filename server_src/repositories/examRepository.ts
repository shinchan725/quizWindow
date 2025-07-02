import express from "express";
import { ExamDetailModel } from "../models/examDetail";

interface IExamDetail {
  examName: string;
  iconUrl: string;
  parentId: string;
  displayRank: number;
  resourceURL: string;
  status: string;
}

class ExamRepository {
  async getExamDetails() {
    try {
      const existingCustomer = await ExamDetailModel.find().sort({
        createdAt: -1,
      });
      return existingCustomer;
    } catch (error) {
      throw error;
    }
  }

  async getExamDetailById(examName: string) {
    try {
      const existingExamDetail = await ExamDetailModel.find({
        examName: examName,
      });
      return existingExamDetail;
    } catch (error) {
      throw error;
    }
  }

  async CreateExamDetail({
    examName,
    iconUrl,
    parentId,
    displayRank,
    resourceURL,
    status,
  }: IExamDetail): Promise<any> {
    const newExamDetail = new ExamDetailModel({
      examName,
      iconUrl,
      parentId,
      displayRank,
      resourceURL,
      status,
    });
    try {
      const examDetailCreated = await ExamDetailModel.create(newExamDetail);
      return examDetailCreated;
    } catch (error) {
      throw error;
    }
  }

  async DeleteExamDetailByExamName(examName: string) {
    return await ExamDetailModel.findByIdAndDelete({ _id: examName });
  }
}

export default ExamRepository;
