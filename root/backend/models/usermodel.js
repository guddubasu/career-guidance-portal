import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    verifyOTP:{type:String,default:''},
    verifyOTPExpireAt:{type:Number,default:0},
    isAccountVerified:{type:Boolean,default:false},
    resetOTP:{type:String,default:''},
    resetOTPExpireAt:{type:Number,default:0},
    familyIncome: {type: String,default: ""},
    educationBudget: {type: Number,default: 0},
    location: {type: String,default: ""},
    communicationSkills: {type: [String],default: []},
    criticalThinkingSkills: { type:[String],default: []},
    timeManagementSkills: {type: [String],default: []},
    technicalSkills: {type: [String],default: []},
    creativeSkills: {type: [String],default: []},
    practicalLifeSkills: {type: [String],default: []},
    leadershipSkills: {type: [String],default: []},
    academicSkills: {type: [String],default: []},
    isProfileCompleted:{type:Boolean,default:false},
});
const userModel=mongoose.models.user || mongoose.model('user',userSchema);
export default userModel;