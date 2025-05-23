import { useUsers } from "../hooks/useUsers";
import { UsersProvider } from "../context/UsersContext";
import { AddUserForm } from "../componets/AddUserForm/AddUserForm";
import { UserCard } from "../componets/UserCard/UserCard";
import { UserModal } from "../componets/UserModal/UserModal";
import { EditUserModal } from "../componets/EditUserModal/EditUserModal";
import { useQueryClient } from "@tanstack/react-query";
import type { User } from "../hooks/useUsers";

const DashboardContent = () => {
  const queryClient = useQueryClient();
  const users = queryClient.getQueryData<User[]>(["users"]) || [];

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center" }}>Admin Panel</h1>
      <AddUserForm />
      <div style={{ marginTop: "2rem" }}>
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
  if (isError) return <p>Xəta: {error?.message || " xəta"}</p>;
  if (!data) return <p>İstifadəçi yoxdur</p>;

  return (
    <UsersProvider>
      <DashboardContent />
    </UsersProvider>
  );
};
