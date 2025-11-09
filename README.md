# Rahul Kumar – Portfolio Website

A modern, responsive developer portfolio built with **React 19**, **Vite**, and **Tailwind CSS**. Showcases projects, blog articles, and contact information with a clean, accessible design. Features client-side routing, SEO optimization, dark mode, smooth animations, and an admin panel for content management.

---

## 🚀 Demo

-   **Live Site:** [https://thenamerahulkr.live/](https://thenamerahulkr.live/)
-   **GitHub Repo:** [https://github.com/thenamerahulkr/rahul.dev](https://github.com/thenamerahulkr/rahul.dev)

---

## ✨ Features

-   ⚡️ **Vite** for lightning-fast development and optimized builds
-   ⚛️ **React 19** with modern hooks and patterns
-   � ***Tailwind CSS** for utility-first, responsive design
-   🌗 **Dark/Light Mode** toggle with next-themes
-   � **Dynamicc Blog System** with HTML support, powered by **Supabase**
-   � **SDynamic Projects Showcase** - projects fetched directly from **Supabase**
-   � **Amdmin Panel** for managing projects, blogs, and education entries
-   🎭 **Framer Motion** for smooth animations and transitions
-   � **SContact Form** with Resend API integration
-   🧩 **Radix UI** components for accessible, customizable UI primitives
-   🔗 **Social and Contact Links**
-   📱 **Fully responsive** and accessible design
-   🛠 **SEO optimized** with React Helmet Async for dynamic meta tags
-   🚀 **Code splitting** and lazy loading for optimal performance

---

## 🛠 Tech Stack

### Core
-   [React 19](https://react.dev/) - UI library
-   [Vite](https://vitejs.dev/) - Build tool and dev server
-   [React Router DOM](https://reactrouter.com/) - Client-side routing
-   [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Programming language

### Styling & UI
-   [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
-   [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible component primitives
-   [Lucide React](https://lucide.dev/) - Beautiful icon library
-   [Framer Motion](https://www.framer.com/motion/) - Animation library
-   [next-themes](https://github.com/pacocoursey/next-themes) - Dark mode support

### Backend & Data
-   [Supabase](https://supabase.com/) - Backend as a Service (database, authentication)
-   [Resend](https://resend.com/) - Email API for contact form

### Forms & Validation
-   [React Hook Form](https://react-hook-form.com/) - Form state management
-   [Zod](https://zod.dev/) - Schema validation
-   [@hookform/resolvers](https://github.com/react-hook-form/resolvers) - Form validation resolvers

### SEO & Meta
-   [React Helmet Async](https://github.com/staylor/react-helmet-async) - Dynamic document head management

### Development Tools
-   [ESLint](https://eslint.org/) - Code linting
-   [PostCSS](https://postcss.org/) - CSS processing
-   [Autoprefixer](https://github.com/postcss/autoprefixer) - CSS vendor prefixing

### Deployment
-   [Vercel](https://vercel.com/) / [Netlify](https://www.netlify.com/) - Hosting platforms

---

## � SInstallation & Setup

### Prerequisites
- Node.js 18+ and npm
- Supabase account and project

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/thenamerahulkr/rahul.dev.git
   cd rahul.dev
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_RESEND_API_KEY=your_resend_api_key
   VITE_CONTACT_FORM_TO_EMAIL=your_email@example.com
   VITE_CONTACT_FORM_FROM_EMAIL=contact@yourdomain.com
   VITE_ADMIN_PASSWORD=your_admin_password
   ```

4. **Set up Supabase tables:**
   
   Create the following tables in your Supabase project:
   - `projects` - Store project information
   - `blogs` - Store blog posts
   - `education` - Store education details

5. **Start the development server:**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

---

## 🔐 Admin Panel

Access the admin panel at `/admin` to manage your content:
- Add, edit, and delete projects
- Create and manage blog posts
- Update education information

Default password can be set via `VITE_ADMIN_PASSWORD` environment variable.

---

## 📸 Screenshots

![Home Page](/public/images/portfolio.png)

![About Section](/public/images/portfolio-about.png)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to [open an issue](https://github.com/thenamerahulkr/portfolio/issues) or submit a pull request.

---

## 📄 License

This project is [MIT](LICENSE) licensed.

---

## 📬 Contact

-   **Email:** [thenamerahulkr@gmail.com](mailto:thenamerahulkr@gmail.com)
-   **LinkedIn:** [linkedin.com/in/thenamerahulkr](https://www.linkedin.com/in/thenamerahulkr)
-   **Twitter:** [twitter.com/thenamerahulkr](https://twitter.com/thenamerahulkr)
-   **Portfolio:** [https://thenamerahulkr.live/](https://thenamerahulkr.live)

---


> _Built with ❤️ by Rahul Kumar_