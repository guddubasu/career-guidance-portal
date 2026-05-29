import React, { useState, useRef } from "react";
import axios from "axios";

export default function InstitutionsPage() {

  const collegesRef = useRef(null);
  const resultsRef = useRef(null);

  // states
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  // compare colleges states
  const [compareCollege1, setCompareCollege1] = useState("");
  const [compareCollege2, setCompareCollege2] = useState("");

  // filters
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [type, setType] = useState("");

  // explore button
  const handleExploreColleges = () => {
    collegesRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  // search function
  const handleSearch = async () => {

    try {

      setLoading(true);

      const response = await axios.get(
        "http://localhost:4000/api/colleges/search",
        {
          params: {
            name,
            state,
            type,
          },
        }
      );

      setSearchResults(response.data);
      setTimeout(() => {

      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
      });

    }, 200);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };
// compare colleges function
const handleCompareColleges = () => {

  if (!compareCollege1 || !compareCollege2) {

    alert("Please enter both college names");

    return;
  }

  const query = `${compareCollege1} vs ${compareCollege2}`;

  window.open(
    `https://www.google.com/search?q=${encodeURIComponent(query)}`,
    "_blank"
  );
};
  return (

    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #eef2ff 0%, #ffffff 50%, #f5f3ff 100%)",
      }}
    >

      <div className="container py-5">

        {/* HERO SECTION */}
        <div
          className="rounded-5 p-5 mb-5 position-relative overflow-hidden shadow-lg"
          style={{
            background:
              "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
          }}
        >

          <div className="row align-items-center">

            <div className="col-lg-7 text-white">

              <span
                className="px-3 py-2 rounded-pill"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  fontSize: "14px",
                  fontWeight: "600",
                  backdropFilter: "blur(10px)",
                }}
              >
                🎓 CareerCompass Institutions
              </span>

              <h1
                className="fw-bold mt-4 mb-4"
                style={{
                  fontSize: "58px",
                  lineHeight: "1.1",
                }}
              >
                Find Your
                <br />
                Dream Institution
              </h1>

              <p
                className="mb-4"
                style={{
                  fontSize: "18px",
                  color: "rgba(255,255,255,0.85)",
                  maxWidth: "600px",
                  lineHeight: "1.8",
                }}
              >
                Discover top colleges and universities
                based on your interests and career goals.
              </p>

              <div className="d-flex flex-wrap gap-3 mt-4">

                <button
                  className="btn px-5 py-3 fw-bold rounded-pill"
                  style={{
                    background: "#ffffff",
                    color: "#4f46e5",
                    border: "none",
                    fontSize: "17px",
                  }}
                  onClick={handleExploreColleges}
                >
                  Explore Colleges
                </button>

                <button
  className="btn px-5 py-3 fw-bold rounded-pill"
  style={{
    background: "transparent",
    border: "2px solid rgba(255,255,255,0.4)",
    color: "white",
    fontSize: "17px",
  }}
  onClick={() => {
    collegesRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }}
>
  Compare Institutions
