import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "../hooks/useUsers";

interface UsersContextType {
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
  editingUser: User | null;
  setEditingUser: (user: User | null) => void;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

interface UsersProviderProps {
  children: ReactNode;
}

export const UsersProvider = ({ children }: UsersProviderProps) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  return (
    <UsersContext.Provider
      value={{
        selectedUser,
        setSelectedUser,
        editingUser,
        setEditingUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsersContext = () => {
  const context = useContext(UsersContext);
  if (!context) throw new Error("error");
  return context;
};
