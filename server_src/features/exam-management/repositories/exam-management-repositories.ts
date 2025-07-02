import { PrismaClient } from "@prisma/client";
import express from "express";
import { IExam } from "../models/exam";

const prisma = new PrismaClient()

class ExamManagementRepository {

     async CreateExam(exam : IExam): Promise<number> {
        try {
            const existingExamDetail = await prisma.examDetail.findFirst({
              where: {
                examName: exam.examName,
              },
            });
        
            if (existingExamDetail?.examId) {
              await prisma.examDetail.update({
                where: {
                  examId: existingExamDetail.examId,
                },
                data: {
                  iconUrl: exam.iconUrl,
                  parentId: exam.parentId,
                  displayRank: exam.displayRank,
                  resourceURL: exam.resourceURL,
                  status: exam.status,
                },
              });
            } else {
              // Create a new record
              await prisma.examDetail.create({
                data: {
                  examName: exam.examName,
                  iconUrl: exam.iconUrl,
                  parentId: exam.parentId,
                  displayRank: exam.displayRank,
                  resourceURL: exam.resourceURL,
                  status: exam.status,
                },
              });
            }
        
            return 1; // Return a success status
          } catch (error) {
            throw error;
          } finally {
            await prisma.$disconnect(); // Clean up Prisma connection
          }
     }
     
     

  }
  
  export default ExamManagementRepository;