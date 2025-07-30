# 🎨 VS Code Theme Creator

A web application that allows you to create and customize your own Visual Studio Code themes with a live preview and easy export functionality.

## ✨ Features

- **Live Preview**: See your theme changes in real-time with a sample TypeScript/JavaScript code
- **Comprehensive Color Customization**: 
  - Editor background, foreground, and line highlighting
  - Syntax highlighting for keywords, functions, strings, numbers, comments, variables, types, and operators
  - UI elements like sidebar, activity bar, status bar, and title bar
- **Easy Export**: Copy to clipboard or download the theme JSON file
- **Modern UI**: Beautiful, responsive design with glassmorphism effects
- **VS Code Compatible**: Generates proper VS Code theme JSON format

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vsthemecreator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎯 How to Use

1. **Configure Your Theme**:
   - Set a theme name and type (dark/light)
   - Customize editor colors using the color pickers
   - Adjust syntax highlighting colors
   - Modify UI element colors

2. **Preview Your Changes**:
   - See a live preview of your theme with sample code
   - The preview shows how your theme will look in VS Code

3. **Export Your Theme**:
   - Copy the JSON to clipboard or download the file
   - Follow the instructions to install in VS Code

## 📁 Installing Your Theme in VS Code

1. Copy the generated JSON or download the theme file
2. Create a new file in VS Code with the theme content
3. Save it as `your-theme-name-color-theme.json`
4. Place it in your VS Code themes folder:
   - **Windows**: `%APPDATA%\Code\User\themes\`
   - **macOS**: `~/Library/Application Support/Code/User/themes/`
   - **Linux**: `~/.config/Code/User/themes/`
5. Restart VS Code
6. Go to Settings → Color Theme and select your theme

## 🛠️ Built With

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Lucide React** - Icons
- **CSS3** - Styling with modern features like backdrop-filter

## 📱 Responsive Design

The application is fully responsive and works great on:
- Desktop computers
- Tablets
- Mobile devices

## 🎨 Theme Structure

The generated theme follows the VS Code theme format with:

- **Colors**: Editor and UI element colors
- **Token Colors**: Syntax highlighting rules
- **Proper scoping**: Correct VS Code token scopes for syntax highlighting

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- VS Code team for the theme format specification
- The React and Vite communities for excellent tooling
- Lucide for beautiful icons
