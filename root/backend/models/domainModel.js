import mongoose from "mongoose";
const careerSchema = new mongoose.Schema({
  career_id: {type: String,required: true},
  career_name: {type: String,required: true},
  career_description: {type: String,required: true},
  expected_income: {type: String,required: true},
  personal_competencies: [String],
  entry_pathway: [String],
  where_will_you_study_description: { type: String, required: true },
  government_institutes: [String],
  private_institutes: [String],
  fees: { type: String, required: true },
  place_of_work: { type: String, required: true },
  work_environment: { type: String, required: true },
  expected_growth_path: [String],
});
const domainSchema = new mongoose.Schema({
  domain_id: {type: Number,required: true,unique: true},
  domain_name: {type: String,required: true},
  themeColor:{type:String,default: "#2563EB",required:true},
  careers: [careerSchema]
});
const domainModel = mongoose.model("Domain", domainSchema);
export default domainModel;