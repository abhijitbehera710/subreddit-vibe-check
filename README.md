# 🎯 The Subreddit Vibe Check

### Understand the mood of any subreddit instantly.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Render-46C3B7?style=for-the-badge\&logo=render)](https://subreddit-vibe-check.onrender.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge\&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge\&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Database-Supabase-3FCF8E?style=for-the-badge\&logo=supabase)](https://supabase.com/)
[![Gemini AI](https://img.shields.io/badge/AI-Gemini-4285F4?style=for-the-badge\&logo=google)](https://ai.google.dev/)

---

## 📖 About The Project

**The Subreddit Vibe Check** is a modern web application designed to understand the overall mood and sentiment of a Reddit community.

The application analyzes the top posts of a subreddit and presents the results through an easy-to-understand analytics dashboard.

Instead of manually reading dozens of Reddit posts, users can quickly view:

* Overall community vibe
* Positive, neutral, and negative sentiment
* Sentiment distribution
* Individual post sentiment scores
* AI-generated explanations
* Engagement information
* Search and filtering results
* Previous analysis history

The goal is to make Reddit community analysis **simple, visual, and fast**.

---

## 🎬 Live Demo

👉 **[Try The Subreddit Vibe Check](https://subreddit-vibe-check-qi2r.onrender.com/)**

---

## 🚀 Key Features

| Feature                       | Description                                                 |
| ----------------------------- | ----------------------------------------------------------- |
| 🔍 **Subreddit Search**       | Search and analyze different subreddit communities.         |
| 🤖 **AI Sentiment Analysis**  | Uses Google Gemini AI to analyze post sentiment.            |
| 📊 **Analytics Dashboard**    | Displays overall sentiment and important community metrics. |
| 😊 **Vibe Detection**         | Determines the general mood of the analyzed community.      |
| 📝 **Detailed Post Analysis** | View sentiment score and explanation for individual posts.  |
| 🔎 **Smart Filtering**        | Search, filter, sort, and limit displayed posts.            |
| 📈 **Sentiment Distribution** | Visualize positive, neutral, and negative posts.            |
| 🕒 **Analysis History**       | Keep track of previously analyzed subreddits.               |
| 🌙 **Dark / Light Mode**      | Switch between dark and light themes.                       |
| 💾 **Supabase Storage**       | Store analysis results and post information.                |
| 📱 **Responsive UI**          | Designed to work across different screen sizes.             |
| 🔐 **PIN Authentication**     | Protect the dashboard using a 4-digit PIN.                  |

---

## 🧠 How It Works

The application follows a simple workflow:

### 1. 🔍 Enter a Subreddit

The user enters a subreddit name such as:

```text
technology
programming
reactjs
gaming
science
```

### 2. 📥 Fetch Posts

The application obtains the posts that will be analyzed.

The current project includes mock data for development and demonstration purposes.

### 3. 🤖 Analyze Sentiment

Google Gemini AI analyzes the post information and determines:

* **Sentiment** — Positive, Neutral, or Negative
* **Sentiment Score** — Represents the strength of the sentiment
* **Explanation** — Provides a reason for the classification

### 4. 📊 Generate Dashboard

The analyzed information is converted into an interactive dashboard containing:

* Posts analyzed
* Positive posts
* Neutral posts
* Negative posts
* Overall community vibe
* Sentiment distribution
* Post engagement information
* Top analyzed posts

### 5. 🔎 Explore Individual Posts

Users can search, filter, sort, and open individual posts to view more detailed information.

### 6. 💾 Save Analysis

Analysis results can be stored in **Supabase**, allowing the application to retrieve previously processed information.

---

## 🖥️ Dashboard Overview

The dashboard is organized into several sections:

### Summary Cards

Provides a quick overview of:

* Total posts analyzed
* Positive posts
* Neutral posts
* Negative posts

### Vibe Overview

Shows the overall mood of the subreddit based on the analyzed posts.

### Sentiment Overview

Displays the distribution of:

```text
Positive
Neutral
Negative
```

### Post Analysis Table

The post table provides information such as:

* Post title
* Sentiment
* Sentiment score
* Number of comments
* Engagement
* Additional analysis details

### Post Details Modal

Clicking a post opens a detailed view containing its sentiment analysis and explanation.

---

## 🛠️ Tech Stack

| Technology           | Purpose                                   |
| -------------------- | ----------------------------------------- |
| **React 19**         | Frontend UI framework                     |
| **TypeScript**       | Type-safe development                     |
| **Vite**             | Development and production build tool     |
| **Tailwind CSS**     | Styling and responsive UI                 |
| **Supabase**         | Database and backend services             |
| **Google Gemini AI** | AI-powered sentiment analysis             |
| **Lucide React**     | UI icons                                  |
| **Motion**           | UI animations                             |
| **Git & GitHub**     | Version control and repository management |
| **Render**           | Application deployment                    |

---

## 🏗️ Project Structure

```text
subreddit-vibe-check/
│
├── src/
│   │
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── SearchSection.tsx
│   │   ├── SummaryCards.tsx
│   │   ├── VibeOverview.tsx
│   │   ├── SentimentOverview.tsx
│   │   ├── PostTable.tsx
│   │   ├── PostFilters.tsx
│   │   ├── PostModal.tsx
│   │   ├── HistoryModal.tsx
│   │   ├── PinScreen.tsx
│   │   ├── LoadingState.tsx
│   │   ├── ErrorState.tsx
│   │   ├── EmptyState.tsx
│   │   ├── Footer.tsx
│   │   └── InfoModals.tsx
│   │
│   ├── context/
│   │   └── ThemeContext.tsx
│   │
│   ├── data/
│   │   └── mockPosts.ts
│   │
│   ├── lib/
│   │   └── supabase.ts
│   │
│   ├── services/
│   │   └── supabaseService.ts
│   │
│   ├── utils/
│   │   ├── auth.ts
│   │   ├── gemini.ts
│   │   ├── postFilters.ts
│   │   └── sentimentUtils.ts
│   │
│   ├── types.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── .env
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## ⚙️ Getting Started

Follow the steps below to run the project locally.

### Prerequisites

Make sure you have installed:

* **Node.js 18 or newer**
* **npm**
* **Git**

You can verify Node.js and npm using:

```bash
node --version
npm --version
```

---

### 1. Clone the Repository

```bash
git clone https://github.com/abhijitbehera710/subreddit-vibe-check.git
```

Move into the project directory:

```bash
cd subreddit-vibe-check
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Configure Environment Variables

Create a `.env` file in the project root.


```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_GEMINI_API_KEY=your-gemini-api-key
```

> ⚠️ **Important:** Never upload your `.env` file or API keys to GitHub.

Make sure `.env` is included in `.gitignore`.

---

### 4. Start the Development Server

```bash
npm run dev
```

The terminal will provide the local development URL.

Usually, it will be similar to:

```text
http://localhost:5173
```

---

### 5. Build the Application

To create a production build:

```bash
npm run build
```

The production files will be generated inside:

```text
dist/
```

---

## 🗄️ Supabase Database

The project uses **Supabase** to store analysis-related information.

The database contains tables for:

### `analyses`

Stores information about subreddit-level analysis.

Typical information includes:

* Subreddit
* Overall sentiment
* Sentiment counts
* Analysis metadata
* Timestamp

### `analysis_posts`

Stores information about individual analyzed posts.

Typical information includes:

* Post title
* Post ID
* Sentiment
* Sentiment score
* Explanation
* Comments
* Engagement information
* Related analysis

The database allows the application to retrieve previously stored analysis results instead of processing the same information repeatedly.

---

## 🤖 Gemini AI Integration

Google Gemini AI is used for sentiment analysis.

For each post, the AI determines:

```text
Sentiment
     ↓
Positive / Neutral / Negative
     ↓
Sentiment Score
     ↓
Explanation
```

This allows the dashboard to provide more meaningful information than simply displaying raw Reddit posts.

---

## 🧪 Testing With Mock Data

The project includes mock data so that the application can be tested without depending completely on live Reddit data.

Example subreddits include:

```text
technology
programming
gaming
science
```

You can also enter other subreddit names to test the application's UI and analysis workflow.

---

## 🔐 Authentication

The application includes a simple **4-digit PIN authentication screen**.

The default development PIN is:

```text
1234
```

The PIN configuration can be changed in:

```text
src/utils/auth.ts
```

> **Note:** This PIN system is intended for the current application/demo architecture and should not be treated as enterprise-grade authentication for a multi-user production system.

---

## 🌙 Theme Support

The application supports:

* ☀️ Light Mode
* 🌙 Dark Mode

Theme handling is implemented through:

```text
src/context/ThemeContext.tsx
```

The selected theme is applied throughout the dashboard for a consistent user experience.

---

## ☁️ Deployment

### Deploying on Render

The application can be deployed as a Vite static site.

#### Build Command

```bash
npm install && npm run build
```

#### Publish Directory

```text
dist
```

Add the required environment variables in the Render dashboard:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_GEMINI_API_KEY
```

After deployment, Render will provide a public URL for the application.

---

## 🔒 Security

The project follows basic security practices:

| Security Measure                           | Status |
| ------------------------------------------ | ------ |
| Environment variables for API keys         | ✅      |
| `.env` excluded from Git                   | ✅      |
| Supabase database                          | ✅      |
| PIN-based dashboard access                 | ✅      |
| API credentials separated from source code | ✅      |

### ⚠️ Security Recommendation

Never commit credentials such as:

```text
GEMINI_API_KEY
SUPABASE_SERVICE_ROLE_KEY
```

to GitHub.

Only use public/client-safe credentials where appropriate.

---

## 📸 Screenshots

Add screenshots of your application here.

Example:

```text
screenshots/
├── dashboard.png
├── post-details.png
├── history.png
└── dark-mode.png
```

## 🗺️ Future Roadmap

The project can be expanded with the following features:

* [ ] 🔴 Real Reddit API integration
* [ ] 🧠 Analyze complete post content
* [ ] 📊 More advanced analytics
* [ ] 📄 Export analysis reports as PDF
* [ ] 🔗 Shareable analysis links
* [ ] 👤 Multi-user authentication
* [ ] ⭐ Save favorite subreddits
* [ ] 🔔 Real-time subreddit monitoring
* [ ] 📈 Trending subreddit detection
* [ ] 🐦 Twitter/X integration
* [ ] 💬 Discord integration
* [ ] 📱 Progressive Web App support

---

## 🤝 Contributing

Contributions are welcome!

### 1. Fork the Repository

Create your own fork of the project.

### 2. Create a New Branch

```bash
git checkout -b feature/your-feature
```

### 3. Make Your Changes

Implement your feature or fix.

### 4. Commit Your Changes

```bash
git add .
git commit -m "Add your feature"
```

### 5. Push Your Branch

```bash
git push origin feature/your-feature
```

### 6. Create a Pull Request

Open a Pull Request on GitHub and describe your changes.

---

## 📄 License

This project is licensed under the **MIT License**.

You are free to:

* Use the project
* Modify the project
* Distribute the project
* Use it for personal or educational purposes

---

## 🙏 Acknowledgments

Special thanks to:

* **Reddit** — for providing the community platform that inspired this project.
* **Google Gemini** — for AI-powered sentiment analysis.
* **Supabase** — for database and backend services.
* **React** — for the frontend framework.
* **Render** — for application deployment.
* **Lucide** — for the icon library.
* **Motion** — for animation support.

---

## 👨‍💻 Author

### Abhijit Behera

B.Tech Computer Science & Engineering Student

Interested in:

* Full Stack Development
* Artificial Intelligence
* Automation
* Data Structures & Algorithms
* Web Application Development

### GitHub

[![GitHub](https://img.shields.io/badge/GitHub-Abhijit%20Behera-181717?style=for-the-badge\&logo=github)](https://github.com/abhijitbehera710)

---

## ⭐ Support The Project

If you find **The Subreddit Vibe Check** useful or interesting:

⭐ Give the repository a star
🍴 Fork the project
🐛 Report issues
💡 Suggest new features

Your support helps improve the project and encourages further development.

---

## 🎯 Project Vision

> **Turn thousands of Reddit conversations into a simple, understandable community vibe.**

The long-term vision of **The Subreddit Vibe Check** is to become an intelligent community analytics platform that helps users understand what online communities are talking about, how they feel, and how that sentiment changes over time.

---

### Made with ❤️ and code by Abhijit Behera
