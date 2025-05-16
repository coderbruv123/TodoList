import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  interface FormData {
    username: string;
    password: string;
    password2: string;
  }
  

  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    password2: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.password2) {
      alert("Passwords do not match");
      return;
    }

    
    if (!formData.username || !formData.password || !formData.password2) {
      alert("All fields are required");
      return;
    }

    try {
      const { username, password } = formData;
      console.log ({username, password});
      const response = await axios.post(
        "https://localhost:7112/register",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Response:", response.data);
      alert("Registration successful!");
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data); 
      } else {
        console.error("Error submitting form:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your name"
          className="border-2 border-gray-300 rounded-md p-2 mb-4"
        />

        <label htmlFor="password">Make a Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your new password"
          className="border-2 border-gray-300 rounded-md p-2 mb-4"
        />

        <label htmlFor="password2">Confirm Password</label>
        <input
          type="password"
          id="password2"
          name="password2"
          value={formData.password2}
          onChange={handleChange}
          placeholder="Enter your password again"
          className="border-2 border-gray-300 rounded-md p-2 mb-4"
        />

        <button type="submit" className="bg-blue-500 text-white rounded-md p-2">
          Submit
        </button>
        <Link to="/Login" className="bg-blue-500 my-3" >Log In</Link  >

      </div>
    </form>
  );
};

export default Register;