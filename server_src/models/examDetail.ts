import mongoose from "mongoose"

export interface IExamDetails {
    examName: string;
    iconUrl: string;
    parentId: string;
    displayRank: number;
    resourceURL: string;
    status: string;
}


interface IExamDetail extends Document {
    examName: string;
    iconUrl: string;
    parentId: string;
    displayRank: string;
    resourceURL: string;
    status: string;
  }

const examDetailSchema = new mongoose.Schema({
    examName:{
        type:String,
    },
    iconUrl:{
        type:String
    },
    parentId:{
        type:String
    },
    displayRank:{
        type:String
    },
    resourceURL:{
        type:String
    },
    status:{
        type:String
    }

},{
    timestamps:true
});

export const ExamDetailModel = mongoose.model<IExamDetail>("ExamDetail",examDetailSchema);