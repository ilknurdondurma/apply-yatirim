import React, { useEffect } from "react";
import { FaAnglesRight } from "react-icons/fa6";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { GetAbouts } from "../../redux/actions/about/aboutActions";
import { darkTheme, grayDarkTheme, grayLightTheme, lightTheme } from "../../redux/reducers/theme/themeReducers";
import { GetTeams } from "../../redux/actions/team/teamActions";

function About() {
  const dispatch = useDispatch();
  const theme=useSelector((state)=>state.theme.theme);
  const { abouts, loading, error } = useSelector((state) => state.about);
  const {teams }= useSelector((state)=>state.team);

  useEffect(() => {
    dispatch(GetAbouts());
    dispatch(GetTeams());

  }, [dispatch]);

  if (loading) return <div className="text-center text-lg font-semibold py-10">Yükleniyor...</div>;

  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">{error}</h1>
        <p className="text-xl mt-4 text-gray-600">Bir hata oluştu, lütfen daha sonra tekrar deneyin.</p>
      </div>
    </div>
  );
  return (
      <div className="mx-auto mt-20 px-4 lg:px-8">
        <h1 className="text-4xl font-bold  text-center mb-12">Hakkımızda</h1>
        
        <section className="py-10 px-4  text-center">
          <h2 className="text-2xl font-bold mb-8">Ekibimiz</h2>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-3 sm:grid-cols-2 gap-8">
              {teams.map((member) => (
                <div key={member.id} style={theme===darkTheme ? grayDarkTheme :null} className="p-4  shadow-lg rounded-lg bg-white">
                  <img src={member.imageUrl} alt={member.name} className="rounded-full mx-auto mb-4" style={{height:"100px" , width:"auto"}}/>
                  <h3 className="text-lg font-bold mb-2">{member.name}</h3>
                  <p className="text-gray-500">Tel : {member.phone}</p>
                  <p className="text-gray-400">{member.position}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      
       
        <div className="grid grid-cols-3 m-10 sm:grid-cols-1 shadow-md rounded-lg border-gray-300 mx-auto">
          {abouts.map((item) => (
            <div key={item.id} className="p-5 m-5 bg-white" style={theme===lightTheme ? null : grayDarkTheme} >
              <div className="col-span-2 p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-3 mb-4">
                  <FaAnglesRight className="text-primary" />
                  {item.title}
                </h2>
                <div className="border-l-4 border-primary pl-4 mb-6">
                  <p className=" text-lg">{item.description}</p>
                </div>
               
              </div>
            
                 
            </div>
          ))}
        </div>
        
      
      </div>
  
  );
}

export default About;
