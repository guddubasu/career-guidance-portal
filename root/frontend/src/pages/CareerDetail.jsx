import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CareerDetail() {
  const { id } = useParams();
  const [career, setCareer] = useState(null);

  useEffect(() => {
    fetch(`/api/careers/${id}`)
      .then((res) => res.json())
      .then(setCareer)
      .catch(console.error);
  }, [id]);

  if (!career) return <p>Loading career details...</p>;

  return (
    <div>
      <h1>{career.title}</h1>
      <p>{career.summary}</p>
      {career.requiredSubjects?.length > 0 && (
        <>
          <h3>Required Subjects</h3>
          <ul>
            {career.requiredSubjects.map((sub, i) => (
              <li key={i}>{sub}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