</button>

              </div>
            </div>

            <div className="col-lg-5 text-center mt-5 mt-lg-0">

              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
                alt="education"
                style={{
                  width: "320px",
                  maxWidth: "100%",
                  filter:
                    "drop-shadow(0px 20px 30px rgba(0,0,0,0.2))",
                }}
              />

            </div>
          </div>
        </div>

        {/* SEARCH SECTION */}
        <div className="bg-white rounded-5 shadow-lg p-4 p-lg-5 mb-5 border-0">
                <h2
    className="fw-bold text-center mb-5"
    style={{
      color: "#4f46e5",
    }}
    ref={collegesRef}
  >
   🔍 Explore Colleges
  </h2>
          <div
            className="row g-4"
            
          >

            {/* NAME */}
            <div className="col-lg-4">

              <label className="fw-semibold mb-2 text-secondary">
                Institution Name
              </label>

              <input
                type="text"
                placeholder="Search college name...(optional)"
                className="form-control form-control-lg rounded-4 shadow-sm border-0"
                style={{
                  background: "#f8fafc",
                  padding: "14px",
                }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

            </div>

            {/* STATE */}
            <div className="col-lg-4">

              <label className="fw-semibold mb-2 text-secondary">
                State
              </label>

              <select
                className="form-select form-select-lg rounded-4 shadow-sm border-0"
                style={{
                  background: "#f8fafc",
                  padding: "14px",
                }}
                value={state}
                onChange={(e) => setState(e.target.value)}
              >

                <option value="">Select State</option>

                <option value="West Bengal">West Bengal</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Odisha">Odisha</option>
                <option value="Delhi">Delhi</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Telangana">Telangana</option>
                <option value="Punjab">Punjab</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Assam">Assam</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Bihar">Bihar</option>
                <option value="Haryana">Haryana</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Goa">Goa</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jammu and Kashmir">
                  Jammu and Kashmir
                </option>
                <option value="Tripura">Tripura</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Manipur">Manipur</option>
                <option value="Arunachal Pradesh">
                  Arunachal Pradesh
                </option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Puducherry">Puducherry</option>
                <option value="Lakshadweep">Lakshadweep</option>
                <option value="Ladakh">Ladakh</option>

              </select>

            </div>

            {/* TYPE */}
            <div className="col-lg-4">

              <label className="fw-semibold mb-2 text-secondary">
                Institution Type
              </label>

              <select
                className="form-select form-select-lg rounded-4 shadow-sm border-0"
                style={{
                  background: "#f8fafc",
                  padding: "14px",
                }}
                value={type}
                onChange={(e) => setType(e.target.value)}
              >

                <option value="">Select Type</option>

                <option value="Government">
                  Government
                </option>

                <option value="Private">
                  Private
                </option>

              </select>

            </div>

          </div>

         {/* BUTTONS */}
<div className="text-center mt-5 d-flex justify-content-center flex-wrap gap-3">

  {/* SEARCH BUTTON */}
  <button
    className="btn px-5 py-3 rounded-pill fw-bold"
    style={{
      background:
        "linear-gradient(to right, #4f46e5, #7c3aed)",
      color: "white",
      border: "none",
      fontSize: "18px",
      minWidth: "220px",
    }}
    onClick={handleSearch}
  >
    🔍 Search Institutions
  </button>

  {/* CLEAR RESULTS BUTTON */}
  <button
    className="btn px-5 py-3 rounded-pill fw-bold"
    style={{
      background: "#ef4444",
      color: "white",
      border: "none",
      fontSize: "18px",
      minWidth: "220px",
    }}
    onClick={() => {

      setSearchResults([]);

      setName("");
      setState("");
      setType("");

    }}
  >
    ❌ Clear Results
  </button>

</div>

        </div>
{/* COMPARE COLLEGES SECTION */}
<div className="bg-white rounded-5 shadow-lg p-4 p-lg-5 mb-5 border-0">

  <h2
    className="fw-bold text-center mb-5"
    style={{
      color: "#4f46e5",
    }}
    ref={resultsRef}
  >
    ⚖ Compare Colleges
  </h2>

  <div className="row g-4">

    {/* FIRST COLLEGE */}
    <div className="col-lg-5">

      <label className="fw-semibold mb-2 text-secondary">
        First College Name
      </label>

      <input
        type="text"
        placeholder="Enter first college name"
        className="form-control form-control-lg rounded-4 shadow-sm border-0"
        style={{
          background: "#f8fafc",
          padding: "14px",
        }}
        value={compareCollege1}
        onChange={(e) =>
          setCompareCollege1(e.target.value)
        }
      />

    </div>

    {/* VS TEXT */}
    <div className="col-lg-2 d-flex align-items-end justify-content-center">

      <h2
        className="fw-bold"
        style={{
          color: "#7c3aed",
          marginBottom: "10px",
        }}
      >
        VS
      </h2>

    </div>

    {/* SECOND COLLEGE */}
    <div className="col-lg-5">

      <label className="fw-semibold mb-2 text-secondary">
        Second College Name
      </label>

      <input
        type="text"
        placeholder="Enter second college name"
        className="form-control form-control-lg rounded-4 shadow-sm border-0"
        style={{
          background: "#f8fafc",
          padding: "14px",
        }}
        value={compareCollege2}
        onChange={(e) =>
          setCompareCollege2(e.target.value)
        }
      />

    </div>

  </div>

  {/* BUTTONS */}
  <div className="text-center mt-5 d-flex justify-content-center flex-wrap gap-3">

    {/* COMPARE BUTTON */}
    <button
      className="btn px-5 py-3 rounded-pill fw-bold"
      style={{
        background:
          "linear-gradient(to right, #4f46e5, #7c3aed)",
        color: "white",
        border: "none",
        fontSize: "18px",
        minWidth: "220px",
      }}
      onClick={handleCompareColleges}
    >
      ⚖ Compare Now
    </button>

    {/* CLEAR BUTTON */}
    <button
      className="btn px-5 py-3 rounded-pill fw-bold"
      style={{
        background: "#ef4444",
        color: "white",
        border: "none",
        fontSize: "18px",
        minWidth: "220px",
      }}
      onClick={() => {

        setCompareCollege1("");
        setCompareCollege2("");

      }}
    >
      ❌ Clear
    </button>

  </div>

</div>
        {/* RESULTS */}
        <div className="row g-4" ref={resultsRef}>

          {loading && (
            <h3 className="text-center">
              Loading colleges...
            </h3>
          )}

          {!loading && searchResults.length === 0 && (
            <h4 className="text-center text-secondary">
              No colleges found
            </h4>
          )}

          {searchResults.map((college) => (

            <div
  className="col-lg-6 col-xl-4 d-flex"
  key={college._id}
>
  <div className="card border-0 shadow-lg rounded-5 overflow-hidden institution-card">

    <div
      style={{
        height: "250px",
        overflow: "hidden",
      }}
    >
      <img
        src={
          college.type === "Government"
            ? "/government.jpeg"
            : "/private.jpeg"
        }
        alt={college.name}
        className="w-100 h-100 object-fit-cover institution-image"
      />
    </div>

    <div className="card-body p-4 d-flex flex-column">

      <h3
        className="fw-bold mb-3"
        
      >
        {college.name}
      </h3>

      <p className="mb-2">
        📍 {college.state}
      </p>

      <p className="mb-4">
        🏛 {college.type}
      </p>

      <a
 href={`https://www.google.com/search?q=${college.name}+official+website`}
  target="_blank"
  rel="noopener noreferrer"
  className="text-decoration-none mt-auto"
>
  <div
    className="rounded-pill fw-semibold d-flex align-items-center justify-content-center"
    style={{
      background:
        "linear-gradient(to right, #4f46e5, #7c3aed)",
      color: "white",
      width: "100%",
      minHeight: "55px",
      padding: "14px",
      cursor: "pointer",
    }}
  >
    Visit College Website
  </div>
</a>

    </div>
  </div>
</div>

          ))}

        </div>
      </div>

      {/* CUSTOM CSS */}
      <style>
        {`
          .institution-card{
            transition: all 0.4s ease;
          }

          .institution-card:hover{
            transform: translateY(-12px);
          }

          .institution-image{
            transition: all 0.5s ease;
          }

          .institution-card:hover .institution-image{
            transform: scale(1.08);
          }

          .form-control:focus,
          .form-select:focus{
            box-shadow: 0 0 0 0.25rem rgba(99,102,241,0.2);
            border-color: #6366f1;
          }

          button{
            transition: all 0.3s ease !important;
          }

          button:hover{
            transform: translateY(-2px);
          }
        `}
      </style>

    </div>
  );
}