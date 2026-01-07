# Retro Portfolio Website

A nostalgic Windows 95-inspired portfolio website that combines classic desktop aesthetics with modern web technologies. Experience a fully interactive desktop environment with draggable windows, sound effects, and a voice assistant.

## 🖥️ Features

- **Classic Windows 95 Interface** - Authentic desktop experience with window management
- **Interactive Windows** - Draggable, resizable windows with proper z-index management
- **Project Showcase** - Detailed project views with technologies and descriptions
- **Voice Assistant** - Integrated voice agent for interactive portfolio exploration
- **Sound Effects** - Retro audio feedback for interactions
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Customizable Settings** - Adjust font sizes and background colors
- **Mobile-Friendly** - Touch-optimized interactions for phones and tablets

## 🛠️ Technologies

- **React** - Modern UI library for component-based development
- **TypeScript** - Type-safe JavaScript for better code quality
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Accessible UI component library
- **VAPI** - Voice AI platform integration
- **Capacitor** - Cross-platform mobile app framework

## 📦 Installation

### Prerequisites

- Node.js (16.0 or higher)
- npm or yarn package manager

### Setup

1. Clone the repository:
```bash
git clone https://github.com/ZinMK/personal-website.git
cd personal-website/retro-folio-explorer
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `retro-folio-explorer` directory:
```env
VITE_VAPI_PUBLIC_KEY=your_vapi_public_key
VITE_VAPI_ASSISTANT_ID=your_vapi_assistant_id
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🚀 Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues

## 📁 Project Structure

```
retro-folio-explorer/
├── src/
│   ├── components/         # React components
│   │   ├── AboutWindow.tsx
│   │   ├── Desktop.tsx
│   │   ├── ProjectsWindow.tsx
│   │   ├── ProjectDetailWindow.tsx
│   │   ├── SettingsWindow.tsx
│   │   ├── VoiceAgent.tsx
│   │   └── WindowManager.tsx
│   ├── hooks/             # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   └── use-sound.ts
│   ├── pages/             # Page components
│   ├── lib/               # Utility functions
│   └── main.tsx           # Application entry point
├── public/
│   ├── images/             # Static images
│   ├── icons/             # Desktop icons
│   └── sounds/            # Audio files
└── dist/                  # Production build output
```

## 🎨 Customization

### Adding Custom Images

- **Desktop Background**: Place your background image at `/public/images/desktop-bg.jpg`
- **Profile Picture**: Place your profile picture at `/public/images/profile-pic.jpg`
- **Desktop Icons**: Add custom icons to `/public/icons/` and reference them in `Desktop.tsx`

### Sound Effects

Add sound files to `/public/sounds/`:
- `click.wav` - Icon click sound
- `double-click.wav` - Double-click sound
- `window-open.wav` - Window open sound
- `error.wav` - Error sound
- `startup.wav` - Startup sound

### Voice Assistant Setup

1. Sign up for a VAPI account at [vapi.ai](https://vapi.ai)
2. Create an assistant in the VAPI dashboard
3. Add your API keys to the `.env` file
4. Configure your assistant to speak about your projects and skills

## 🌐 Deployment

### Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase in the project:
```bash
firebase init hosting
```

4. Build and deploy:
```bash
npm run build
firebase deploy
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Zin Khant**

- Website: [zinmk.com](https://zinmk.com)
- GitHub: [@ZinMK](https://github.com/ZinMK)
- LinkedIn: [zin-khant-993055216](https://www.linkedin.com/in/zin-khant-993055216/)

## 🙏 Acknowledgments

- Windows 95 design inspiration
- shadcn/ui for beautiful component library
- VAPI for voice assistant capabilities
