# React + TypeScript + Vite

https://themes.sapo.vn/demo/mew-mobile
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Local setup (FE + BE chung)

Yêu cầu: Node 18+, Yarn, Docker Desktop.

```bash
# 1. Cài deps cho cả FE và BE
yarn install:all

# 2. Tạo file env
cp .env.example .env
cp api-ecom-main/.env.example api-ecom-main/.env

# 3. Start MongoDB (Docker)
yarn dev:db

# 4. Start FE (port 3000) + BE (port 4000) song song
yarn dev
```

Stop Mongo khi xong: `yarn dev:db:down`.

### Seed data

Lần đầu chạy `yarn dev:db`, container sẽ tự import [api-ecom-main/main.categories.json](api-ecom-main/main.categories.json) và [api-ecom-main/main.products.json](api-ecom-main/main.products.json) vào collection `categories` / `products` của DB `main`.

Init script chỉ chạy khi volume **trống**. Nếu đã chạy `dev:db` từ trước mà chưa có seed, reset volume:

```bash
yarn dev:db:down
docker volume rm mew-shop_mongo_data
yarn dev:db
```

| Service | URL |
|---------|-----|
| FE (Vite) | http://localhost:3000 |
| BE (Express API) | http://localhost:4000 |
| MongoDB | mongodb://admin:admin@localhost:27017 |


Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
