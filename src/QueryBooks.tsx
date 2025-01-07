import React, { useEffect, useState } from "react";

// 定義 Book 類型，包括新字段
interface Book {
  _id: string;
  ISBN: string;
  bookname: string;
  author: string;
  publisher: string;
  edition: string;
}

const QueryBooks: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/books") // 發送 GET 請求到後端 API
      .then(response => response.json())  // 解析 JSON
      .then(data => setBooks(data))  // 更新書籍列表
      .catch(error => console.error("❌ 獲取書籍失敗:", error));
  }, []);

  return (
    <div>
      <h1>📚 書籍清單</h1>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            <strong>{book.bookname}</strong> - {book.author} ({book.edition}, {book.ISBN})
            <br />
            Publisher: {book.publisher}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QueryBooks;
