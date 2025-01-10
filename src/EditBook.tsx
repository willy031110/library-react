import React, { useState } from 'react';

const EditBook: React.FC = () => {
  // 設置書籍表單的狀態
  const [ISBN, setISBN] = useState('');
  const [bookname, setbookname] = useState('');
  const [author, setauthor] = useState('');
  const [publisher, setpublisher] = useState('');
  const [edition, setedition] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // 新增成功訊息的狀態

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 防止表單重新加載頁面

    // 構建要發送到後端的書籍資料
    const newBook = {
      ISBN,
      bookname,
      author,
      publisher,
      edition,
    };

    // 發送 POST 請求到後端
    fetch('http://localhost:2083/api/v1/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook), // 將書籍資料轉換成 JSON 格式
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('成功新增書籍:', data);
        setSuccessMessage('新增成功！'); // 設置成功訊息
        // 清空表單
        setISBN('');
        setbookname('');
        setauthor('');
        setpublisher('');
        setedition('');
      })
      .catch(error => {
        console.error('新增書籍失敗:', error);
        setSuccessMessage('新增失敗，請稍後再試！'); // 顯示錯誤訊息
      });
  };

  return (
    <div>
      <h1>編輯書籍頁面</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <label>ISBN: </label>
          <input
            type="text"
            value={ISBN}
            onChange={e => setISBN(e.target.value)}
            required
          />
        </p>
        <p>
          <label>書名: </label>
          <input
            type="text"
            value={bookname}
            onChange={e => setbookname(e.target.value)}
            required
          />
        </p>
        <p>
          <label>作者: </label>
          <input
            type="text"
            value={author}
            onChange={e => setauthor(e.target.value)}
            required
          />
        </p>
        <p>
          <label>版本: </label>
          <input
            type="text"
            value={edition}
            onChange={e => setedition(e.target.value)}
            required
          />
        </p>
        <p>
          <label>出版社: </label>
          <input
            type="text"
            value={publisher}
            onChange={e => setpublisher(e.target.value)}
            required
          />
        </p>
        <button type="submit">新增書籍</button>
      </form>

      {/* 顯示成功或失敗訊息 */}
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default EditBook;
