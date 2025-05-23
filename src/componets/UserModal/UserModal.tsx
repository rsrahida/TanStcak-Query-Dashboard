import type { MouseEvent } from "react";
import { useUsersContext } from "../../context/UsersContext";
import styles from "./UserModal.module.css";

export const UserModal = () => {
  const { selectedUser, setSelectedUser } = useUsersContext();

  if (!selectedUser) return null;

  const handleClose = () => {
    setSelectedUser(null);
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
          <h2>{selectedUser.name}</h2>
          <button
            onClick={handleClose}
            className={styles.closeBtn}
            type="button"
          >
            ×
          </button>
        </div>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3>Şəxsi məlumatlar</h3>
            <p>
              <strong>Ad:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>İstifadəçi adı:</strong> {selectedUser.username}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Telefon:</strong> {selectedUser.phone}
            </p>
            {selectedUser.website && (
              <p>
                <strong>Website:</strong>
                <a
                  href={selectedUser.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selectedUser.website}
                </a>
              </p>
            )}
          </div>

          <div className={styles.section}>
            <h3>Ünvan</h3>
            <p>
              <strong>Şəhər:</strong> {selectedUser.address.city}
            </p>
            <p>
              <strong>Küçə:</strong> {selectedUser.address.street}
            </p>
            <p>
              <strong>Suite:</strong> {selectedUser.address.suite}
            </p>
            <p>
              <strong>Zip kod:</strong> {selectedUser.address.zipcode}
            </p>
          </div>

          <div className={styles.section}>
            <h3>Şirkət</h3>
            <p>
              <strong>Şirkət adı:</strong> {selectedUser.company.name}
            </p>
            <p>
              <strong>Slogan:</strong> {selectedUser.company.catchPhrase}
            </p>
            <p>
              <strong>Biznes:</strong> {selectedUser.company.bs}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
