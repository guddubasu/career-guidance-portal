import { useState } from "react";
import "./CareerAssessment.css";

const factors = [ "technology_interest", "business_interest", "arts_creativity", "helping_people", "research_interest", "entrepreneurship_mindset", "outdoor_preference", "public_speaking", "logical_reasoning", "creativity", "leadership", "sports_interest", "teaching_interest", "hands_on_work" ];

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


function CareerAssessment() {

  // ==========================
  // Initial slider values
  // ==========================

  const initialValues = {};

  factors.forEach(f => {
    initialValues[f] = 0.5;
  });


  const [values,setValues] =
  useState(initialValues);


  const [loading,setLoading] =
  useState(false);


  const [prediction,
  setPrediction] =
  useState(null);


  const [validationErrors,
  setValidationErrors] =
  useState([]);



  // ==========================
  // Slider update
  // ==========================

  const handleChange =
  (factor,value)=>{

      setValues(prev=>({

          ...prev,

          [factor]:
          parseFloat(value)

      }));

  };



  // ==========================
  // Predict
  // ==========================

  const handlePredict =
  async()=>{

      try{

          setLoading(true);

          setPrediction(null);

          setValidationErrors([]);


          const response =
          await fetch(

              "http://127.0.0.1:5000/predict",

              {

                  method:"POST",

                  headers:{

                      "Content-Type":

                      "application/json"

                  },

                  body:
                  JSON.stringify(values)

              }

          );


          const data =
          await response.json();

          console.log(
              "Backend:",
              data
          );


          // ------------------
          // Validation failed
          // ------------------

          if(
              data.valid === false
          ){

              setValidationErrors(

                  data.issues ||

                  ["Profile invalid"]

              );

              return;

          }


          // ------------------
          // Prediction missing
          // ------------------

          if(

              !data.predicted_domain ||

              !data.top_matches

          ){

              setValidationErrors([

              "Prediction response invalid"

              ]);

              return;

          }


          // ------------------
          // Success
          // ------------------

          setPrediction(data);

      }


      catch(error){

          console.log(error);

          setValidationErrors([

          "Unable to connect to backend"

          ]);

      }


      finally{

          setLoading(false);

      }

  };



  return(

      <div className="assessment-container">

          <h1>

          Career Assessment

          </h1>



          {

          factors.map(
          factor=>(

          <div

          className="slider-box"

          key={factor}

          >

              <label>

              {
factorQuestions[factor]
}


              </label>



              <div
              className="slider-row"
              >

                  <span>

                  0.0

                  </span>


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


                  <span>

                  1.0

                  </span>

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

          "Predict"

          }

          </button>



          {/* Validation */}

          {

          validationErrors.length>0 && (

          <div
          className="error-box"
          >

          <h3>

          Profile Issues

          </h3>


          {

          validationErrors.map(

          (err,index)=>(

          <p key={index}>

          • {err}

          </p>

          ))

          }

          </div>

          )

          }



          {/* Prediction */}

          {

          prediction && (

          <div
          className="prediction-box"
          >

              <h2>

              Predicted Domain

              </h2>


              <h3>

              {

              prediction
              ?.predicted_domain

              ?

              prediction
              .predicted_domain
              .replaceAll(
                  "_",
                  " "
              )

              :

              "No prediction"

              }

              </h3>



              <h4>

              Top Matches

              </h4>


              {

              prediction
              ?.top_matches
              ?.map(

              (
              item,
              index
              )=>(

              <p key={index}>

              {

              item.domain
              ?.replaceAll(
                  "_",
                  " "
              )

              }

              :

              {" "}

              {item.score}%

              </p>

              ))

              }

          </div>

          )

          }

      </div>

  );

}


export default CareerAssessment;