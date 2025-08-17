# Futuristic Task Management App

A modern, aesthetic task management application built with React and Material-UI, featuring a futuristic glass morphism design with gradient effects and smooth animations.

## Features

- ✨ **Modern UI Design**: Glass morphism effects with gradient backgrounds
- 📱 **Responsive Layout**: Works seamlessly on desktop and mobile devices
- 🔐 **User Authentication**: Login and signup functionality
- 📋 **Task Management**: Create, edit, delete, and organize tasks
- 🎯 **Task Categories**: Organize tasks with different priority levels
- 🔍 **Task Details**: Detailed view for each task with full descriptions
- 🎨 **Futuristic Aesthetics**: Clean white background with blue/purple gradients

## Tech Stack

- **Frontend**: React 18
- **UI Framework**: Material-UI (MUI) v5
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Styling**: CSS-in-JS with MUI's styling system
- **Icons**: Material-UI Icons

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 16.0 or higher)
- **npm** or **yarn** package manager

## Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd futuristic-task-app
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

   Or if you prefer yarn:
   \`\`\`bash
   yarn install
   \`\`\`

## Required Dependencies

The application uses the following main dependencies:

\`\`\`json
{
  "@mui/material": "^5.15.0",
  "@mui/icons-material": "^5.15.0",
  "@emotion/react": "^11.11.0",
  "@emotion/styled": "^11.11.0",
  "@reduxjs/toolkit": "^2.0.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-redux": "^9.0.0",
  "react-router-dom": "^6.8.0"
}
\`\`\`

## Running the Application

1. **Start the development server**
   \`\`\`bash
   npm start
   \`\`\`

   Or with yarn:
   \`\`\`bash
   yarn start
   \`\`\`

2. **Open your browser**

   The application will automatically open in your default browser at `http://localhost:3000`

## Project Structure

\`\`\`
src/
├── Components/
│   ├── Navbar.jsx          # Navigation bar component
│   └── TaskCard.jsx        # Individual task card component
├── Pages/
│   ├── Dashboard/
│   │   └── Dashboard.jsx   # Main dashboard page
│   ├── Login/
│   │   └── Login.jsx       # Login page
│   ├── Signup/
│   │   └── Signup.jsx      # Signup page
│   └── TaskDetail/
│       └── TaskDetail.jsx  # Task details page
├── Store/
│   └── store.js           # Redux store configuration
└── App.jsx                # Main application component
\`\`\`

## Usage

### Getting Started

1. **Sign Up**: Create a new account using the signup page
2. **Login**: Access your account through the login page
3. **Dashboard**: View all your tasks in the main dashboard
4. **Create Tasks**: Add new tasks with titles, descriptions, and priorities
5. **Manage Tasks**: Edit, delete, or mark tasks as complete
6. **Task Details**: Click on any task to view detailed information

### Navigation

- **Dashboard**: Main view showing all tasks
- **Profile**: User profile and settings (accessible via navbar)
- **Logout**: Sign out of your account

## Design Features

### Visual Elements

- **Glass Morphism**: Subtle transparency effects with backdrop blur
- **Gradient Backgrounds**: Beautiful blue-to-purple gradients
- **Smooth Animations**: Hover effects and transitions throughout
- **Modern Typography**: Clean, readable fonts with gradient text effects
- **Consistent Spacing**: Well-organized layout with proper visual hierarchy

### Color Scheme

- **Primary**: Blue gradient (#1976d2 to #42a5f5)
- **Secondary**: Purple accent (#9c27b0)
- **Background**: Clean white (#ffffff)
- **Text**: Dark gray (#333333) with gradient effects for headers

## Customization

### Changing Colors

To modify the color scheme, update the gradient values in the component styles:

\`\`\`jsx
background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)'
\`\`\`

### Adding New Features

1. Create new components in the `src/Components/` directory
2. Add new pages in the `src/Pages/` directory
3. Update routing in `App.jsx`
4. Extend Redux store if needed for state management

## Troubleshooting

### Common Issues

1. **Port already in use**: If port 3000 is busy, the app will automatically use the next available port
2. **Dependencies not found**: Run `npm install` to ensure all packages are installed
3. **Build errors**: Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Performance Tips

- The application uses React's built-in optimization features
- Large task lists are handled efficiently with proper state management
- Images and assets are optimized for fast loading

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support or questions, please open an issue in the repository or contact the development team.

---

**Enjoy your futuristic task management experience!** 🚀
