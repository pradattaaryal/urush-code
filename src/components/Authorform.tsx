import { useState, useEffect } from "react";
import axios from "axios";
import Author from "../domain/Author.entity";

export default function Authorform({ editAuthor, setEditAuthor }) {
  const [author, setAuthor] = useState<Author>({ name: "", bio: "" });

  useEffect(() => {
    if (editAuthor) {
      setAuthor(editAuthor);
    } else {
      setAuthor({ name: "", bio: "" });
    }
  }, [editAuthor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAuthor({ ...author, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editAuthor) {
        await axios.put(`https://localhost:7212/api/Author/${editAuthor.authorId}`, author);
      } else {
        await axios.post("https://localhost:7212/api/Author/create", author);
      }
      setAuthor({ name: "", bio: "" });
      setEditAuthor(null);
      window.location.reload();
    } catch (error) {
      console.error("Error submitting author:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">{editAuthor ? "Edit Author" : "Add Author"}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={author.name}
              onChange={handleChange}
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
            {editAuthor ? "Update Author" : "Add Author"}
          </button>
        </form>
      </div>
    </div>
  );
}