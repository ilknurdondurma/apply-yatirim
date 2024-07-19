import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../../redux/actions/contact/contactActions";

function Products() {
  const dispatch = useDispatch();
  const { contacts, loading, error } = useSelector((state) => state.contact);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;

  return (
    <div>
      <h2>İletişim Bilgileri</h2>
            <ul>
              {contacts.map(contact => (
                <li key={contact.id}>
                  <p>{contact.title}</p>
                  <p>{contact.body}</p>
                  <p>{contact.userId}</p>
                </li>
              ))}
            </ul>
    </div>
  );
}

export default Products;
