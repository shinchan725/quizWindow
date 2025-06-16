// import React, { useEffect, useState } from "react";
// import './App.css';
// import { getTestPaper } from "./services/exam-management-service";
// import { submitAnswers } from "./services/answer-management";


// export interface Question {
//   LanguageDescr:String
//   correctAnswer:number
//   description:String
//   examName:String
//   explanation:String
//   hardness:String
//   option1:String
//   option2:String
//   option3:String
//   option4:String
//   questionDetailId:number
//   questionDisplayRank:number
//   questiondetail:String
//   subjectName:String
//   testPaperSectionName:number
// }

// export interface QuestionDetail {
//   question : Question;
//   status?: string;
//   options?: String[];
// }

// export interface IAnswer{
//   questionId : number;
//   answer : string;
// }

// export interface Response {
//   data: Question[];
// }

// export interface IAttemptedTestDetails{
//   testId :number;
//   studentPhoneNo: number;
//   answers:IAnswer[];
// }

// function App() {
//   const [questions, setQuestions] = useState<QuestionDetail[]>([]);
//   const [currentquestionDetailId, setCurrentquestionDetailId] = useState<number>(0);
//   const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: number | null }>({});
//   const [answer, setselectedanswer] = useState<IAnswer[]>();
//   const [attemptedTestDetails, setAttemptedTestDetails] = useState<IAttemptedTestDetails>();  

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       let response = null;
//       try 
//       {
//         response = await getTestPaper();
//         const result  = response;
//         if(Array.isArray(result)){
//           result.sort((a: Question, b: Question) => 
//             a.questionDisplayRank - b.questionDisplayRank);
//           const initializedQuestions: QuestionDetail[] = result.map((question: Question) => ({
//             question: question,
//             status: 'notVisited',
//             options: [question.option1, 
//                       question.option2,
//                       question.option3, 
//                       question.option4]
//           }));
//           setQuestions(initializedQuestions);
//         }else{
//           console.log('Result is not an array');
//         }

        
        
//       }catch (error )
//       {
//         console.error('Error fetching from testPaper API:', error);
//       }
//     };

//     fetchQuestions();
//   }, []);

  


//   const handlePrev = () => {
//     setCurrentquestionDetailId((prev:number) => {
//       if (prev > 0) 
//       {
//         updateQuestionStatus(prev - 1);
//         return prev - 1;
//       } 
//       else 
//       {
//         return 0;
//       }
//     });
//   };

//   const handleNext = () => {
//     setCurrentquestionDetailId((prev:number) => {
//       if (prev < questions.length - 1)
//       {
//         updateQuestionStatus(prev + 1);
//         return prev + 1;
//       } 
//       else 
//       {
//         return prev;
//       }
//     });    
//   };

//   const updateQuestionStatus = (questionDetailId: number) => {
//     setQuestions(prevQuestions =>
//       prevQuestions.map((question, index:number) => {
//         if (index === questionDetailId) {
//           if (selectedOptions[questionDetailId] === undefined) 
//           {
//             return { ...question, status: 'notAnswered' };
//           } 
//           else if (selectedOptions[questionDetailId] === null) 
//           {
//             return { ...question, status: 'notAnswered' };
//           }
//           else 
//           {
//             return { ...question, status: 'answered' };
//           }
//         }
//         return question;
//       })
//     );
//   };

//   const handleSaveAndNext = () => {
//     setQuestions(prevQuestions =>
//       prevQuestions.map((question, index) =>{
//       if(index === currentquestionDetailId)
//       {
//         return{ ...question, status: 'answered' }
//       }
//       else
//       {
//         return question;
//       }
//      })
//     );
//     handleNext();
//   };

//   const handleClear = () => {
    
//     setQuestions(prevQuestions =>
//       prevQuestions.map((question, index) =>{
//         if((index) === currentquestionDetailId )
//         {
//           setSelectedOptions(prevSelectedOptions => ({
//           ...prevSelectedOptions,[currentquestionDetailId +1]: null}));
//           return{ ...question, status: 'notAnswered' }
//         }
//         else
//         {
//           return question;
//         }
//        })
//     );
//   };

