import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "../hooks/useUsers";

interface UsersContextType {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
  editingUser: User | null;
  setEditingUser: (user: User | null) => void;
  updateUser: (updatedUser: User) => void;
}

//*undefined olaraq başlayır ki, sonradan səhvən kontekstsiz istifadə olunsa, xəta versin
const UsersContext = createContext<UsersContextType | undefined>(undefined);

interface UsersProviderProps {
  children: ReactNode;
  initialUsers: User[];
}

export const UsersProvider = ({
  children,
  initialUsers,
}: UsersProviderProps) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const updateUser = (updatedUser: User) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditingUser(null);
  };

  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
        selectedUser,
        setSelectedUser,
        editingUser,
        setEditingUser,
        updateUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

//*Əgər kontekst null və ya undefined olsa (yəni Provider xaricində istifadə olunursa), xəta atır-tehlukesizlik ucundur 
export const useUsersContext = () => {
  const context = useContext(UsersContext);
  if (!context) throw new Error("error");
  return context;
};
