import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "../utils/fetcher";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export const useUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: () => fetcher("https://jsonplaceholder.typicode.com/users"),
  });
};

//*Add User Mutation
export const useAddUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newUser: Omit<User, "id">) => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );
      if (!response.ok) {
        throw new Error("İstifadəçi əlavə edilmədi");
      }
      const result = await response.json();
      const users = queryClient.getQueryData<User[]>(["users"]) || [];
      const newId = Math.max(...users.map((u) => u.id), 0) + 1;
      return { ...result, id: newId };
    },
    onMutate: async (newUser) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });
      const previousUsers = queryClient.getQueryData<User[]>(["users"]);
      const users = previousUsers || [];
      const newId = Math.max(...users.map((u) => u.id), 0) + 1;
      const optimisticUser: User = { ...newUser, id: newId } as User;
      queryClient.setQueryData<User[]>(["users"], (old) =>
        old ? [...old, optimisticUser] : [optimisticUser]
      );

      return { previousUsers, optimisticUser };
    },
    onError: (_, __, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(["users"], context.previousUsers);
      }
    },
    onSuccess: () => {},
  });
};

//*Update User Mutation
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedUser: User) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${updatedUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );
      if (!response.ok) {
        throw new Error("İstifadəçi yenilənmədi");
      }
      return response.json();
    },
    onMutate: async (updatedUser) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });
      const previousUsers = queryClient.getQueryData<User[]>(["users"]);
      queryClient.setQueryData<User[]>(["users"], (old) =>
        old
          ? old.map((user) => (user.id === updatedUser.id ? updatedUser : user))
          : []
      );
      return { previousUsers };
    },
    onError: (_, __, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(["users"], context.previousUsers);
      }
    },
    onSuccess: () => {},
  });
};

//*Delete User Mutation
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: number) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("İstifadəçi silinmədi");
      }
      return userId;
    },
    onMutate: async (userId) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });
      const previousUsers = queryClient.getQueryData<User[]>(["users"]);
      queryClient.setQueryData<User[]>(["users"], (old) =>
        old ? old.filter((user) => user.id !== userId) : []
      );
      return { previousUsers };
    },
    onError: (_, __, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(["users"], context.previousUsers);
      }
    },
    onSuccess: () => {},
  });
};
