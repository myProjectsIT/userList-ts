import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../features/users/usersSlice";
import { fetchRandomUserFromApi } from "../services/userService";
import { User } from "../types/User";

export const useFetchRandomUser = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const fetchRandomUser = useCallback(async () => {
    setLoading(true);
    try {
      const userData = await fetchRandomUserFromApi();

      if (userData) {
        const newUser: User = {
          id: crypto.randomUUID(),
          username: userData.username,
          sex: userData.sex,
          address: userData.address,
          name: userData.name,
          email: userData.email,
          birthday: userData.birthday,
        };
        dispatch(addUser(newUser));
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  return { fetchRandomUser, loading };
};
