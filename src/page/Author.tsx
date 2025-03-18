import React, { useState, useEffect } from "react";
import axios from "axios";
import { AuthorResponse } from "../domain/Author.entity";

const Author = () => {
  const [authors, setAuthors] = useState<AuthorResponse[]>([]);
  const [editAuthor, setEditAuthor] = useState<AuthorResponse | null>(null);
  const [author, setAuthor] = useState({ name: "", bio: "" });

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get<AuthorResponse[]>("https://localhost:7212/api/Author");
      setAuthors(response.data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  useEffect(() => {
    if (editAuthor) {
      setAuthor(editAuthor);
    } else {
      setAuthor({ name: "", bio: "" });
    }
  }, [editAuthor]);

  const handleChange = (e:any) => {
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
      setEditAuthor(null);
      setAuthor({ name: "", bio: "" });
      fetchAuthors();
    } catch (error) {
      console.error("Error submitting author:", error);
    }
  };

  const handleDelete = async (ID: number) => {
    try {
      await axios.delete(`https://localhost:7212/api/Author/${ID}`);
      fetchAuthors();
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96 mx-auto mb-6">
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
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            {editAuthor ? "Update Author" : "Add Author"}
          </button>
        </form>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Author List</h2>
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Bio</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr key={author.authorId} className="hover:bg-gray-50">
                <td className="border p-2 text-center">{author.authorId}</td>
                <td className="border p-2">{author.name}</td>
                <td className="border p-2">{author.bio}</td>
                <td className="border p-2 flex gap-2">
                  <button className="bg-red-500 text-white p-2 rounded-lg" onClick={() => handleDelete(author.authorId)}>
                    Delete
                  </button>
                  <button className="bg-blue-500 text-white p-2 rounded-lg" onClick={() => setEditAuthor(author)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Author;
