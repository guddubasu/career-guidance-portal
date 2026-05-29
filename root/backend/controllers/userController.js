import userModel from "../models/usermodel.js";
//getting user data(another things are also added)
export const getUserData=async(req,res)=>{
    try{
        const user=await userModel.findById(req.userId);
        if(!user){
            return res.json({success:false,message:"User not found"});
        }
        return res.json({
            success:true,
            userData:{
                name:user.name,
                email:user.email,
                isAccountVerified:user.isAccountVerified,
                isProfileCompleted:user.isProfileCompleted,
                familyIncome:user.familyIncome,
                educationBudget:user.educationBudget,
                location:user.location,

                communicationSkills:user.communicationSkills,
                criticalThinkingSkills:user.criticalThinkingSkills,
                timeManagementSkills:user.timeManagementSkills,
                technicalSkills:user.technicalSkills,
                creativeSkills:user.creativeSkills,
                practicalLifeSkills:user.practicalLifeSkills,
                leadershipSkills:user.leadershipSkills,
                academicSkills:user.academicSkills
            }
        })
    }catch(error){
        return res.json({success:false,message:error.message});
    }
}
export const completeProfile = async (req, res) => {

  try {

    const {

      // Environmental & Social Factors
      familyIncome,
      educationBudget,
      location,
      // Skills & Competencies
      communicationSkills,
      criticalThinkingSkills,
      timeManagementSkills,
      technicalSkills,
      creativeSkills,
      practicalLifeSkills,
      leadershipSkills,
      academicSkills,

    } = req.body;



    const user = await userModel.findByIdAndUpdate(

      req.userId,

      {

        familyIncome,
        educationBudget,
        location,

        communicationSkills,
        criticalThinkingSkills,
        timeManagementSkills,
        technicalSkills,
        creativeSkills,
        practicalLifeSkills,
        leadershipSkills,
        academicSkills,
        isProfileCompleted:true

      },

      { new: true }

    );
    // Check user exists
    if (!user) {
      return res.json({
        success: false,
        message: "User not found"
      });

    }
    res.json({

      success: true,
      message: "Profile Completed Successfully",
      user

    });

  } catch (error) {

    console.log(error);

    res.json({

      success: false,
      message: error.message

    });

  }

};