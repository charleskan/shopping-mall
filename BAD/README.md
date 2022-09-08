# BAD-project

(Boris)
Home Page

-   登入頁面
     Username
     Password
     註冊
-   註冊頁面
     Username（是否已被使用）
     Password（不可以太短）
     Email（會 send confirmation email）
     暱稱（username 是唯一，暱稱不是，可以隨時改，username 不可以隨時改）

(Yeung)

-   Search 頁面
     可以按 tags
     可以輸入文字 search
     search 作品
     search 作者
     下方位置能夠 list 所有 search 的作品出來
     點擊封面和小說名稱都能夠進入該小說頁面

-   小說頁面（每個小說都會有一個自己的頁面）
     小說封面
     作者
     作品相關
     目錄
     所有章節數都 list 出來。Click 章節數就能夠進入該章節
-   內文頁面
     僅會員可見
     返回目錄（小說頁面）
     下一章
     上一章

用戶相關

-   我的收藏
     頁面類似 search 頁面，所有點過收藏的小說作品相關都會在這裡顯示出來
     點擊封面和小說名稱都能夠進入該小說頁面
     上次看到功能
     移除收藏

(Sherry)

-   我的作品
     頁面類似 search 頁面，所有自己的作品都會在這裡顯示出來
     點擊封面和小說名稱都能夠進入該小說的修改頁面
     新增作品
     進入空白的修改頁面，所有東西都可以自訂
     小說修改頁面
     管理章節
     點擊後會顯示該小說的目錄，點進去可以修改：
     章節編號
     章節
     正文內容
     收費設定（代幣）
     修改作品簡介
     點擊後能夠修改作品內容
     作品名稱
     封面
     作品簡介
     作者的話
     Tags
     作品狀態
     下架（移除）
     是否移除該作品（該動作不能返回）

-   更改個人資料
     暱稱
     頭像
     個人簡介
     Email（修改會再 sd 一封新的 email）

-   修改密碼
     舊密碼
     新密碼
     從新輸入一次新密碼
-   課金相關（代幣）
     帳戶餘額（可提取）
     課金（stripe，代幣 1 換 1）
     課金問題請用 socket io 聯絡 admin

作品相關

-   Like 數
-   收藏數
-   訂閱數
-   點擊數
-   付費章節
-   Tags
-   作品狀態（連載中、已完結）

用戶相關

-   Username
-   Password
-   頭像
-   暱稱
-   個人簡介
-   作品數據

tables
https://drawsql.app/wsp-project/diagrams/novel

需要安裝
npm init
npm install ts-node @types/node typescript express @types/express express-session @types/express-session
npm install --save-dev --save-exact prettier
npm install winston
npm install formidable @types/formidable
npm install pg @types/pg dotenv
npm install xlsx
npm install socket.io
npm install bcryptjs @types/bcryptjs
npm install cross-fetch
npm install sweetalert2
npm install moment --save
npm install nodemailer @types/nodemailer

yarn install
yarn add --dev jest
yarn add --dev typescript ts-jest @types/jest @types/node ts-node ts-node-dev
yarn ts-jest config:init

yarn add knex  pg @types/pg
yarn knex init -x ts