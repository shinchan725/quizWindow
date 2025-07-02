import express from "express";
import { PrismaClient } from '@prisma/client'
import { ITest } from "../services/excelService";


const prisma = new PrismaClient()


class ExcelRepository {

     async CreateExamDetail(testObj : ITest): Promise<number> {
      try {
        const language = await prisma.language.create({
            data:{
                LanguageDescr:"Hindi"
            }
        });
        const subject = await prisma.subject.create({
            data:{
                subjectName:"History"
            }
        });

        let examDetailObj;
        const existingExamDetail = await prisma.examDetail.findFirst({
          where: {
            examName: testObj.examName,
          },
        });
        
        if (existingExamDetail?.examId) {
          examDetailObj = existingExamDetail;
        } else {
          examDetailObj = await prisma.examDetail.create({
            data: {
              examName: testObj.examName,
              iconUrl: "",
              parentId: 0,
              displayRank: 0,
              resourceURL: "",
              status: false,
            },
          });
        }
        

        const testDbObj = await prisma.test.create({
            data:{
                description:testObj.testName,
                year:"",
                examId:examDetailObj.examId
            }
        });
        const testPaperSectionObj = await prisma.testPaperSection.create({
            data:{
               testPaperSectionName: '1',
               testId:testDbObj.testId,
               displayRank:1,
               noOfQuestionnumber:testObj.questions.length,
            }
        });
        let currentquestionDisplayRank = 1;
        for (const question of testObj.questions) {
            const questionDetailObj = await prisma.questionDetail.create({
              data: {
                languageId: language.LanguageId,
                hardness: "Easy",
                questiondetail: question.questionText,
                subjectId: subject.subjectId,
              },
            });
      
            // Save question options
            const optionObj = await prisma.options.create({
              data: {
                  questionDetailId: questionDetailObj.questionDetailId,
                  option1: question.option1.toString(),
                  option2: question.option2.toString(),
                  option3: question.option3.toString(),
                  option4: question.option4.toString(),
                  correctAnswer:question.answer.toString(),
                  explanation:question.explanation
                },
            });
      
            // Continue with other steps (QuestionSectionMap, Concept, QuestionConceptMap)
            const questionSectionMapObj = await prisma.questionSectionMap.create({
                data: {
                   questionId:questionDetailObj.questionDetailId,
                   testPaperSectionId:testPaperSectionObj.testPaperSectionId,
                   questionDisplayRank:currentquestionDisplayRank
                },
              });
              const conceptObj = await prisma.concept.create({
                data: {
                   conceptName:question.explanation
                },
              });
              const questionConceptMapObj = await prisma.questionConceptMap.create({
                data: {
                    conceptId:conceptObj.conceptId,
                    questionDetailId:questionDetailObj.questionDetailId
                },
              });
            // ...
            currentquestionDisplayRank++;
          }
      
          return 1;
        } catch (error) {
          throw error;
        }
      }

  }
  
  export default ExcelRepository;