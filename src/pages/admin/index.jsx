import React, { useState } from "react";
import { contactData } from "../../dummy-data/contact";
import servicess from "../../dummy-data/services";
import customerStoriess from "../../dummy-data/customerStories";
import teamMembers from "../../dummy-data/team";
import blogPosts from "../../dummy-data/blogs";
import DynamicForm from "../../components/form";
import Modal from "../../components/modal";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa"; // İkonlar için
import { grayDarkTheme, grayLightTheme, lightTheme } from "../../redux/reducers/theme/themeReducers";
import { useSelector } from "react-redux";

function Admin() {
  const handleSubmit = (e) => {};
  const [contacts, setContacts] = useState(contactData);
  const [services, setServices] = useState(servicess);
  const [customerStories, setCustomerStories] = useState(customerStoriess);
  const [team, setTeam] = useState(teamMembers);
  const [blogs, setBlogs] = useState(blogPosts);
  const [modalData, setModalData] = useState(null);
  const name= contacts[0].name;
  const subTitle= contacts[0].subTitle;
  const slogan= contacts[0].slogan;
  const email= contacts[0].email;
  const phone= contacts[0].phone;
  const address= contacts[0].address
  const handleFormSubmit = (newData, dataSetter, currentData) => {
setModalData(null);  };

  const formFields = {
    products: [
      { name: "name", label: "İsim", type: "text" },
      { name: "subTitle", label: "Alt Başlık", type: "text" },
      { name: "slogan", label: "Slogan", type: "text" },
      { name: "email", label: "Email", type: "text" },
      { name: "phone", label: "Telefon Numarası", type: "text" },
      { name: "address", label: "Adres", type: "text" },
    ],
    services: [
      { name: "title", label: "Başlık", type: "text" },
      { name: "description", label: "Açıklama", type: "text" },
    ],
    customerStories: [
      { name: "customer", label: "Müşteri Adı", type: "text" },
      { name: "story", label: "Hikaye", type: "text" },
    ],
    team: [
      { name: "name", label: "İsim", type: "text" },
      { name: "position", label: "Pozisyon", type: "text" },
      { name: "photo", label: "Fotoğraf URL", type: "text" },
    ],
    blogs: [
      { name: "title", label: "Başlık", type: "text" },
      { name: "excerpt", label: "Özet", type: "text" },
    ],
  };
  const initialValues = {
    name: contacts[0].name,
    subTitle: contacts[0].subTitle,
    slogan: contacts[0].slogan,
    email: contacts[0].email,
    phone: contacts[0].phone,
    address: contacts[0].address,
  };
  const handleEdit = (item) => {
    setModalData({ type: item.type, initialValues: item });
  };

  const handleDelete = (item) => {
    // Handle delete action here
  };
  return (
    <div className="flex flex-col justify-center items-center w-full p-5">
      

      <div className="w-full grid grid-cols-2 sm:grid-cols-1 gap-4">

      <Section
        title="Bilgiler"
        items={[contacts[0]]}
        onAdd={() => setModalData({ type: 'products', initialValues: contacts[0] })}
        onEdit={() => {}}
        onDelete={() => {}}
        modalData={modalData}
        setModalData={setModalData}
      />
      <Section
        title="Hizmetler"
        items={services}
        onAdd={() => setModalData({ type: 'services' })}
        onEdit={handleEdit}
        onDelete={handleDelete}
        modalData={modalData}
        setModalData={setModalData}
      />
      <Section
        title="Müşteri Hikayeleri"
        items={customerStories}
        onAdd={() => setModalData({ type: 'customerStories' })}
        onEdit={handleEdit}
        onDelete={handleDelete}
        modalData={modalData}
        setModalData={setModalData}
      />
      <Section
        title="Ekibimiz"
        items={team}
        onAdd={() => setModalData({ type: 'team' })}
        onEdit={handleEdit}
        onDelete={handleDelete}
        modalData={modalData}
        setModalData={setModalData}
      />
      <Section
        title="Blog Yazıları"
        items={blogs}
        onAdd={() => setModalData({ type: 'blogs' })}
        onEdit={handleEdit}
        onDelete={handleDelete}
        modalData={modalData}
        setModalData={setModalData}
      />
      </div>

      {modalData && (
        <Modal onClose={() => setModalData(null)}>
          <DynamicForm
            fields={formFields[modalData.type]}
            initialsValues={modalData.initialValues || {}}
            header={modalData.type === 'products' ? "Bilgileri Güncelle" : `Yeni ${modalData.type === 'services' ? "Hizmet" : modalData.type === 'customerStories' ? "Hikaye" : modalData.type === 'team' ? "Üye" : "Blog Yazısı"} Ekle`}
            onSubmit={(data) => handleFormSubmit(data, 
              modalData.type === 'services' ? setServices :
              modalData.type === 'customerStories' ? setCustomerStories :
              modalData.type === 'team' ? setTeam :
              setBlogs, 
              modalData.type === 'services' ? services :
              modalData.type === 'customerStories' ? customerStories :
              modalData.type === 'team' ? team :
              blogs
            )}
          />
        </Modal>
      )}
    </div>
  );
}

export default Admin;
const Button = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="bg-primary text-white px-4 py-2 rounded-lg">
      {children}
    </button>
  );
};

const Section = ({
  title,
  items,
  onAdd,
  onEdit,
  onDelete,
  modalData,
  setModalData
}) => {
  // Dynamically determine fields from items' keys
  const fields = items.length > 0 ? Object.keys(items[0]) : [];
  const theme=useSelector((state)=>state.theme.theme)
  return (
    <section className={`flex flex-col justify-center items-center w-full border-2 gap-10 p-2 `} style={theme===lightTheme ? grayLightTheme: grayDarkTheme}>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <ul>
        {items.slice(0, 3).map((item, index) => (
          <li key={index} className="flex justify-between items-center w-full">
            <span className="line-clamp-1">
              {fields.map((field) => (
                <span key={field}>{item[field]}{field !== fields[fields.length - 1] && " - "}</span>
              ))}
            </span>
            <div className="flex p-2 gap-2">
              <FaEdit color="green" size={16} onClick={() => onEdit(item)} />
              <FaTrash color="red" size={16} onClick={() => onDelete(item)} />
            </div>
          </li>
        ))}
      </ul>
      <Button onClick={onAdd}>Yeni {title} Ekle</Button>
    </section>
  );
};


/*
{modalData && (
        <Modal onClose={() => setModalData(null)}>
          <DynamicForm
            fields={formFields[modalData.type]}
            initialsValues={modalData.initialValues || {}}
            header={modalData.type === 'products' ? "Bilgileri Güncelle" : `Yeni ${modalData.type === 'services' ? "Hizmet" : modalData.type === 'customerStories' ? "Hikaye" : modalData.type === 'team' ? "Üye" : "Blog Yazısı"} Ekle`}
            onSubmit={(data) => handleFormSubmit(data, 
              modalData.type === 'services' ? setServices :
              modalData.type === 'customerStories' ? setCustomerStories :
              modalData.type === 'team' ? setTeam :
              setBlogs, 
              modalData.type === 'services' ? services :
              modalData.type === 'customerStories' ? customerStories :
              modalData.type === 'team' ? team :
              blogs
            )}
          />
        </Modal>
      )}
*/