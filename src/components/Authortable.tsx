import React, { useEffect, useState } from "react";
import axios from "axios";
import { AuthorResponse } from "../domain/Author.entity";



const AuthorTable: React.FC = () => {
  const [authors, setAuthors] = useState<AuthorResponse[]>([]);


const handledelete =async (ID:number) =>{
  try{
    const response =await axios.delete(`https://localhost:7212/api/Author/${ID}`);
    window.location.reload()
  }catch(error){

    console.error("Error fetching authors:", error);
  }
}

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get<AuthorResponse[]>("https://localhost:7212/api/Author"); // Adjust the API endpoint as needed
        setAuthors(response.data);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };
    fetchAuthors();
  }, []);
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Author List</h2>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Bio</th>
            <th className="border p-2">Status</th>

          </tr>
        </thead>
        <tbody>
          {authors.map(author => (
            <tr key={author.authorId} className="hover:bg-gray-50">
              <td className="border p-2 text-center">{author.authorId}</td>
              <td className="border p-2">{author.name}</td>
              <td className="border p-2">{author.bio}</td>
              <td className="border p-2"><button className="bg-red-500 p-2 rounded-lg" onClick={() => handledelete(author.authorId)}>Delete</button><button className="bg-blue-500 p-2 rounded-lg ml-2">Edit</button></td>
          
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuthorTable;
