import axios from "axios";
import { User } from "../types/User";

const API_KEY = ""; 

export const fetchRandomUserFromApi = async (): Promise<Omit<
  User,
  "id"
> | null> => {
  try {
    const response = await axios.get(
      "https://api.api-ninjas.com/v1/randomuser",
      {
        headers: {
          "X-Api-Key": API_KEY,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch user:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
