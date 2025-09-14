import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Careers() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/careers")
      .then((res) => res.json())
      .then(setItems)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>Careers</h1>
      <ul>
        {items.map((c) => (
          <li key={c._id}>
            <Link to={`/careers/${c._id}`}>{c.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