//   const handleSaveAndMarkForReview = () => {
//     setQuestions(prevQuestions =>
//       prevQuestions.map((question, index) =>{
//         if(index === currentquestionDetailId)
//         {
//           return{ ...question, status: 'answeredAndMarkedForReview' }
//         }
//         else
//         {
//           return question;
//         }
//        })
//     );
//     handleNext();
//   };

//   const handleMarkForReviewAndNext = () => {
//     setQuestions(prevQuestions =>
//       prevQuestions.map((question, index) =>{
//         if(index === currentquestionDetailId)
//         {
//           return{ ...question, status: 'markedForReview' }
//         }
//         else
//         {
//           return question;
//         }
//        })
//     );
//     handleNext();
//   };

//   const handleSubmit = () => {
//     alert("The exam will be submitted");
//     const attemptedTestDetails : IAttemptedTestDetails = {
//       testId:12345 ,
//       studentPhoneNo: 9876543210,
//       answers: []
//     }
//   };

//   const handleOptionChange = (questionDetailId: number, optionNo: number) => {
//     setSelectedOptions(prevSelectedOptions => ({
//       ...prevSelectedOptions,
//       [questionDetailId]: optionNo,
//     }));
//     setQuestions(prevQuestions =>
//       prevQuestions.map((question, index) =>{
//         if(index === currentquestionDetailId)
//         {
//           return{ ...question, status: 'answered' }
//         }
//         else
//         {
//           return question;
//         }
//        })
//     );
//   };

//   const handleSaveAnswer = async (questionDetailId: number, optionNo: number) => {
//     try {
//       const answer: IAnswer = {
//         questionId:questionDetailId,
//         answer:optionNo.toString()

//       };
      
//     }catch (error) {
//       console.log("answer not saved")
//     }
//   };

//   const getButtonStyle = (status: string) => {
//     if (status === 'notVisited') {
//       return {
//         backgroundColor: '#ccc',
//         borderRadius: '10%',
//       };
//     } else if (status === 'notAnswered') {
//       return {
//         backgroundColor: 'red',
//         clipPath: 'polygon(0% 0%, 100% 30%, 100% 70%, 0% 100%)',
//       };
//     } else if (status === 'answered') {
//       return {
//         backgroundColor: 'green',
//         clipPath: 'polygon(0% 0%, 100% 30%, 100% 70%, 0% 100%)',
//       };
//     } else if (status === 'markedForReview') {
//       return {
//         backgroundColor: 'purple',
//         borderRadius: '100%',
//       };
//     } else if (status === 'answeredAndMarkedForReview') {
//       return {
//         backgroundColor: 'violet',
//         borderRadius: '100%',
//       };
//     }
//     return {};
//   };


