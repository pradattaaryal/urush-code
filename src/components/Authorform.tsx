import { useState } from "react";
import axios from "axios";
import Author from "../domain/Author.entity";


export default function Authorform() {
  const [author, setAuthor] = useState<Author>({ name: "Urusha", bio: "nh" });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAuthor({ ...author, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   

    try {
      const response = await axios.post("https://localhost:7212/api/Author/create", author); 
  
      setAuthor({ name: "", bio: "" });
      window.location.reload(); 
    } catch (error) {
 
    } finally {
    
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Author</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={author.name} //text that is shown in input field 
              onChange={handleChange} //sets the value of name in author state 
              required
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block font-semibold">Bio</label>
            <textarea
              name="bio"
              value={author.bio}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
           
          >
            Add Author
          </button>
        </form>
      </div>
    </div>
  );
}
