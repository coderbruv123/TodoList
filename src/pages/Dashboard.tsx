import Input from "@/components/Input";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const Dashboard = () => {
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const [showProfile, setShowProfile] = useState(false);

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const fetchData = async () => {
        try {
            if (!user) {
                throw new Error("No token found. Please log in again.");
            }
            const response = await fetch("https://localhost:7112/todo", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user}`,
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setTodos(data);
        } catch (err: any) {
            setError(err.message || "An error occurred");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const DeleteTodo = async (id: number) => {
        try {
            const del = await fetch(`https://localhost:7112/todo/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user}`,
                },
            });
            if (!del.ok) {
                throw new Error(`HTTP error! status: ${del.status}`);
            }
            fetchData();
        } catch (err: any) {
            setError(err.message || "An error occurred");
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    return (
        <div className="dashboard relatie">
            <div className="absolute top-5 right-5">
                <FaUserCircle
                    className="text-white text-4xl cursor-pointer"
                    onClick={() => setShowProfile((prev) => !prev)}
                    title="Profile"
                />
                {showProfile && (
                    <div className=" absolute top-10 right-5 bg-gray-900 text-white rounded shadow-lg mt-2 p-4 min-w-[180px] flex flex-col items-center z-50">
                        <span className="mb-2 font-semibold">
                            {user.name || user.username || "User"}
                        </span>
                        <button
                            className="bg-red-500 text-white rounded-md px-4 py-2"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
            <Input fetchData={fetchData} />
            <div>
                {todos.map((todo: any) => (
                    <div key={todo.id} className="bg-gray-800 flex justify-between text-white p-4 rounded shadow-md mb-4">
                        <h2 className="text-lg font-bold">{todo.title}</h2>
                        <div className="flex gap-3">
                            <button className="bg-red-500 px-2">Edit</button>
                            <button className="bg-blue-500 px-2" onClick={() => DeleteTodo(todo.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;