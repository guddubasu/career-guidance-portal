import Select from "react-select";

export default function EnvironmentalFactors({

  incomeOptions,

  familyIncome,
  setFamilyIncome,

  educationBudget,
  setEducationBudget,

  location,
  setLocation,

}) {

  return (

    <div className="mb-4">

      {/* Family Income */}

      <label className="form-label fw-bold fs-5">
        Family Income
      </label>

      <Select
        options={incomeOptions}
        value={familyIncome}
        onChange={(selected) =>
          setFamilyIncome(selected)
        }
        placeholder="Select Income Range"
      />



      {/* Education Budget */}

      <label className="form-label fw-bold fs-5 mt-4">
        How much can be spent on education?
      </label>

      <input
        type="range"
        className="form-range"
        min="50000"
        max="2000000"
        step="50000"
        value={educationBudget}
        onChange={(e) =>
          setEducationBudget(e.target.value)
        }
      />

      <div
        className="fw-bold fs-5"
        style={{
          color: "#6200ad",
        }}
      >
        ₹ {Number(educationBudget).toLocaleString("en-IN")}
      </div>



      {/* Location */}

      <label className="form-label fw-bold fs-5 mt-4">
        Location
      </label>

      <input
        type="text"
        className="form-control"
        value={location}
        onChange={(e) =>
          setLocation(e.target.value)
        }
      />

      <small className="text-muted">
        Auto-fetched using GPS
      </small>

    </div>

  );
}