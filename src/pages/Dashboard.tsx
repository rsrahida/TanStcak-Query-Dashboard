import { useUsers } from "../hooks/useUsers";
import { UsersProvider, useUsersContext } from "../context/UsersContext";
import { AddUserForm } from "../componets/AddUserForm/AddUserForm";
import { UserCard } from "../componets/UserCard/UserCard";
import { UserModal } from "../componets/UserModal/UserModal";
import { EditUserModal } from "../componets/EditUserModal/EditUserModal";

const DashboardContent = () => {
  const { users } = useUsersContext();

  return (
    <div style={{ padding: "10px" }}>
      <h1 style={{ textAlign: "center" }}>Admin Panel</h1>
      <AddUserForm />
      <div style={{ marginTop: "10px" }}>
        {users.length === 0 ? (
          <p>Heç bir istifadəçi yoxdur</p>
        ) : (
          users.map((user) => <UserCard key={user.id} user={user} />)
        )}
      </div>
      <UserModal />
      <EditUserModal />
    </div>
  );
};

export const Dashboard = () => {
  const { data, isLoading, isError, error } = useUsers();

  if (isLoading) return <p>Yüklənir...</p>;
  if (isError) return <p>Xəta: {error?.message || "xəta"}</p>;
  if (!data) return <p>İstifadəçi yoxdur</p>;

  return (
    <UsersProvider initialUsers={data}>
      <DashboardContent />
    </UsersProvider>
  );
};