//   return (
//     <div className="container">
//       <div id="heading-breadcrumbs">
//         <div className="user-info">
//           <div className="row">
//             <div className="col-md-1">
//               <div className="picture">
//                 <picture className="candidate_picture" style={{ height: '100%', width: '100%' }}>
//                   <img src="https://cdn.pixabay.com/photo/2017/01/08/21/37/flame-1964066_1280.png" className="img-fluid img-thumbnail" alt="profile image" />
//                 </picture>
//               </div>
//             </div>
//             <div className="col-md-8" style={{ color: "black", backgroundColor: "beige" }}>
//               <div className="row">
//                 <div className="col-sm-3"><strong>Candidate Name</strong></div>
//                 <div className="col-sm-3" style={{ color: '#f7931e', fontWeight: 'bold' }}><strong>Shivasunu</strong></div>
//               </div>
//               <div className="row">
//                 <div className="col-sm-3"><strong>Exam Name</strong></div>
//                 <div className="col-sm-3" style={{ color: '#f7931e', fontWeight: 'bold' }}><strong>UGC-NET</strong></div>
//               </div>
//               <div className="row">
//                 <div className="col-sm-3"><strong>Subject</strong></div>
//                 <div className="col-sm-4" style={{ color: '#f7931e', fontWeight: 'bold' }}><strong>English paper 2-Dec-2019</strong></div>
//               </div>
//               <div className="row">
//                 <div className="col-sm-3"><strong>Remaining Time</strong></div>
//                 <div className="col-sm-3" style={{ color: '#f7931e', fontWeight: 'bold' }}><strong>03:00:00</strong></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="row" style={{ marginTop: "2%" }}>
//         <div className="col-sm-8 mb-3 mb-sm-0">
//           <div className="card">
//             <div className="card-body">
//               <div id="carouselExample" className="carousel slide" style={{ width: '100%', padding: '7%' }}>
//                 <div className="row">
//                   <div className="col-md-1">
//                     <button className="carousel-control-prev btn btn-secondary" type="button" onClick={handlePrev}>
//                       <span>&lt;</span>
//                     </button>
//                   </div>
//                   <div className="col-md-10" style={{ marginLeft: '4%' }}>
//                     <div className="carousel-inner-active">
//                       {questions.map((question, questionDetailId) => (
//                         <div key={question.question.questionDetailId} className={`carousel-item ${questionDetailId === currentquestionDetailId ? 'active' : ''}`}>
//                           <div className="question">
//                             <h2>Question {question.question.questionDetailId}:</h2>
//                             <p>{question.question.questiondetail}</p>
//                             <div className="options">
//                               {question.options?.map((option, optionNo) => (
//                                 <div key={optionNo}>
//                                   <div className="row">
//                                     <div className="col-md-1">
//                                       <input
//                                         type="radio"
//                                         name={`answer${question.question.questionDetailId}`}
//                                         id={`option${optionNo}`}
//                                         checked={selectedOptions[question.question.questionDetailId] === optionNo}
//                                         onChange={() => handleOptionChange(question.question.questionDetailId, optionNo)}
//                                       />
//                                     </div>
//                                     <div className="col-md-10">
//                                       <label>{option}</label>
//                                     </div>
//                                   </div>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                   <div className="col-md-1">
//                     <button className="carousel-control-next btn btn-secondary" type="button" onClick={handleNext}>
//                       <span className="" /> &gt;
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="col-sm-4">
//           <div className="row-md-3">
//             <div className="card">
//               <div className="card-body">
//                 <div className="row">
//                   <div className="col-md-6" >
//                     <button className="btn" id="NV" >NV</button>
//                     <label style={{ fontSize: '80%', padding: '5%' }}>Not Visited</label>
//                   </div>

//                   <div className="col-md-6" >
//                     <button className="btn" id="NA" >NA</button>
//                     <label style={{ fontSize: '80%', padding: '7%' }}>Not Answered</label>
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="col-md-6" >
//                     <button className="btn" id="A" >A</button>
//                     <label style={{ fontSize: '80%', padding: '5%' }}>Answered</label>
//                   </div>

//                   <div className="col-md-6" >
//                     <button className="btn" id="MR" >MR</button>
//                     <label style={{ fontSize: '80%', padding: '7%' }}>Mark for Review</label>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-md-12" >
//                     <button className="btn" id="AM" >AM</button>
//                     <label style={{ fontSize: '80%', padding: '5%' }}>Answered and marked for review</label>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="row-md-3" style={{ marginTop: "8.5%" }}>
//             <div className="card" style={{ height: "0.5%" }}>
//               <div className="card-body">
//                 <div className="grid-container">
//                   {questions.map((question, questionDetailId) => (
//                     <div key={question.question.questionDetailId} className="grid-item">
//                       <button
//                         className="btn btn-sm"
//                         onClick={() => {
//                           updateQuestionStatus(question.question.questionDetailId-1);
//                           setCurrentquestionDetailId(question.question.questionDetailId-1);
//                         }}
//                         style={{ ...getButtonStyle(question.status || ''), width: '100%' }}>
//                         {question.question.questionDetailId}
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="buttons">
//         <button className="save" onClick={handleSaveAndNext}>SAVE & NEXT</button>
//         <button className="clear" onClick={handleClear}>CLEAR</button>
//         <button className="mark" onClick={handleSaveAndMarkForReview}>SAVE & MARK FOR REVIEW</button>
//         <button className="mark" onClick={handleMarkForReviewAndNext}>MARK FOR REVIEW & NEXT</button>
//       </div>

