import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CareerAssessment.css";

const factors = [
"technology_interest",
"business_interest",
"arts_creativity",
"helping_people",
"research_interest",
"entrepreneurship_mindset",
"outdoor_preference",
"public_speaking",
"logical_reasoning",
"creativity",
"leadership",
"sports_interest",
"teaching_interest",
"hands_on_work"
];

const factorQuestions = {

technology_interest:
"How interested are you in technology, coding, computers, or building digital solutions?",

business_interest:
"How interested are you in business, management, finance, or running organizations?",

arts_creativity:
"How much do you enjoy creative activities such as design, writing, music, or art?",

helping_people:
"How strongly do you enjoy helping, guiding, or supporting other people?",

research_interest:
"How interested are you in researching, analyzing problems, or discovering new ideas?",

entrepreneurship_mindset:
"How interested are you in starting your own business or taking initiative?",

outdoor_preference:
"How much do you prefer working outdoors rather than at a desk?",

public_speaking:
"How comfortable are you speaking, presenting, or communicating in front of groups?",

logical_reasoning:
"How confident are you in solving logical problems or analytical thinking?",

creativity:
"How often do you think of new ideas or creative solutions?",

leadership:
"How comfortable are you leading teams or making decisions for others?",

sports_interest:
"How interested are you in sports, fitness, or physical activities?",

teaching_interest:
"How much do you enjoy teaching, mentoring, or explaining concepts to others?",

hands_on_work:
"How much do you enjoy practical work such as repairing, building, or operating equipment?"
};



const domainMap = {

IT_Software:1,

Core_Engineering:2,

Healthcare_Medicine:3,

Commerce_Business_Management:4,

Law_Legal_Services:5,

Arts_Design:6,
Arts_Design_Creative_Fields:6,

Media_Entertainment:7,
Media_Communication_Entertainment:7,

Education:8,
Education_Teaching:8,

Government_Public_Services:9,

Finance_Banking:10,

Agriculture_Environment:11,

Travel_Tourism_Hospitality:12,

Sports_Fitness:13,

Skilled_Trades:14,
Skilled_Trades_Vocational_Careers:14,

Psychology_Social_Work:15,

Administrative_Support:16,
Administrative_Support_Roles:16,

Emerging_Modern_Careers:17,

Entrepreneurship_Freelancing:18,

Pure_Sciences:19,

Entrepreneurship:20

};



function CareerAssessment(){

const navigate = useNavigate();

const initialValues = {};

factors.forEach(
f => initialValues[f]=0.5
);


const [values,setValues] =
useState(initialValues);

const [loading,setLoading] =
useState(false);

const [prediction,setPrediction] =
useState(null);

const [validationErrors,
setValidationErrors] =
useState([]);




const handleChange =
(factor,value)=>{

setValues(prev=>({
...prev,
[factor]:parseFloat(value)
}));

};




const handlePredict = async () => {

    try {

        setLoading(true);

        setPrediction(null);

        setValidationErrors([]);

        const response = await fetch(

            "http://127.0.0.1:5000/predict",

            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(values)
            }
        );

        // =====================================
        // READ RESPONSE JSON FIRST
        // =====================================

        const data = await response.json();

        // =====================================
        // BACKEND ERROR
        // =====================================

        if (!response.ok) {

            // Validation errors

            if (data.validation?.issues) {

                setValidationErrors(

                    data.validation.issues
                );

            }

            // Generic issues

            else if (data.issues) {

                setValidationErrors(
                    data.issues
                );

            }

            else {

                setValidationErrors([

                    "Backend request failed."
                ]);
            }

            return;
        }

        // =====================================
        // VALIDATION FAILED
        // =====================================

        if (!data.success) {

            if (data.validation?.issues) {

                setValidationErrors(

                    data.validation.issues
                );

            } else {

                setValidationErrors([

                    "Profile validation failed."
                ]);
            }

            return;
        }

        // =====================================
        // PREDICTION CHECK
        // =====================================

        if (!data.predicted_domain) {

            setValidationErrors([

                "Prediction unavailable."
            ]);

            return;
        }

        // =====================================
        // SUCCESS
        // =====================================

        setPrediction(data);

    }

    catch (error) {

        console.log(error);

        setValidationErrors([

            "Unable to connect to backend."
        ]);
    }

    finally {

        setLoading(false);
    }
};






return(

<div className="assessment-container">

<h1>

Career Assessment

</h1>



{

factors.map(factor=>(

<div
key={factor}
className="slider-box"
>

<label>

{

factorQuestions[factor]

}

</label>



<div
className="slider-row"
>

<span>0</span>


<input

type="range"

min="0"

max="1"

step="0.1"

value={

values[factor]

}

onChange={(e)=>

handleChange(

factor,

e.target.value

)

}

/>


<span>1</span>

</div>



<p>

{

values[factor]

.toFixed(1)

}

</p>

</div>

))

}




<button

className="predict-btn"

onClick={handlePredict}

disabled={loading}

>

{

loading

?

"Predicting..."

:

"Predict Career"

}

</button>





{/* Validation */}

{

validationErrors.length>0 && (

<div className="error-box">

<h3>

⚠ Profile Issues

</h3>


{

validationErrors.map(

(err,index)=>(

<div

key={index}

className="error-item"

>

{err}

</div>

))

}

</div>

)

}





{/* Prediction */}

{

prediction && (

<div className="prediction-box">

<h2>

🎯 Predicted Domain

</h2>



<h3
className="main-prediction"
>

{

prediction
?.predicted_domain

.replaceAll(
"_",
" "
)

}

</h3>



<h4>

Top Matches

</h4>



<div
className="match-list"
>

{

prediction
?.top_matches

?.map(

(item,index)=>(

<div

key={`${item.domain}-${index}`}

className="match-card"

>

<div>

<h5>

{

item.domain

.replaceAll(
"_",
" "
)

}

</h5>


<span>

Match Score:

{" "}

{

Number(
item.score
)

.toFixed(1)

}%

</span>

</div>



<button

className="explore-btn"

onClick={()=>{

const id =
domainMap[
item.domain
];


if(id){

navigate(

`/domain/${id}`

);

}

else{

alert(

`No route mapped for ${item.domain}`

);

}

}}

>

Explore →

</button>


</div>

))

}

</div>

</div>

)

}

</div>

);

}


export default CareerAssessment;