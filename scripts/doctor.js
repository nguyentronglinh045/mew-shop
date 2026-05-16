import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const GREEN = '\x1b[32m'
const RED = '\x1b[31m'
const YELLOW = '\x1b[33m'
const CYAN = '\x1b[36m'
const RESET = '\x1b[0m'

console.log(`${CYAN}==========================================${RESET}`)
console.log(`${CYAN}   🚀 BẮT ĐẦU KIỂM TRA HỆ THỐNG (DOCTOR)${RESET}`)
console.log(`${CYAN}==========================================${RESET}\n`)

let hasError = false;

// 1. Kiểm tra Node.js version
console.log(`${YELLOW}1. Kiểm tra Node.js...${RESET}`)
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.replace('v', '').split('.')[0], 10)
if (majorVersion >= 18) {
  console.log(`${GREEN}✔ Node.js hợp lệ: ${nodeVersion}${RESET}`)
} else {
  console.log(`${RED}✖ Cảnh báo: Node.js version ${nodeVersion} quá cũ. Khuyên dùng v18+.${RESET}`)
  hasError = true;
}

// 2. Kiểm tra Yarn
console.log(`\n${YELLOW}2. Kiểm tra Yarn...${RESET}`)
try {
  const yarnVersion = execSync('yarn -v').toString().trim()
  console.log(`${GREEN}✔ Yarn đã được cài đặt: v${yarnVersion}${RESET}`)
} catch (e) {
  console.log(`${RED}✖ Yarn chưa được cài đặt. Vui lòng cài đặt: npm i -g yarn${RESET}`)
  hasError = true;
}

// 3. Setup ENV Frontend
console.log(`\n${YELLOW}3. Kiểm tra ENV Frontend...${RESET}`)
const rootEnvPath = path.join(process.cwd(), '.env')
const rootEnvExamplePath = path.join(process.cwd(), '.env.example')
if (!fs.existsSync(rootEnvPath)) {
  if (fs.existsSync(rootEnvExamplePath)) {
    fs.copyFileSync(rootEnvExamplePath, rootEnvPath)
    console.log(`${GREEN}✔ Đã tạo tự động file .env cho Frontend.${RESET}`)
  } else {
    console.log(`${RED}✖ Không tìm thấy file .env.example ở root.${RESET}`)
    hasError = true;
  }
} else {
  console.log(`${GREEN}✔ File .env cho Frontend đã tồn tại.${RESET}`)
}

// 4. Setup ENV Backend
console.log(`\n${YELLOW}4. Kiểm tra ENV Backend...${RESET}`)
const beEnvPath = path.join(process.cwd(), 'api-ecom-main', '.env')
const beEnvExamplePath = path.join(process.cwd(), 'api-ecom-main', '.env.example')
if (!fs.existsSync(beEnvPath)) {
  if (fs.existsSync(beEnvExamplePath)) {
    fs.copyFileSync(beEnvExamplePath, beEnvPath)
    console.log(`${GREEN}✔ Đã tạo tự động file .env cho Backend.${RESET}`)
  } else {
    console.log(`${RED}✖ Không tìm thấy file .env.example ở backend.${RESET}`)
    hasError = true;
  }
} else {
  console.log(`${GREEN}✔ File .env cho Backend đã tồn tại.${RESET}`)
}

// 5. Cài đặt thư viện
console.log(`\n${YELLOW}5. Cài đặt các thư viện (Yarn Install)...${RESET}`)
try {
  console.log(`Đang chạy cài đặt cho cả FE và BE, vui lòng chờ...`)
  execSync('yarn install:all', { stdio: 'inherit' })
  console.log(`${GREEN}✔ Cài đặt thư viện thành công!${RESET}`)
} catch (e) {
  console.log(`${RED}✖ Lỗi trong quá trình cài đặt thư viện.${RESET}`)
  hasError = true;
}

// Kết luận
console.log(`\n${CYAN}==========================================${RESET}`)
if (hasError) {
  console.log(`${RED}⚠ Quá trình setup có một số lỗi. Vui lòng xem log phía trên.${RESET}`)
} else {
  console.log(`${GREEN}✨ MỌI THỨ ĐÃ SẴN SÀNG! ✨${RESET}`)
  console.log(`Bây giờ bạn chỉ cần gõ lệnh: ${CYAN}yarn dev${RESET} để bắt đầu code!`)
}
console.log(`${CYAN}==========================================${RESET}`)
