import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // 用於獲取 URL 參數和跳轉

const UpdateBook: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // 獲取書籍 ID
  const navigate = useNavigate(); // 用於頁面跳轉
  const [book, setBook] = useState({
    ISBN: "",
    bookname: "",
    author: "",
    publisher: "",
    edition: "",
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:2083/api/v1/user/findBookById?ID=${id}`) // 修改為查詢參數形式
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 200 && data.body) {
            setBook(data.body);
          } else {
            console.error("❌ 無法找到書籍資料");
          }
        })
        .catch((error) => console.error("❌ 載入書籍資料失敗:", error));
    } else {
      console.error("❌ 無效的書籍 ID");
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value }); // 更新書籍資料
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(`http://localhost:2083/api/v1/user/update/${id}`, { // 修改為查詢參數形式
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        alert("書籍更新成功！");
        navigate("/query-books"); // 更新成功後跳轉回書籍列表
      })
      .catch((error) => {
        console.error("❌ 更新書籍失敗:", error);
        alert("更新失敗，請稍後再試！");
      });
  };

  return (
    <div>
      <h1>📖 更新書籍</h1>
      

      <form onSubmit={handleSubmit}>
        <p>
          <label>ISBN: </label>
          <input
            type="text"
            name="ISBN"
            value={book.ISBN}
            onChange={handleInputChange}
            required
          />
        </p>
        <p>
          <label>書名: </label>
          <input
            type="text"
            name="bookname"
            value={book.bookname}
            onChange={handleInputChange}
            required
          />
        </p>
        <p>
          <label>作者: </label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleInputChange}
            required
          />
        </p>
        <p>
          <label>出版社: </label>
          <input
            type="text"
            name="publisher"
            value={book.publisher}
            onChange={handleInputChange}
            required
          />
        </p>
        <p>
          <label>版本: </label>
          <input
            type="text"
            name="edition"
            value={book.edition}
            onChange={handleInputChange}
            required
          />
        </p>
        <button type="submit">更新書籍</button>
        <button type="button" onClick={() => navigate("/query-books")}>
          取消
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
