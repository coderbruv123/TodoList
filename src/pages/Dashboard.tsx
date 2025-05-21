import Input from "@/components/Input";
import TodoList from "@/components/todoList";
import { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";




const Dashboard = () => {
    const [showMenu, setShowMenu] = useState(false);


    const handleLogout = () => {
        alert("Logged out!");
    };

    return (
        <div className="dashboard relative min-h-screen">
            <div
                className="absolute top-1 right-1"
                
                
            >
                <button
                    className="flex items-center gap-2 focus:outline-none"
                    onClick={() => setShowMenu((prev) => !prev)}
                >
                    <FaUserCircle size={32} />
                </button>
                {showMenu && (
                    <div className="absolute right-0 mt-2 w-32 bg-red-500 shadow-lg rounded z-10">
                        <button
                            className="block w-full text-left px-4 py-2 hover:bg-red-400"
                            onClick={handleLogout}
                        >
                            Log Out
                        </button>

                    </div>
                )}

            </div>
                                                    <Input />
                                                    <TodoList/>

        </div>
    );
};

export default Dashboard;