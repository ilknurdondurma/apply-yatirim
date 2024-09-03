import React, { useState, useEffect } from 'react';
import { contactData } from '../../dummy-data/contact';
import { FaEnvelope, FaAddressCard, FaPhone } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';  // Import leaflet
import 'leaflet/dist/leaflet.css';
import 'leaflet-gesture-handling';
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css';
import { AnimateContainer } from 'react-animate-container';
import { useDispatch, useSelector } from 'react-redux';
import { lightTheme, grayDarkTheme, grayLightTheme } from "../../redux/reducers/theme/themeReducers";
import { GetContacts } from '../../redux/actions/contact/contactActions';
import { FiMapPin } from "react-icons/fi";
import { ToastContainer } from 'react-toastify';

// npm install react-leaflet leaflet leaflet-gesture-handling

function GestureHandling() {
  const map = useMap();

  useEffect(() => {
    if (map) {
      map.gestureHandling.enable();
    }
  }, [map]);

  return null;
}

// Create a custom icon
const customIcon = new L.Icon({
  iconUrl: 'https://freepngimg.com/download/symbol/62766-map-symbol-computer-location-icons-free-download-png-hd.png', // Replace with your custom icon URL
  iconSize: [38, 38], // Size of the icon
  iconAnchor: [22, 38], // Point of the icon which will correspond to marker's location
  popupAnchor: [-3, -38], // Point from which the popup should open relative to the iconAnchor
});

function Contact() {
  const dispatch = useDispatch();
  const { contacts, loading, error } = useSelector((state) => state.contact);
  const theme = useSelector((state) => state.theme.theme);
  const position = [37.9035985, 32.4633813];

  useEffect(() => {
    dispatch(GetContacts());
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
    <div className="flex flex-col w-4/5 mx-auto">
      <h1 className="text-4xl font-bold mt-20  text-center mb-12">İletişim Bilgileri</h1>
      <div>
        {contacts.slice(0, 1).map((contact) => (
          <div className="md:grid-cols-1 sm:grid-cols-1 sm:gap-2 grid grid-cols-3 gap-5" key={contact.id}>
            <AnimateContainer.fadeInUp duration={1} active>
              <div className="border-2 p-5 flex justify-center flex-col shadow-lg my-5 hover:cursor-pointer max-h-52 min-h-52" style={theme === lightTheme ? null : grayDarkTheme}>
                <div className="flex justify-center font-bold text-xl">Email</div>
                <div className="flex justify-center py-5"><FaEnvelope size={50} /></div>
                <div className="flex justify-center">{contact.email}</div>
              </div>
            </AnimateContainer.fadeInUp>

            <AnimateContainer.fadeInDown duration={1} active>
              <div className="border-2 p-5 flex justify-center flex-col shadow-lg my-5 hover:cursor-pointer max-h-52 min-h-52" style={theme === lightTheme ? null : grayDarkTheme}>
                <div className="flex justify-center font-bold text-xl">Telefon</div>
                <div className="flex justify-center py-5"><FaPhone size={50} /></div>
                <div className="flex justify-center">{contact.phone}</div>
              </div>
            </AnimateContainer.fadeInDown>

            <AnimateContainer.fadeInRight duration={1} active>
              <div className="border-2 p-5 flex justify-center flex-col shadow-lg my-5 hover:cursor-pointer max-h-52 min-h-52" style={theme === lightTheme ? null : grayDarkTheme}>
                <div className="flex justify-center font-bold text-xl">İletişim Adresi :</div>
                <div className="flex justify-center py-5"><FaAddressCard size={50} /></div>
                <div className="flex justify-center">{contact.address.city}</div>
              </div>
            </AnimateContainer.fadeInRight>
          </div>
        ))}
      </div>

      <div className="grid-cols-4 md:grid-cols-1 sm:grid-cols-1 marker:grid gap-10 sm:gap-2">
        <div className="col-span-3 flex flex-col justify-center items-center shadow-2xl my-20 relative z-0">
          <span className="text-4xl">Neredeyiz ?</span>
          <MapContainer
            center={position}
            zoom={13}
            style={{ height: "500px", width: "100%", margin: '10px' }}
            scrollWheelZoom={true}
            dragging={false}
            touchZoom={true}
          >
            <GestureHandling />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position} icon={customIcon}>
              <Popup>Biz buradayız!</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Contact;
