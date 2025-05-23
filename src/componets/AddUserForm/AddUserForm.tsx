import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { useAddUser } from "../../hooks/useUsers";
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
  const addUserMutation = useAddUser();

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

  const handleAdd = async (e?: FormEvent) => {
    e?.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim()) {
      alert("Ad və Email boş ola bilməz");
      return;
    }

    const newUser: Omit<User, 'id'> = {
      name: formData.name.trim(),
      username: formData.username.trim() || formData.name.toLowerCase().replace(/\s+/g, ''),
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

    try {
      await addUserMutation.mutateAsync(newUser);
      setFormData({
        name: "",
        username: "",
        email: "",
        phone: "",
        company: "",
        city: "",
        website: "",
      });
    } catch (error) {
      console.error("Əlavə etmə xətası:", error);
      alert("İstifadəçi əlavə edilərkən xəta baş verdi");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleAdd}>
      <input
        name="name"
        placeholder="Ad"
        value={formData.name}
        onChange={handleChange}
        required
        disabled={addUserMutation.isPending}
      />
      <input
        name="username"
        placeholder="İstifadəçi adı"
        value={formData.username}
        onChange={handleChange}
        disabled={addUserMutation.isPending}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        disabled={addUserMutation.isPending}
      />
      <input
        name="phone"
        type="tel"
        placeholder="Telefon"
        value={formData.phone}
        onChange={handleChange}
        disabled={addUserMutation.isPending}
      />
      <input
        name="company"
        placeholder="Şirkət"
        value={formData.company}
        onChange={handleChange}
        disabled={addUserMutation.isPending}
      />
      <input
        name="city"
        placeholder="Şəhər"
        value={formData.city}
        onChange={handleChange}
        disabled={addUserMutation.isPending}
      />
      <input
        name="website"
        type="text"
        placeholder="Website"
        value={formData.website}
        onChange={handleChange}
        disabled={addUserMutation.isPending}
      />
      <button type="submit" disabled={addUserMutation.isPending}>
        {addUserMutation.isPending ? "Əlavə olunur..." : "Əlavə et"}
      </button>
      {addUserMutation.isError && (
        <p style={{ color: "red", marginTop: "0.5rem" }}>
          Xəta: {addUserMutation.error?.message}
        </p>
      )}
    </form>
  );
};
