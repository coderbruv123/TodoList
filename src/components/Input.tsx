import { JSX,  useState } from "react";

interface InputProps {
    fetchData: () => void;
}

const Input = ({ fetchData }: InputProps): JSX.Element => {


    const [PostTodo,setpostTodo] = useState({
        
        title: "",
        description: "",
    
    });


    const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("PostTodo:", PostTodo);
        
        const user = JSON.parse(localStorage.getItem("user") || "{}"); 

        const post = await fetch("https://localhost:7112/todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user}`,
            },
            body: JSON.stringify({ ...PostTodo }),
        });
            if (!post.ok) {
                throw new Error(`HTTP error! status: ${post.status}`);
            }
            console.log("Response:", post);
            fetchData();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setpostTodo((prevData) => ({ ...prevData, [name]: value }));
        console.log(PostTodo);
    };
    
   
    return (
            <div>
                <h1 className="text-white text-2xl p-3">Add a Todo Item</h1>
            <form onSubmit={handleAddTodo} >
                <div className="flex flex-col gap-3">

                <input type="text" onChange={handleChange} name="title" placeholder="Enter todo" className="bg-gray-800 text-white p-2 rounded shadow-md w-96" />
                <input type="text" onChange={handleChange} name="description" placeholder="Enter description" className="bg-gray-800 text-white p-2 rounded shadow-md w-96" />
                <button type="submit" className="bg-blue-500 w-30 text-white rounded-md p-2 mr-2">Add Todo</button>
                </div>
                </form>
                
         
            
        </div>
    );
};

export default Input;