//       <div>
//         <div className="navigation">
//           <div className="col-md-8">
//             <button className="back" onClick={handlePrev} style={{ marginRight: '5%' }}>&lt;&lt; BACK</button>
//             <button className="next" onClick={handleNext}>NEXT &gt;&gt;</button>
//           </div>

//           <div className="col-md-3">
//             <div className="submit-button" style={{ padding: "3%" }} onClick={handleSubmit}>
//               SUBMIT
//             </div>
//           </div>
//         </div>
//       </div>
//       <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
//       <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
//     </div>
//   );
// }

// export default App;





























import React, { useEffect, useState } from "react";
import './App.css';
import { getTestPaper } from "./services/exam-management-service";
import { submitAnswers } from "./services/answer-management-service";



export interface Question {
  LanguageDescr:String
  correctAnswer:number
  description:String
  examName:String
  explanation:String
  hardness:String
  option1:String
  option2:String
  option3:String
  option4:String
  questionDetailId:number
  questionDisplayRank:number
  questiondetail:String
  subjectName:String
  testPaperSectionName:number
}

export interface QuestionDetail {
  question : Question;
  status?: string;
  options?: String[];
}

export interface IAnswer{
  questionId : number;
  answer : string;
}

export interface Response {
  data: Question[];
}

export interface IAttemptedTestDetail{
  testId :number;
  studentPhoneNo: number;
  answers:IAnswer[];
}


export class Student {
  phoneNo: number = 0;
  answer: string = '';
  testId: number = 0;
}

