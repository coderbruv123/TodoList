import { Todos,  } from "../types/Todos"
import axios from "./axiosInstance";

export const getTodos = async (): Promise<Todos[]> => {
    const response = await axios.get("/todo");
    return response.data;
};

export const getTodo = async (id: string): Promise<Todos> => {
    const response = await axios.get(`/todo/${id}`);
    return response.data;
};

export const createTodo = async (todo: {
    title: string;
    description: string;
}) => {
    const response = await axios.post("/todo", todo);
    return response.data;
};

export const updateTodo = async (id: string, todo: {
    title?: string;
    description?: string;
    isCompleted?: boolean;
}) => {
    const response = await axios.put(`/todo/${id}`, todo);
    return response.data;
};

export const deleteTodo = async (id: string) => {
    const response = await axios.delete(`/todo/${id}`);
    return response.data;
};