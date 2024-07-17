import React, { useState } from "react";
import { aboutData } from "../../dummy-data/about";
import { FaAnglesRight } from "react-icons/fa6";
function About() {
  const [about, setAbout] = useState(aboutData);

  return (
    <div>
      <div className="w-3/5 col-span-3 sm:hidden mx-auto">
        {about.map((item, index) => (
          <div key={item.id} className={`p-5 rounded-lg h-auto `}>
            <h2 className="text-2xl my-5 mx-6 flex gap-2">
              <FaAnglesRight />
              {item.title}
            </h2>

            <div className={`border-l-2 p-5 rounded-lg h-auto`}>
              <p className="text-lg font-serif"> {item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
