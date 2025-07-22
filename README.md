# MedBot - AI Medical Assistant

A modern medical chatbot powered by Google Gemini AI that can answer medical questions and provide health information.

## Prerequisites

- Node.js (version 14 or higher)
- Yarn package manager

## Installation

1. Clone or download this repository
2. Navigate to the project directory:
   ```bash
   cd medbot
   ```

3. Install dependencies:
   ```bash
   yarn install
   ```

4. Set up environment variables:
   ```bash
   cp env.example .env
   ```
   
   Then edit `.env` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   PORT=3000
   ```

5. Start the development server:
   ```bash
   yarn start
   ```

6. Open your browser and go to `http://localhost:3000`

## Usage

1. Type your medical question in the chat input
2. Press Enter or click the send button
3. Wait for MedBot to process your question and provide a response
4. Continue the conversation as needed

## Development

To run in development mode with auto-restart:

```bash
yarn dev
```

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **AI**: Google Gemini API
- **Styling**: Custom CSS with modern design principles
- **Icons**: Font Awesome
- **Package Manager**: Yarn

## Safety Notice

This chatbot provides general medical information for educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for medical concerns.
