Test Assignment: Cars from External API
The goal of this project is to display car data using an external API.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm install
# or
yarn install
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

Technologies and Tools
Next.js
Tailwind CSS
Prettier
ESLint
This project does not use any third-party libraries except for the standard ones.

Project Structure
The project is organized as follows:
/components
  /suspense
    fetchBrands.js  # Component for asynchronously loading car brands
  Loader.jsx        # Loading component
  Select.jsx        # Component for selecting brand/model

/pages
  index.js          # Main page of the application
  _app.js           # Custom App component for global settings
  /result/[makeId]/[year].js  # Dynamic page for car results

API
There are no custom API routes in this project.

Contributing
This project uses React, JavaScript, Tailwind, and Suspense. If you want to contribute to the project, feel free to fork it, make changes, and submit a pull request.

Make sure to follow the coding style using Prettier and ESLint for consistency.

License
This project does not use any specific license.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!