function App() {
  const [questions, setQuestions] = useState<QuestionDetail[]>([]);
  const [currentquestionDetailId, setCurrentquestionDetailId] = useState<number>(1);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: number | null }>({});
  const [answers, setselectedanswers] = useState<IAnswer[]>();
  const [attemptedTestDetails, setAttemptedTestDetails] = useState<IAttemptedTestDetail>();  
  const [student, setStudent] = useState<Student[]>([]);
  let selectedAnswers: IAnswer[] = [];

  useEffect(() => {
    const fetchQuestions = async () => {
      let response = null;
      try 
      {
        response = await getTestPaper();
        const result  = response;
        if(Array.isArray(result)){
          result.sort((a: Question, b: Question) => 
            a.questionDisplayRank - b.questionDisplayRank);
          const initializedQuestions: QuestionDetail[] = result.map((question: Question, index: number) => ({
            question: question,
            status: index === 0 ? 'notAnswered' : 'notVisited',
            options: [question.option1, 
                      question.option2,
                      question.option3, 
                      question.option4]
          }));
          setQuestions(initializedQuestions);
        }else{
          console.log('Result is not an array');
        }
      }catch (error )
      {
        console.error('Error fetching from testPaper API:', error);
      }
    };

    fetchQuestions();
  }, []);



  // const student: Student[] = [];
  // const handleArray = (phoneNo: number, answer: string, testId: number) => {
  //  setStudent( prevStudent => {
  //   const existingStudent = prevStudent.filter(p => p.answer === answer);

  //   if (existingStudent.length > 0) {
  //     const updateStudent = [...prevStudent]
  //       existingStudent.forEach(student => {
  //           student.phoneNo = phoneNo;
  //           student.testId = testId;
  //       });
  //   } else {
  //       const newStudent = new Student();
  //       newStudent.phoneNo = phoneNo;
  //       newStudent.answer = answer;
  //       newStudent.testId = testId;
  //       student.push(newStudent);
  //   }
  //  })
  // }
  

  const handleArray = (phoneNo: number, answer: string, testId: number) => {
    setStudent(prevStudent => {
      const existingStudentIndex = prevStudent.findIndex(p => p.answer === answer);
      if (existingStudentIndex !== -1) {
        const updatedStudents = [...prevStudent];
        updatedStudents[existingStudentIndex] = {
          ...updatedStudents[existingStudentIndex],
          phoneNo,
          testId,
        };
        return updatedStudents;
      } else {
        const newStudent = new Student();
        newStudent.phoneNo = phoneNo;
        newStudent.answer = answer;
        newStudent.testId = testId;
        return [...prevStudent, newStudent];
      }
    });
  };
  
  handleArray(1234567890, 'Answer1', 1);
  handleArray(1234567890, 'Answer2', 2);
  handleArray(1234567890, 'Answer1', 3);
  
  


  const clearSelectedOptionState = () => {
    setSelectedOptions({});
  };

  const handlePrev = () => {
    setCurrentquestionDetailId((prev:number) => {
      if (prev > 0) 
      {
        updateQuestionStatus(prev - 1);
        return prev - 1;
      } 
      else 
      {
        return 0;
      }
    });
  };

  const handleNext = () => {
    clearSelectedOptionState();
    setCurrentquestionDetailId((prev:number) => {
      if (prev < questions.length - 1)
      {
        updateQuestionStatus(prev + 1);
       
        return prev + 1;
      } 
      else 
      {
        return prev;
      }
    });    
  };

  const updateQuestionStatus = (questionDetailId: number) => {
    setQuestions(prevQuestions =>
      prevQuestions.map((question, index:number) => {
         if (question.question.questionDetailId === questionDetailId) {
          
           questions.map((question) => {
             if (
               question.question.questionDetailId === questionDetailId &&
               question.status !== "answered"
             ) {
               question.status = "notAnswered";
             }
           });

           switch (question.status) {
             case "notAnswered":
               return { ...question, status: "notAnswered" };
             case "answered":
               return { ...question, status: "answered" };
             default:
               break;
           }
         }

         return question;
      })
    );
  };
  

  const handleSaveAndNext = () => {
    setQuestions(prevQuestions =>
      prevQuestions.map((question, index) =>{
      if(question.question.questionDetailId === currentquestionDetailId)
      {
        if(selectedAnswers.filter( x=>x.questionId === currentquestionDetailId)){
          let answer :IAnswer = {
            questionId: question.question.questionDetailId,
            answer: selectedOptions[question.question.questionDetailId]?.toString() || ''
         }
          selectedAnswers.push(answer) ;
          setselectedanswers(selectedAnswers);
        } else {
        //   let newAnswer : IAnswer = {
        //     questionId: question.question.questionDetailId,
        //     answer: selectedOptions[question.question.questionDetailId]?.toString() || ''
        //  }
        //  selectedAnswers.push(newAnswer);
        }
        return{ ...question, status: 'answered' }
      }
      else
      {
        return question;
      }
     })
    );
    handleNext();
  };

  const handleClear = () => {
    setQuestions(prevQuestions =>
      prevQuestions.map((question, index) =>{
        if((question.question.questionDetailId) === currentquestionDetailId )
        {
          setSelectedOptions(prevSelectedOptions => ({
          ...prevSelectedOptions,[currentquestionDetailId ]: null}));
          return{ ...question, status: 'notAnswered' }
        }
        else
        {
          return question;
        }
       })
    );
  };

  const handleSaveAndMarkForReview = () => {
    setQuestions(prevQuestions =>
      prevQuestions.map((question, index) =>{
        if(question.question.questionDetailId === currentquestionDetailId)
        {
          return{ ...question, status: 'answeredAndMarkedForReview' }
        }
        else
        {
          return question;
        }
       })
    );
    handleNext();
  };

  const handleMarkForReviewAndNext = () => {
    setQuestions(prevQuestions =>
      prevQuestions.map((question, index) =>{
        if(question.question.questionDetailId === currentquestionDetailId)
        {
          return{ ...question, status: 'markedForReview' }
        }
        else
        {
          return question;
        }
       })
    );
    handleNext();
  };

  const handleSaveAnswer = () => {
    const answers: IAnswer[] = questions.map(question => ({
      questionId: question.question.questionDetailId,
      answer: selectedOptions[question.question.questionDetailId]?.toString() || ''
    }));
    return answers;
  };

  const handleSubmit = async () => {
    alert("The exam will be submitted");

    const attemptedTestDetails : IAttemptedTestDetail = {
      testId:12345 ,
      studentPhoneNo: 9876543210,
      answers: answers ?? []
    }
    try {
      const response = await submitAnswers(attemptedTestDetails.answers, 
                      attemptedTestDetails.testId,
                      attemptedTestDetails.studentPhoneNo);
      console.log('Submit response:', response);
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };


  const handleOptionChange = (questionDetailId: number, optionNo: number) => {
    setSelectedOptions(prevSelectedOptions => ({
      ...prevSelectedOptions,
      [questionDetailId]: optionNo,
    }));
    setQuestions(prevQuestions =>
      prevQuestions.map((question, index) =>{
        if(question.question.questionDetailId === questionDetailId)
        {
          question.status='answered';
          return{ ...question, status: 'answered' }
        }
        else
        {
          return question;
        }
       })
    );
  };

  

  const getButtonStyle = (status: string) => {
    if (status === 'notVisited' ) {
      return {
        backgroundColor: '#ccc',
        borderRadius: '10%',
      };
    } else if (status === 'notAnswered') {
      return {
        backgroundColor: 'red',
        clipPath: 'polygon(0% 0%, 100% 30%, 100% 70%, 0% 100%)',
      };
    } else if (status === 'answered') {
      return {
        backgroundColor: 'green',
        clipPath: 'polygon(0% 0%, 100% 30%, 100% 70%, 0% 100%)',
      };
    } else if (status === 'markedForReview') {
      return {
        backgroundColor: 'purple',
        borderRadius: '100%',
      };
    } else if (status === 'answeredAndMarkedForReview'  ) {
      return {
        backgroundColor: 'violet',
        borderRadius: '100%',
      };
    }
    return {};
  };


  handleArray(12345,'hj',4);
  handleArray(12345,'j',4);


  const handlePrint =() => {
    console.log(Student);

  }


  return (
    <div className="container">
      <div id="heading-breadcrumbs">
        <div className="user-info">
          <div className="row">
            <div className="col-md-1">
              <div className="picture">
                <picture className="candidate_picture" style={{ height: '100%', width: '100%' }}>
                  <img src="https://cdn.pixabay.com/photo/2017/01/08/21/37/flame-1964066_1280.png" className="img-fluid img-thumbnail" alt="profile image" />
                </picture>
              </div>
            </div>
            <div className="col-md-8" style={{ color: "black", backgroundColor: "beige" }}>
              <div className="row">
                <div className="col-sm-3"><strong>Candidate Name</strong></div>
                <div className="col-sm-3" style={{ color: '#f7931e', fontWeight: 'bold' }}><strong>Shivasunu</strong></div>
              </div>
              <div className="row">
                <div className="col-sm-3"><strong>Exam Name</strong></div>
                <div className="col-sm-3" style={{ color: '#f7931e', fontWeight: 'bold' }}><strong>UGC-NET</strong></div>
              </div>
              <div className="row">
                <div className="col-sm-3"><strong>Subject</strong></div>
                <div className="col-sm-4" style={{ color: '#f7931e', fontWeight: 'bold' }}><strong>English paper 2-Dec-2019</strong></div>
              </div>
              <div className="row">
                <div className="col-sm-3"><strong>Remaining Time</strong></div>
                <div className="col-sm-3" style={{ color: '#f7931e', fontWeight: 'bold' }}><strong>03:00:00</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row" style={{ marginTop: "2%" }}>
        <div className="col-sm-8 mb-3 mb-sm-0">
          <div className="card">
            <div className="card-body">
              <div id="carouselExample" className="carousel slide" style={{ width: '100%', padding: '7%' }}>
                <div className="row">
                  <div className="col-md-1">
                    <button className="carousel-control-prev btn btn-secondary" type="button" onClick={handlePrev}>
                      <span>&lt;</span>
                    </button>
                  </div>
                  <div className="col-md-10" style={{ marginLeft: '4%' }}>
                    <div className="carousel-inner-active">
                      {questions.map((question, questionDetailId) => (
                        <div key={question.question.questionDetailId} className={`carousel-item ${question.question.questionDetailId === currentquestionDetailId ? 'active' : ''}`}>
                          <div className="question">
                            <h2>Question {question.question.questionDetailId}:</h2>
                            <p>{question.question.questiondetail}</p>
                            <div className="options">
                              {question.options?.map((option, optionNo) => (
                                <div key={optionNo}>
                                  <div className="row">
                                    <div className="col-md-1">
                                      <input
                                        type="radio"
                                        name={`answer${question.question.questionDetailId}`}
                                        id={`option${optionNo}`}
                                        checked={selectedOptions[question.question.questionDetailId] === optionNo}
                                        onChange={() => handleOptionChange(question.question.questionDetailId, optionNo)}
                                      />
                                    </div>
                                    <div className="col-md-10">
                                      <label>{option}</label>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-md-1">
                    <button className="carousel-control-next btn btn-secondary" type="button" onClick={handleNext}>
                      <span className="" /> &gt;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-4">
          <div className="row-md-3">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6" >
                    <button className="btn" id="NV" >NV</button>
                    <label style={{ fontSize: '80%', padding: '5%' }}>Not Visited</label>
                  </div>

                  <div className="col-md-6" >
                    <button className="btn" id="NA" >NA</button>
                    <label style={{ fontSize: '80%', padding: '7%' }}>Not Answered</label>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6" >
                    <button className="btn" id="A" >A</button>
                    <label style={{ fontSize: '80%', padding: '5%' }}>Answered</label>
                  </div>

                  <div className="col-md-6" >
                    <button className="btn" id="MR" >MR</button>
                    <label style={{ fontSize: '80%', padding: '7%' }}>Mark for Review</label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12" >
                    <button className="btn" id="AM" >AM</button>
                    <label style={{ fontSize: '80%', padding: '5%' }}>Answered and marked for review</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row-md-3" style={{ marginTop: "8.5%" }}>
            <div className="card" style={{ height: "0.5%" }}>
              <div className="card-body">
                <div className="grid-container">
                  {questions.map((question, questionDetailId) => (
                    <div key={question.question.questionDetailId} className="grid-item">
                      <button
                        className="btn btn-sm"
                        onClick={() => {
                          updateQuestionStatus(question.question.questionDetailId);
                          setCurrentquestionDetailId(question.question.questionDetailId);
                        }}
                        style={{ ...getButtonStyle(question.status || ''), width: '100%' }}>
                        {question.question.questionDetailId}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="buttons">
        <button className="save" onClick={handleSaveAndNext}>SAVE & NEXT</button>
        <button className="clear" onClick={handleClear}>CLEAR</button>
        <button className="mark" onClick={handleSaveAndMarkForReview}>SAVE & MARK FOR REVIEW</button>
        <button className="mark" onClick={handleMarkForReviewAndNext}>MARK FOR REVIEW & NEXT</button>
      </div>


      <div>
        <div className="navigation">
          <div className="col-md-8">
            <button className="back" onClick={handlePrev} style={{ marginRight: '5%' }}>&lt;&lt; BACK</button>
            <button className="next" onClick={handleNext}>NEXT &gt;&gt;</button>
          </div>


          <div className="col-md-3">
            <div className="submit-button" style={{ padding: "3%" }} onClick={handleSubmit}>
              SUBMIT
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-2">
        <div className="print-button" style={{ padding: "3%" }} onClick={() => handlePrint}>
          PRINT
        </div>
      </div>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
    </div>
  );
}

export default App;





