import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAbouts } from "../../redux/actions/about/aboutActions";

function Contact() {
  const dispatch = useDispatch();
  const { abouts, loading, error } = useSelector((state) => state.about);

  useEffect(() => {
    dispatch(fetchAbouts());
  }, [dispatch]);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;


  return <div>
    <h2>hakkında Bilgilerii</h2>
            <ul>
              {abouts.map(about => (
                <li key={about.id}>
                  <p>{about.title}</p>
                  <p>{about.completed}</p>
                  <p>{about.userId}</p>
                </li>
              ))}
            </ul>
  </div>;
}

export default Contact;
