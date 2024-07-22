import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsFillMoonStarsFill } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import themeActions from '../../redux/actions/theme/themeActions'; // themeActions'ı import et

const ToggleSwitch = ({ label = "" }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const [isChecked, setIsChecked] = useState(theme === 'lightTheme'); // 'lightTheme' string olarak kontrol ediliyor

  const handleToggle = () => {
    if (isChecked) {
      dispatch(themeActions.dark()); // Redux eylemini çağır
    } else {
      dispatch(themeActions.light()); // Redux eylemini çağır
    }
    setIsChecked(!isChecked);
  };

  return (
    <label className="flex items-center cursor-pointer p-3">
      <span className="flex justify-center items-center">
        {isChecked ? <FiSun size={16} className="mx-2"/> : <BsFillMoonStarsFill size={16} className="mx-2"/>}
      </span>
      <div className="relative">
        <input
          type="checkbox"
          id="toggleSwitch"
          className="sr-only"
          checked={isChecked}
          onChange={handleToggle}
        />
        <div className={`block w-14 h-8 rounded-full border-2 ${isChecked ? 'bg-green-400' : 'bg-gray-300'}`}></div>
        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform transform ${isChecked ? 'translate-x-6' : ''}`}></div>
      </div>
      <div className="ml-3 text-gray-700 font-medium">{label}</div>
    </label>
  );
};

export default ToggleSwitch;
