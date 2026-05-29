import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Defence() {
  const navigate = useNavigate()

  // ✅ Temporary frontend data
  const [options] = useState([
    { id: 1, name: "Agniveer" },
    { id: 2, name: "NDA" },
    { id: 3, name: "CDS" }
  ])

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Defence Career Options
      </h1>

      <div className="grid grid-cols-3 gap-6">
        {options.map(option => (
          <div
            key={option.id}
            className="border p-6 rounded shadow cursor-pointer hover:bg-gray-100"
            onClick={() => navigate(`/defence/${option.id}`)}
          >
            <h3 className="text-xl font-semibold">
              {option.name}
            </h3>

            <button
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
              onClick={(e) => {
                e.stopPropagation()
                navigate(`/defence/${option.id}`)
              }}
            >
              Explore
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}