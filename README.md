# SilentWords - Sign Language Learning Platform

SilentWords is an interactive sign language learning platform powered by AI technology. The application helps users learn and practice sign language through real-time sign detection, personalized tutorials, and sign-to-text conversion. The goal of SilentWords is to make sign language education accessible to everyone and anywhere.

## 🌟 Key Features

- **Interactive Sign Language Tutorials:** Learn through video demonstrations with step-by-step instructions.
- **Real-Time Sign Detection:** AI technology detects user signs in real time and provides feedback.
- **Personalized Learning Paths:** Tailored learning paths to suit individual progress and goals.
- **Sign-to-Text & Speech Conversion:** Converts signs into text for easier communication and learning.
- **Responsive Design:** Optimized for mobile, tablet, and desktop devices for accessibility anywhere.

## 👥 Target Audience

- **Deaf & Hard-of-Hearing Community:** Primary users who rely on sign language as their main form of communication, helping them enhance their signing skills and learn new sign language variants.
- **People with Speech Impairments:** Individuals who use sign language as an alternative communication method.
- **General Public:** Anyone interested in learning sign language to communicate with deaf, hard-of-hearing, or speech-impaired individuals.
- **Family Members:** Parents, siblings, and relatives of deaf or speech-impaired individuals looking to establish better communication with their loved ones.


## 🛠️ Tech Stack

### Frontend

- **Next.js 15.1:** React-based framework for building fast, modern web applications.
- **React 19:** JavaScript library for building user interfaces.
- **TypeScript:** For type safety and better maintainability of code.
- **Tailwind CSS:** Utility-first CSS framework for fast UI design.
- **Framer Motion:** Animation library for smooth and interactive UI.
- **Socket.IO Client:** Enables real-time communication between the frontend and backend.
- **Axios:** Promise-based HTTP client for making requests to the server.
- **JWT Authentication:** Secure user authentication using JSON Web Tokens.

### Backend

- **.NET 8.0:** Robust framework for building backend services.
- **Entity Framework Core:** ORM for database management and migrations.
- **SQL Server:** Relational database for managing user data and learning progress.
- **JWT Bearer Authentication:** Secure API authentication using JWT tokens.
- **Swagger/OpenAPI:** For API documentation and testing.
- **BCrypt.NET:** For securely hashing and storing user passwords.

### AI Service (Flask API)

- **Flask:** Micro web framework for Python, used for running the AI-based sign language model.
- **TensorFlow/PyTorch (for AI models):** Deep learning frameworks for real-time sign language detection.

## 🚀 Getting Started

### Frontend Setup

Clone the repository and navigate to the frontend directory:

```bash
git clone https://github.com/amardeep-soni/SemicolonHackathon
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser to access the frontend.

### Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Restore dependencies:

```bash
dotnet restore
```

Apply database migrations:

```bash
dotnet ef database update
```

Run the .NET backend project:

```bash
dotnet run
```

The backend API will be available at `https://localhost:7134`.

### AI Flask API Setup

Navigate to the model-service directory:

```bash
cd model-service
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

Start the Flask API:

```bash
python app.py
```

The Flask API will be running at `http://localhost:5000`.

### API Documentation

Once the backend is running, you can explore the API documentation at:

```
https://localhost:7134/swagger/index.html
```

## 📈 Deployment

For Hackathon or Production Deployment:

- **Frontend:** Deployed on Vercel
- **Backend:** Deployed on MonsterASP.NET

## 💡 Contributing

If you’d like to contribute to SilentWords, feel free to fork this repository and submit a pull request. Before contributing, make sure to check the **Issues** section for open tasks and features.

**How to Contribute:**

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -am 'Add new feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.


## 🚀 Future Enhancements

- **Mobile App:** A dedicated mobile app for iOS and Android for learning sign language on the go.
- **Voice-to-Sign Language:** Integration with voice assistants to learn sign language via spoken commands.
- **Gamification:** Introducing fun games and challenges to engage users in learning.
- **Speech Analysis:** Combine voice and sign recognition to enhance the learning experience.
- **Community Features:** Allow users to create and join communities to learn and practice together.

## 📊 Dataset Enhancement Plans

- **Expanded Vocabulary:** Adding more words and phrases across different categories:

  - Medical and Emergency terms
  - Technical and Professional vocabulary
  - Cultural and Regional signs
  - Educational terms for academic settings
  - Daily conversation expansions

- **Accuracy Improvements:**
  - Implementing data augmentation techniques
  - Collecting diverse lighting conditions and backgrounds
  - Including variations in signing styles
  - Adding multi-angle recordings
  - Incorporating different hand sizes and skin tones
  - Enhanced preprocessing and normalization

## 🌍✨ Let's make communication barrier-free with **SilentWords**!
