# LinkSnap - Modern URL Shortener

![Next.js](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8) ![Prisma](https://img.shields.io/badge/Prisma-ORM-5a67d8)

LinkSnap is a premium, open-source URL shortener built with modern web technologies. It features high-performance redirects, real-time analytics, and a sleek user interface.

## 🚀 Features

- **Blazing Fast**: Redirects optimized for speed (Edge-ready).
- **Analytics**: Track clicks, geographic location (country/city), and device types.
- **Custom Aliases**: Create vanity URLs for your brand.
- **QR Codes**: (Coming Soon) Generate QR codes for any link.
- **Secure Dashboard**: Manage all your links in one place (Auth via GitHub/Google).

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/)
- **Database**: [SQLite](https://sqlite.org/) (Dev) / PostgreSQL (Prod) via [Prisma](https://www.prisma.io/)
- **Auth**: [Auth.js v5](https://authjs.dev/) (NextAuth)

## 📦 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/linksnap.git
    cd linksnap
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**:
    Create a `.env` file in the root:
    ```env
    DATABASE_URL="file:./dev.db"
    AUTH_SECRET="your_random_secret_here"
    AUTH_URL="http://localhost:3000"
    
    # Optional (for Login)
    AUTH_GITHUB_ID="iv1..."
    AUTH_GITHUB_SECRET="..."
    ```

4.  **Initialize Database**:
    ```bash
    npx prisma db push
    ```

5.  **Run Development Server**:
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📄 License

MIT
