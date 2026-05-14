import { useParams } from "react-router-dom";

export default function InstitutionDetails() {

  const { id } = useParams();

  return (
    <div className="container py-5">
      <h1>Institution Details Page</h1>

      <h2>ID: {id}</h2>
    </div>
  );
}