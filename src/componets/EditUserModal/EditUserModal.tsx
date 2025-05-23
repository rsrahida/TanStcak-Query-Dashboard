import { useState, useEffect } from "react";
import type { FormEvent, ChangeEvent, MouseEvent } from "react";
import { useUsersContext } from "../../context/UsersContext";
import type { User } from "../../hooks/useUsers";
import styles from "./EditUserModal.module.css";

interface EditFormData {
  name: string;
  username: string;
  email: string;
  phone: string;
  company: string;
  city: string;
  website: string;
  street: string;
  suite: string;
  zipcode: string;
  catchPhrase: string;
  bs: string;
}

export const EditUserModal = () => {
  const { editingUser, setEditingUser, updateUser } = useUsersContext();

  const [formData, setFormData] = useState<EditFormData>({
    name: "",
    username: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    website: "",
    street: "",
    suite: "",
    zipcode: "",
    catchPhrase: "",
    bs: "",
  });

  useEffect(() => {
    if (editingUser) {
      setFormData({
        name: editingUser.name || "",
        username: editingUser.username || "",
        email: editingUser.email || "",
        phone: editingUser.phone || "",
        company: editingUser.company.name || "",
        city: editingUser.address.city || "",
        website: editingUser.website || "",
        street: editingUser.address.street || "",
        suite: editingUser.address.suite || "",
        zipcode: editingUser.address.zipcode || "",
        catchPhrase: editingUser.company.catchPhrase || "",
        bs: editingUser.company.bs || "",
      });
    }
  }, [editingUser]);

  if (!editingUser) return null;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      alert("Ad və Email boş ola bilməz");
      return;
    }

    const updatedUser: User = {
      ...editingUser,
      name: formData.name.trim(),
      username: formData.username.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      website: formData.website.trim(),
      company: {
        name: formData.company.trim(),
        catchPhrase: formData.catchPhrase.trim(),
        bs: formData.bs.trim(),
      },
      address: {
        ...editingUser.address,
        street: formData.street.trim(),
        suite: formData.suite.trim(),
        city: formData.city.trim(),
        zipcode: formData.zipcode.trim(),
      },
    };

    updateUser(updatedUser);
  };

  const handleClose = () => {
    setEditingUser(null);
  };

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>İstifadəçini Redaktə et</h2>
          <button
            onClick={handleClose}
            className={styles.closeBtn}
            type="button"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.section}>
            <h3>Şəxsi məlumatlar</h3>
            <div className={styles.row}>
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
            </div>
            <div className={styles.row}>
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
            </div>
            <input
              name="website"
              type="text"
              placeholder="Website"
              value={formData.website}
              onChange={handleChange}
            />
          </div>

          <div className={styles.section}>
            <h3>Ünvan</h3>
            <div className={styles.row}>
              <input
                name="street"
                placeholder="Küçə"
                value={formData.street}
                onChange={handleChange}
              />
              <input
                name="suite"
                placeholder="Suite/Mənzil"
                value={formData.suite}
                onChange={handleChange}
              />
            </div>
            <div className={styles.row}>
              <input
                name="city"
                placeholder="Şəhər"
                value={formData.city}
                onChange={handleChange}
              />
              <input
                name="zipcode"
                placeholder="Poçt kodu"
                value={formData.zipcode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.section}>
            <h3>Şirkət</h3>
            <input
              name="company"
              placeholder="Şirkət adı"
              value={formData.company}
              onChange={handleChange}
            />
            <input
              name="catchPhrase"
              placeholder="Şirkət sloganı"
              value={formData.catchPhrase}
              onChange={handleChange}
            />
            <textarea
              name="bs"
              placeholder="Biznes təsviri"
              value={formData.bs}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              onClick={handleClose}
              className={styles.cancelBtn}
            >
              Ləğv et
            </button>
            <button type="submit" className={styles.saveBtn}>
              Yadda saxla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
