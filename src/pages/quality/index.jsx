import React from "react";
import qualityData from "../../dummy-data/qualityData";

function Quality() {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <section className="text-center my-8">
        <h1 className="text-4xl font-bold mb-4">{qualityData.title}</h1>
        <p className="text-lg text-gray-700">{qualityData.description}</p>
      </section>
      <section>
        {qualityData.sections.map((section) => (
          <div
            key={section.id}
            className="my-8 p-4 bg-white shadow-lg rounded-lg flex flex-col md:flex-row items-center"
          >
            <img
              src={section.image}
              alt={section.title}
              className="w-full md:w-1/2 h-64 object-contain rounded-lg mb-4 md:mb-0 md:mr-4"
            />
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
              <p className="text-gray-600">{section.content}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Quality;
