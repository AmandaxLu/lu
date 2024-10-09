import axios from "axios";

const API_URL = "http://localhost:5000/api/reservations"; // 

export const createReservation = async (reservationData) => {
  try {
    const response = await axios.post(API_URL, reservationData);
    return response.data;
  } catch (error) {
    console.error("Error creating reservation:", error);
    throw error;
  }
};
