# README

## 專案概述

此專案為一個簡單的書籍管理系統，用戶可以查詢、編輯、刪除和更新書籍資訊。通過本專案，我們希望達成以下目標：

- 熟悉前後端分離架構的開發過程。
- 掌握 RESTful API 的設計與實現。
- 提供直觀且使用者友善的界面，提升數據管理效率。

## 技術選擇

### 前端技術：

1. **React + TypeScript**：
   - 基於組件的開發方式，提高代碼的可重用性與可維護性。
   - TypeScript 提供靜態代碼檢查，減少運行時錯誤。

### 後端技術：

1. **Node.js + Express**：
   - 高效處理異步請求，適合構建 RESTful API。
   - 豐富的中間件庫，提高開發效率。

### 資料庫：

1. **MongoDB**：
   - 提供靈活的文檔存儲結構，用於處理書籍數據。
   - 高性能與可擴展性，適合快速開發。

## 架構概述

- **前端**：使用 React + TypeScript 處理 UI 渲染和用戶交互。
- **後端**：使用 Node.js + Express 提供 API，處理前端請求並與資料庫交互。
- **資料庫**：使用 MongoDB 儲存書籍數據，支持 CRUD 操作。

## 安裝與執行指引

1. **安裝專案依賴：**

   ```bash
   npm install
   ```

2. **啟動後端伺服器：**
   確保 MongoDB 已運行，然後啟動伺服器：

   ```bash
   npm run server
   ```

3. **啟動前端開發伺服器：**
   啟動 React 開發伺服器：

   ```bash
   npm start
   ```

4. **訪問應用程序：**
   打開瀏覽器並訪問 `http://localhost:3000`。

---

## API 規格說明文件

### 獲取所有書籍

- **路由：** `/api/v1/user/findall`
- **HTTP 方法：** GET
- **參數：** 無
- **回應範例：**
  ```json
  {
    "code": 200,
    "body": [
      {
        "_id": "677fff41f4c03ec343c3b2bc",
        "ISBN": "9781234567890",
        "bookname": "Example Book",
        "author": "Author Name",
        "publisher": "Publisher Name",
        "edition": "1"
      }
    ]
  }
  ```

### 查詢特定書籍

- **路由：** `/api/v1/user/findBook`
- **HTTP 方法：** GET
- **參數：**
  - `ISBN` 或 `bookname`（必須提供一個）
- **回應範例：**
  ```json
  {
    "code": 200,
    "body": {
      "_id": "677fff41f4c03ec343c3b2bc",
      "ISBN": "9781234567890",
      "bookname": "Example Book",
      "author": "Author Name",
      "publisher": "Publisher Name",
      "edition": "1"
    }
  }
  ```

### 添加新書籍

- **路由：** `/api/v1/user/add`
- **HTTP 方法：** POST
- **參數：**
  - `ISBN`（必填）
  - `bookname`（必填）
  - `author`（必填）
  - `publisher`（必填）
  - `edition`（必填）
- **回應範例：**
  ```json
  {
    "code": 201,
    "message": "Book added successfully"
  }
  ```

### 更新書籍

- **路由：** `/api/v1/user/update?ID=<BookID>`
- **HTTP 方法：** PUT
- **參數：**
  - 書籍資料（JSON 格式）
- **回應範例：**
  ```json
  {
    "code": 200,
    "message": "Book updated successfully"
  }
  ```

### 刪除書籍

- **路由：** `/api/v1/user/delete/<BookID>`
- **HTTP 方法：** DELETE
- **參數：** 無
- **回應範例：**
  ```json
  {
    "code": 200,
    "message": "Book deleted successfully"
  }
  ```

---

## 架構圖與流程圖

### 架構圖

```text
+----------------------+        +--------------------+       +------------------+
|      前端           | <----> |      後端           | <----> |     資料庫        |
|  (React + TS)       |        |  (Node.js + Exp)   |        |    (MongoDB)     |
+----------------------+        +--------------------+       +------------------+
```

- **前端** 提供使用者界面，通過 HTTP 請求與後端 API 通信。
- **後端** 接收來自前端的請求，處理業務邏輯並與資料庫交互。
- **資料庫** 負責儲存和管理書籍相關數據。

### CRUD 流程圖

```text
用戶操作 --> 前端發送請求 --> 後端接收請求 --> 與資料庫交互 --> 返回結果至前端 --> 顯示結果
```

#### 示例：

1. **書籍查詢流程：**
   - 用戶輸入查詢條件並點擊搜索按鈕。
   - 前端向 `/api/v1/user/findBook` 發送 GET 請求。
   - 後端根據參數查詢資料庫並返回匹配結果。
   - 前端解析回應並顯示查詢結果。

