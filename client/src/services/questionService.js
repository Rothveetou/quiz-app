import axios from "axios";

const apiUrl = "http://localhost:5000/api/quiz";

export const updateQuestion = (id, questionData) => {
  return axios.put(`${apiUrl}/update/${id}`, questionData);
};

export const deleteQuestion = (id) => {
  return axios.delete(`${apiUrl}/delete/${id}`);
};

export const postQuestion = (questionData) => {
  return axios.post(`${apiUrl}/add`, questionData);
};

export const getQuestions = async () => {
  try {
    const response = await axios.get(`${apiUrl}/get`);
    console.log(Array.isArray(response.data));
    // Ensure the response data structure
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};
