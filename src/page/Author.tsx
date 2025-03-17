import React, { useState } from 'react';
import Authorform from '../components/Authorform';
import Authortable from '../components/Authortable';
import { AuthorResponse } from '../domain/Author.entity'; // Import the AuthorResponse type

const Author = () => {
  const [editAuthor, setEditAuthor] = useState<AuthorResponse | null>(null);  

  return (
    <div>
      <Authorform editAuthor={editAuthor} setEditAuthor={setEditAuthor} />
      <Authortable setEditAuthor={setEditAuthor} />
    </div>
  );
};

export default Author;