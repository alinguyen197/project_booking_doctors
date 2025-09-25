# project_booking_doctors

BE

- SQL : ORM (object relational mapping) 
- sequelize cung cấp hàm để tương tác db tiện lơi 
- Express framework
- Nodejs environment
  => build from scratch

FE

- React : Class component
- Redux toolkit : mange state
- Sass
- TypeScript

Others :

- Send email with NodeMailer
- FB Chat Plugin
- FB comment Plugin
- FB Like/Share


# Setup cài sequelize và cấu hình database
👉 1. Cài đặt các thư viện: sequlize-cli, sequelize và mysql2
npm install --save-dev sequelize-cli@6.2.0
npm install --save mysql2@2.2.5
npm install --save sequelize@6.6.2

👉 2. Thêm file .sequelizerc tại thư mục root
Nội dung file .sequelizerc
const path = require('path');
module.exports = {
  'config': path.resolve('./src/config', 'config.json'),
  'migrations-path': path.resolve('./src', 'migrations'),
  'models-path': path.resolve('./src', 'models'),
  'seeders-path': path.resolve('./src', 'seeders')
}

👉 Tại thư mục root, sử dụng câu lệnh: node_modules/.bin/sequelize init 
=> npx sequelize-cli init

👉 3. Tạo model - tương đương tạo table: 
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string

👉 4: Tạo migrations: để tự động map table vào database
npx sequelize-cli db:migrate

👉5. Tạo Seeder (tạo data) : npx sequelize-cli seed:generate --name demo-user 
- Run các seeder : npx sequelize-cli db:seed:all
- Undo : npx sequelize-cli db:seed:undo:all

👉6. tạo file connectDB.js để dùng sequelize để kết nối DB (https://sequelize.org/docs/v6/getting-started/#connecting-to-a-database)


# Package

- npm install --save @types/node : definitions for node
- npm install -D typescript@next
- "body-parser" : nhận request body parser from client
- "dotenv": file cấu hình http
- "ejs": Embedded JavaScript templates
- "express":  
- "@babel/core": 
- "@babel/node": 
- "@babel/preset-env": 
- "nodemon": auto watch and run 
-  bcrypt@2.4.3 : hash password send server

# ERD Database
User : admin, doctors, patients
    - id : PK auto increment
    - email
    - password
    - fullname  
    - phoneNumber
    - gender
    - roleId : R1, R2, R3
    - phoneNumber
    - positionId : giáo sư, tiến sĩ, bác sĩ
    - image
Schedule :
    - id : PK auto increment
    - currentNumber
    - maxNumber
    - date
    - timeType
    - doctorId
History :
    - id : PK auto increment
    - patientId
    - doctorId
    - description
    - files
allCode :
    - id : PK auto increment
    - key (role,status,time)
    - type
    - value
booking :
    - id : PK auto increment
    - statusId
    - doctorId
    - patientId
    - date
    - timeType
clinics :
    - id : PK auto increment
    - address
    - description
    - image 
    - name
specialist :
    - id : PK auto increment
    - image
    - description
    - name
doctor_clinic_specialty :
    - id : PK auto increment
    - doctorId
    - clinicId
    - specialtyId
markdown :	
	- id
	- doctorId
	- clinicId
	- specialtyid
	- contentHTML
	- contentMarkdown
	- description
	
doctor_infor :
    - id
	- doctorId
	- priceId
	- provinceId
	- paymentId
	- addressClinic
	- nameClinic
	- note
	- count