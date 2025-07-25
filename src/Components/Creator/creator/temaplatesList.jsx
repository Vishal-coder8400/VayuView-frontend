import { useState } from "react";

const templates = [
  { name: "Default Template", value: "default" },
  { name: "Template without CO2", value: "template_without_co2" },
  { name: "Template without PM2.5-PM10", value: "template_with_pm2_pm10" },
  // { name: "C Template", value: "creative" },
];

export default function TemplateDropdown({ handleAddDefaultSlides, canvasLoading }) {
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const handleTemplateSelect = (event) => {
    const selectedValue = event.target.value;
    setSelectedTemplate(selectedValue);
    if (selectedValue) {
      handleAddDefaultSlides(selectedValue);
    }
  };

  return (
    <div className="relative">
      <select
        disabled={canvasLoading}
        value={selectedTemplate}
        onChange={handleTemplateSelect}
        className={`border border-[#03A9E7] text-black text-lg font-medium rounded-full p-2 w-[220px] bg-white ${
          canvasLoading ? "cursor-wait animate-pulse" : "cursor-pointer"
        }`}
      >
        <option value="" disabled>Select a Template</option>
        {templates.map((template) => (
          <option key={template.value} value={template.value}>
            {template.name}
          </option>
        ))}
      </select>
    </div>
  );
}
