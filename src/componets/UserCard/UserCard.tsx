import type { User } from "../../hooks/useUsers";
import { useUsersContext } from "../../context/UsersContext";
import styles from "./UserCard.module.css";

interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  const { setSelectedUser, setUsers, users, setEditingUser } = useUsersContext();

  const handleDelete = () => {
    const confirmDelete = window.confirm(`${user.name} adlı istifadəçini silmək istədiyinizə əminsiniz?`);
    if (confirmDelete) {
      setUsers(users.filter((u) => u.id !== user.id));
    }
  };

  const handleView = () => {
    setSelectedUser(user);
  };

  const handleEdit = () => {
    setEditingUser(user);
  };

  return (
    <div className={styles.card}>
      <h3>{user.name}</h3>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      {user.username && (
        <p>
          <strong>İstifadəçi adı:</strong> {user.username}
        </p>
      )}
      {user.phone && (
        <p>
          <strong>Telefon:</strong> {user.phone}
        </p>
      )}
      <div className={styles.actions}>
        <button onClick={handleView} type="button">
          Bax
        </button>
        <button onClick={handleEdit} type="button" className={styles.editBtn}>
          Redaktə et
        </button>
        <button onClick={handleDelete} type="button" className={styles.deleteBtn}>
          Sil
        </button>
      </div>
    </div>
  );
};