import mongoose from "mongoose";
const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  university: {
    type: String,
  },

  state: {
    type: String,
    required: true,
  },

  district: {
    type: String,
  },

  type: {
    type: String,
    enum: ["Government", "Private"],
  },

  image: {
    type: String,
  },
});
const College = mongoose.model("College", collegeSchema);
export default College;