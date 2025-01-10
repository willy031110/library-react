import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 用於跳轉頁面
import './QueryBooks.css'; // 引入 CSS 檔案

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
  const [query, setQuery] = useState<string>(""); // 用來存儲使用者的查詢
  const [searchType, setSearchType] = useState<'ISBN' | 'bookname'>('bookname'); // 預設為按書名查詢
  const navigate = useNavigate(); // 用於跳轉

  useEffect(() => {
    // 預設加載所有書籍
    fetch("http://localhost:2083/api/v1/user/findall")
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.body)) {
          setBooks(data.body);
        } else {
          console.error("❌ 獲取書籍資料錯誤: body 不是陣列");
          setBooks([]);
        }
      })
      .catch(error => console.error("❌ 獲取書籍失敗:", error));
  }, []);

  const handleSearch = () => {
    const url = searchType === 'bookname'
      ? `http://localhost:2083/api/v1/user/findBook?bookname=${query}`
      : `http://localhost:2083/api/v1/user/findBook?ISBN=${query}`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.body && typeof data.body === 'object') {
          setBooks([data.body]); // 將單一書籍物件包裝成陣列
        } else {
          console.error("❌ 查詢書籍資料錯誤");
          setBooks([]);
        }
      })
      .catch(error => console.error("❌ 查詢書籍失敗:", error));
  };

  const handleDelete = (id: string) => {
    if (window.confirm("確定要刪除此書籍嗎？")) {
      fetch(`http://localhost:2083/api/v1/user/delete/${id}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          setBooks(books.filter(book => book._id !== id)); // 刪除成功後更新狀態
        })
        .catch(error => console.error("❌ 刪除書籍失敗:", error));
    }
  };

  const handleEdit = (ISBN: string) => {
    navigate(`/update-book/${ISBN}`); // 使用 ISBN 進行導航
  };

  // 返回主頁面
  const handleGoHome = () => {
    navigate("/"); // 導向主頁
  };

  return (
    <div className="books-wrapper">
      <h1>📚 書籍清單</h1>

      {/* 返回主頁按鈕 */}
      

      {/* 查詢欄位 */}
      <div className="search-container">
      <button className="go-home-btn" onClick={handleGoHome}>返回主頁</button>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="輸入書名或 ISBN"
        />
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value as 'ISBN' | 'bookname')}
        >
          <option value="bookname">按書名查詢</option>
          <option value="ISBN">按 ISBN 查詢</option>
        </select>
        <button onClick={handleSearch}>查詢</button>
      </div>

      <div className="books-container">
        {books.length > 0 ? (
          books.map(book => (
            <div className="book-item" key={book._id}>
              <h3>{book.bookname}</h3>
              <img 
                src="/4.png" 
                alt="書籍封面" 
              />
              <p>
                <span>作者:</span> {book.author}<br />
                <span>ISBN:</span> {book.ISBN}<br />
                <span>出版社:</span> {book.publisher}<br />
                <span>版次:</span> {book.edition}<br />
                {/* 使用新容器包裹按鈕 */}
                <button onClick={() => handleEdit(book._id)}>修改</button>
                <button onClick={() => handleDelete(book._id)}>刪除</button>
              </p>
            </div>
          ))
        ) : (
          <p>沒有找到相關書籍</p>
        )}
      </div>
    </div>
  );
}

export default QueryBooks;
