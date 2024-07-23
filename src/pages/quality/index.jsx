import React, { useState } from "react";
import qualityData from "../../dummy-data/qualityData";
import { useSelector } from "react-redux";

function Quality() {
  const [guality, setQuality] = useState(qualityData);
  const theme=useSelector((state)=>state.theme.theme);
  return (
    <div className="max-w-7xl mx-auto p-4">
      <section className="text-center my-8">
        <h1 className="text-xl font-bold mb-4">{guality.title}</h1>
        <p className=" ">{guality.description}</p>
      </section>
      <section>
        {guality.sections.map((section) => (
          <div
            key={section.id}
            className="my-8 p-4 bg-white shadow-xl shadow-slate-400 rounded-lg flex flex-col md:flex-row items-center border-[1px] "
            style={theme}
          >
            <img
              src={section.image}
              alt={section.title}
              className="w-full md:w-1/2 h-64 object-contain rounded-lg mb-4 md:mb-0 md:mr-4"
            />
            <div className="md:w-1/2 text-center">
              <h2 className="font-bold mb-2">{section.title}</h2>
              <p className="">{section.content}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Quality;
