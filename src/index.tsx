import React from 'react';
import ReactDOM from 'react-dom/client'; // 使用 createRoot
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';  // 引入 Home.tsx
import QueryBooks from './QueryBooks';  // 引入 QueryBooks.tsx
import EditBook from './EditBook';  // 引入 EditBook.tsx
import UpdateBook from './UpdateBook'; // 引入 UpdateBook.tsx
import './index.css';  // 引入全局樣式

// 使用 createRoot 來取代 render
const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <Router>
    
    <Routes>
  <Route path="/" element={<Home />} />  {/* 主頁 */}
  <Route path="/query-books" element={<QueryBooks />} />  {/* 查詢書籍頁面 */}
  <Route path="/edit-book" element={<EditBook />} />  {/* 編輯書籍頁面 */}
  <Route path="/update-book/:id" element={<UpdateBook />} />  {/* 更新書籍頁面，加入 :id */}
</Routes>

  </Router>
);
