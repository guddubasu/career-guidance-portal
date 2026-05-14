import fs from "fs";

// read original file
const rawData = fs.readFileSync(
  "colleges.json",
  "utf-8"
);

const colleges = JSON.parse(rawData);

// function to detect institution type
const getInstitutionType = (
  collegeName,
  collegeType
) => {

  const text =
    `${collegeName} ${collegeType}`.toLowerCase();

  if (
    text.includes("government") ||
    text.includes("govt") ||
    text.includes("constituent") ||
    text.includes("university college") ||
    text.includes("state university") ||
    text.includes("central university") ||
    text.includes("public")
  ) {
    return "Government";
  }

  return "Private";
};

// transform data
const transformedData = colleges.map((item) => {

  return {

    name: item.college
      .replace(/\(Id:.*?\)/g, "")
      .trim(),

    university: item.university
      .replace(/\(Id:.*?\)/g, "")
      .trim(),

    state: item.state,

    district: item.district,

    type: getInstitutionType(
      item.college,
      item.college_type
    ),

    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",

  };

});

// remove duplicate colleges
const uniqueColleges = transformedData.filter(
  (college, index, self) =>
    index ===
    self.findIndex(
      (c) =>
        c.name.toLowerCase() ===
        college.name.toLowerCase()
    )
);

// convert into JS array format
const jsArrayData = `
const collegeData = ${JSON.stringify(
  uniqueColleges,
  null,
  2
)};

export default collegeData;
`;

// save file
fs.writeFileSync(
  "formatted_colleges.js",
  jsArrayData
);

console.log(
  "✅ JS array file created successfully"
);

console.log(
  `Total colleges: ${uniqueColleges.length}`
);