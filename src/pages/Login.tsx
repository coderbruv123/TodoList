import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();
    useEffect(() => {

        if(localStorage.getItem("user")){
            navigate("/");}
        }, [navigate]);
            interface LoginProps {
                username: string;
                password: string;}

                const [loginData, setLoginData] = useState<LoginProps>({
                    username: "",
                    password: "",
                });
              

                const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    const {name, value} = e.target;
                    setLoginData((prevdata => ({...prevdata, [name]:value})));
                };

                const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    try {
                        const { username, password } = loginData;
                        console.log({ username, password });
                        const response = await fetch("https://localhost:7112/login", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ username, password }),
                        });
                        if (!response.ok) {
                            throw new Error("Network response was not ok");
                        }
                        const data = await response.json();
                        console.log("Response:", data);
                        localStorage.setItem("user", JSON.stringify(data));
                       
                        alert("Login successful!");
                        navigate("/");
                    } catch (error) {
                        console.error("Error submitting form:", error);
                        alert("An error occurred. Please try again.");
                    }
                };



                return(
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white p-6 rounded shadow-md w-96">

                    <form onSubmit={handleSubmit} >
                    <div className="flex flex-col">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={loginData.username}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-2 mb-4"
                            />
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={loginData.password} onChange={handleChange} className="border border-gray-300 rounded p-2 mb-4" />

                        <button type="submit" className="bg-blue-500 text-white rounded p-2">Login</button>
                    </div>
                    </form>
                    <Link to="/register" className="bg-blue-500 my-3" >Sign in</Link  >
                            </div>
                )

        


}
export default Login;