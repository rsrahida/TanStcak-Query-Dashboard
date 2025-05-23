import type { User } from "../../hooks/useUsers";
import { useUsersContext } from "../../context/UsersContext";
import { useDeleteUser } from "../../hooks/useUsers";
import styles from "./UserCard.module.css";

interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  const { setSelectedUser, setEditingUser } = useUsersContext();
  const deleteUserMutation = useDeleteUser();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `${user.name} adlı istifadəçini silmək istədiyinizə əminsiniz?`
    );
    if (confirmDelete) {
      try {
        await deleteUserMutation.mutateAsync(user.id);
      } catch (error) {
        console.error("Silmə xətası:", error);
        alert("İstifadəçi silinərkən xəta baş verdi");
      }
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
        <button
          onClick={handleEdit}
          type="button"
          className={styles.editBtn}
          disabled={deleteUserMutation.isPending}
        >
          Redaktə et
        </button>
        <button
          onClick={handleDelete}
          type="button"
          className={styles.deleteBtn}
          disabled={deleteUserMutation.isPending}
        >
          {deleteUserMutation.isPending ? "Silinir..." : "Sil"}
        </button>
      </div>
      {deleteUserMutation.isError && (
        <p style={{ color: "red", fontSize: "0.8rem", marginTop: "0.5rem" }}>
          Silmə xətası: {deleteUserMutation.error?.message}
        </p>
      )}
    </div>
  );
};
