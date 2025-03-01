import { useState } from "react";

const questionMap = {
  pregnancy: "Are you pregnant?",
  highBP: "Do you have high blood pressure?",
  glaucoma: "Do you have glaucoma?",
  thyroid: "Do you have thyroid problems?",
  seizures: "Do you have seizures?",
  gallstones: "Do you have gallstones?",
  opioids: "Do you use opioids?",
  MTC: "Do you have a history of medullary thyroid carcinoma (MTC)?",
  Malabsorption: "Do you have malabsorption syndrome?",
};

const medications = [
  { name: "Tirzepatide", conditions: ["pregnancy", "thyroid", "MTC"] },
  { name: "Semaglutide", conditions: ["pregnancy", "thyroid", "MTC"] },
  { name: "Liraglutide", conditions: ["pregnancy", "thyroid", "MTC"] },
  { name: "Dulaglutide", conditions: ["pregnancy", "thyroid", "MTC"] },
  { name: "Phentermine", conditions: ["highBP", "glaucoma", "thyroid"] },
  { name: "Topiramate", conditions: ["pregnancy"] },
  { name: "Naltrexone", conditions: ["opioids"] },
  { name: "Bupropion", conditions: ["seizures"] },
  { name: "Orlistat", conditions: ["gallstones", "pregnancy", "Malabsorption"] },
];

const allMeds = [
  "Tirzepatide", "Semaglutide", "Dulaglutide", "Liraglutide", "Phentermine", "Bupropion", "Naltrexone", "Orlistat", "Oral Semaglutide", "SGLPTi", "Metformin", "Topiramate"
];

const questions = Object.entries(questionMap);

export default function MedChecker() {
  const [responses, setResponses] = useState({});
  const [result, setResult] = useState({ medsToAvoid: [], medsThatWork: [] });

  const handleChange = (key) => {
    setResponses({ ...responses, [key]: !responses[key] });
  };

  const checkMeds = () => {
    const selectedConditions = Object.keys(responses).filter(key => responses[key]);
    const medsToAvoidSet = new Set();

    medications.forEach(med => {
      if (med.conditions.some(cond => selectedConditions.includes(cond))) {
        medsToAvoidSet.add(med.name);
      }
    });

    const medsToAvoid = Array.from(medsToAvoidSet);
    const medsThatWork = allMeds.filter(med => !medsToAvoid.includes(med) && medications.some(m => m.name === med));

    setResult({ medsToAvoid, medsThatWork });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>Medication Checker</h1>
      <form>
        {questions.map(([key, label]) => (
          <label key={key} style={{ display: "block", marginBottom: "5px" }}>
            <input type="checkbox" checked={responses[key] || false} onChange={() => handleChange(key)} /> {label}
          </label>
        ))}
      </form>
      <button style={{ marginTop: "10px", padding: "10px", backgroundColor: "blue", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }} onClick={checkMeds}>
        Check Medications
      </button>
      {result.medsToAvoid.length > 0 && (
        <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #ddd", borderRadius: "5px", backgroundColor: "#f9f9f9" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>Avoid These Medications:</h2>
          <ul>
            {result.medsToAvoid.map((med, index) => (
              <li key={index}>{med}</li>
            ))}
          </ul>
        </div>
      )}
      {result.medsThatWork.length > 0 && (
        <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #ddd", borderRadius: "5px", backgroundColor: "#e6ffe6" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>Medications That Can Work:</h2>
          <ul>
            {result.medsThatWork.map((med, index) => (
              <li key={index}>{med}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
