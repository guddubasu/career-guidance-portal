import Select from "react-select";

export default function SkillSelect({
  label,
  options,
  value,
  setValue,
}) {
  return (
    <div className="mb-4">

      <label className="fw-bold mb-2 d-block">
        {label}
      </label>

      <Select
        options={options}
        isMulti
        value={value}
        placeholder="Select Skills"
        onChange={(selected) =>
          setValue(selected)
        }
      />

    </div>
  );
}