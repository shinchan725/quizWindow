import express from "express";
import multer from 'multer'; // Import Multer

import { createExamDetails, deleteExamDetails, getExamDetails, getExamDetailsbyId } from "../controllers/examDetailController";
import { getTestPaperDetails } from "../features/question-bank/controllers/question-controller";
import { saveExcelData, uploadExcelFile } from "../features/question-bank/controllers/excel-upload-controller";
import { getDataFromExcel } from "../controllers/testDetailController";



// Set up multer for handling file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

const router = express.Router();

router.get("/exams",getExamDetails);
router.get("/exams/:examName",getExamDetailsbyId);
router.post("/exams",createExamDetails);
router.delete("/exams/:examName",deleteExamDetails);
router.get("/testPaper",getTestPaperDetails);
router.get("/excelRead",getDataFromExcel);
router.post('/upload-excel', upload.single('excelFile'), uploadExcelFile);
router.get("/saveExcel",saveExcelData);

export default router;
