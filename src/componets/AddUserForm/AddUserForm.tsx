import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { useUsersContext } from "../../context/UsersContext";
import type { User } from "../../hooks/useUsers";
import styles from "./AddUserForm.module.css";

interface FormData {
  name: string;
  username: string;
  email: string;
  phone: string;
  company: string;
  city: string;
  website: string;
}

export const AddUserForm = () => {
  const { users, setUsers } = useUsersContext();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    username: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    website: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateNewId = (): number => {
    const maxId = users.reduce((max, user) => Math.max(max, user.id), 0);
    return maxId + 1;
  };

  const handleAdd = (e?: FormEvent) => {
    e?.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      alert("Ad və Email boş ola bilməz");
      return;
    }

    const newUser: User = {
      id: generateNewId(),
      name: formData.name.trim(),
      username:
        formData.username.trim() ||
        formData.name.toLowerCase().replace(/\s+/g, ""),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      website: formData.website.trim(),
      company: {
        name: formData.company.trim(),
        catchPhrase: "",
        bs: "",
      },
      address: {
        street: "",
        suite: "",
        city: formData.city.trim(),
        zipcode: "",
        geo: {
          lat: "",
          lng: "",
        },
      },
    };

    setUsers([...users, newUser]);
    setFormData({
      name: "",
      username: "",
      email: "",
      phone: "",
      company: "",
      city: "",
      website: "",
    });
  };

  return (
    <form className={styles.form} onSubmit={handleAdd}>
      <input
        name="name"
        placeholder="Ad"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        name="username"
        placeholder="İstifadəçi adı"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        name="phone"
        type="tel"
        placeholder="Telefon"
        value={formData.phone}
        onChange={handleChange}
      />
      <input
        name="company"
        placeholder="Şirkət"
        value={formData.company}
        onChange={handleChange}
      />
      <input
        name="city"
        placeholder="Şəhər"
        value={formData.city}
        onChange={handleChange}
      />
      <input
        name="website"
        type="text"
        placeholder="Website"
        value={formData.website}
        onChange={handleChange}
      />
      <button type="submit">Əlavə et</button>
    </form>
  );
};
