import { useParams } from "react-router-dom"

export default function DefenceDetails() {
  const { id } = useParams()

  const data = {
    1: {
      name: "Agniveer",
      description: "Details about Agniveer scheme..."
    },
    2: {
      name: "NDA",
      description: "National Defence Academy details..."
    },
    3: {
      name: "CDS",
      description: "Combined Defence Services details..."
    }
  }

  const selected = data[id]

  if (!selected) return <p>Not Found</p>

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        {selected.name}
      </h1>

      <p className="mt-4">
        {selected.description}
      </p>
    </div>
  )
}