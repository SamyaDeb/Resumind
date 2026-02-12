# Resumind - AI Powered Resume Builder 

An intelligent resume builder powered by AI that helps you create professional, ATS-optimized resumes with ease.

<img width="1470" height="956" alt="Screenshot 2026-01-31 at 7 37 03 PM" src="https://github.com/user-attachments/assets/393c06d6-a6b8-4999-9a30-176473faacac" />

## ✨ Features

- **AI-Powered Content Generation**: Leverage advanced LLM to enhance your resume content
- **ATS Score Analysis**: Get real-time feedback on how well your resume performs with Applicant Tracking Systems
- **Professional Templates**: Choose from modern, professionally designed LaTeX templates
- **Real-time Preview**: See your resume rendered in real-time as you build it
- **PDF Export**: Download your resume as a high-quality PDF
- **User Authentication**: Secure login with Firebase Authentication
- **Cloud Storage**: Save and retrieve your resumes from the cloud

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework for production
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable component library
- **Firebase Auth** - User authentication

### Backend
- **Node.js & Express** - Server runtime and framework
- **TypeScript** - Type-safe backend development
- **Firebase Admin** - Cloud Firestore database
- **LaTeX** - Professional document generation
- **OpenAI API** - AI-powered content enhancement

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Firebase project set up
- OpenAI API key
- LaTeX distribution (for PDF generation)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SamyaDeb/Resumind.git
   cd Resumind
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Configure Environment Variables**
   
   Create `.env` file in the backend directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_CLIENT_EMAIL=your_client_email
   FIREBASE_PRIVATE_KEY=your_private_key
   ```

5. **Run the Development Servers**
   
   Backend:
   ```bash
   cd backend
   npm run dev
   ```
   
   Frontend:
   ```bash
   cd frontend
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:3000`

## 📝 License

This project is open source and available under the MIT License.

