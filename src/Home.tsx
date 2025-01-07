import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();  // 用於頁面跳轉

  const handleQueryBooksClick = () => {
    navigate('/query-books');  // 點擊 query-button 跳轉到查詢書籍頁面
  };

  const handleEditButtonClick = () => {
    navigate('/edit-book');  // 點擊 edit-button 跳轉到編輯書籍頁面
  };

  return (
    <div>
      <button className="query-button" onClick={handleQueryBooksClick}></button>
      <button className="edit-button" onClick={handleEditButtonClick}></button>
    </div>
  );
};

export default Home;
