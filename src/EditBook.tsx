// src/EditBook.tsx
import React, { useState } from 'react';

const EditBook: React.FC = () => {
  // 設置書籍表單的狀態
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [publisher, setPublisher] = useState('');
  const [edition, setEdition] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 防止表單重新加載頁面

    // 構建要發送到後端的書籍資料
    const newBook = {
      title,
      author,
      publishedYear: parseInt(publishedYear),
      publisher,
      edition,
    };

    // 發送 POST 請求到後端
    fetch('http://localhost:5000/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook), // 將書籍資料轉換成 JSON 格式
    })
      .then(response => response.json())
      .then(data => {
        console.log('成功新增書籍:', data);
        // 成功後可以做一些提示或跳轉
      })
      .catch(error => {
        console.error('新增書籍失敗:', error);
      });
  };

  return (
    <div>
      <h1>編輯書籍頁面</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>書名:</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>作者:</label>
          <input
            type="text"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>出版年份:</label>
          <input
            type="number"
            value={publishedYear}
            onChange={e => setPublishedYear(e.target.value)}
            required
          />
        </div>
        <div>
          <label>出版社:</label>
          <input
            type="text"
            value={publisher}
            onChange={e => setPublisher(e.target.value)}
            required
          />
        </div>
        <div>
          <label>版本:</label>
          <input
            type="text"
            value={edition}
            onChange={e => setEdition(e.target.value)}
            required
          />
        </div>
        <button type="submit">新增書籍</button>
      </form>
    </div>
  );
};

export default EditBook;
