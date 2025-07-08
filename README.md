# VerdantLearn 🌿: Master Your Knowledge with AI-Powered Flashcards

VerdantLearn is a modern, intuitive flashcard application designed to supercharge your learning journey. 🚀 Built with Next.js, it offers seamless study set management, interactive flashcard sessions, and integrates cutting-edge AI to provide smart memory aid suggestions. Whether you're memorizing vocabulary or complex concepts, VerdantLearn helps you cultivate deeper understanding and retention. ✨

## Usage

VerdantLearn is designed for a straightforward and efficient study experience. Here's how to get the most out of it:

### Creating Study Sets
1.  **Open the Application:** Navigate to the home page (`/`).
2.  **Initiate Set Creation:** Click the "Create Set" button. A dialog will appear asking for the set's name.
3.  **Name Your Set:** Enter a descriptive name for your study set (e.g., "Spanish Vocabulary," "React Hooks Basics").
4.  **Confirm Creation:** Click "Create Set" within the dialog. Your new set will appear on the home page.

### Adding Flashcards
1.  **Select a Study Set:** From the home page, click on a study set's title or its card to navigate to its detail page (`/set/[setId]`).
2.  **Locate the Form:** On the set detail page, you'll see a section titled "Add a New Card."
3.  **Enter Card Content:**
    *   **Front:** Type the term or question for the front of your flashcard (e.g., "Hola").
    *   **Back:** Type the definition or answer for the back of your flashcard (e.g., "Hello").
4.  **Save the Card:** Click the "Add Card" button. The new flashcard will be added to the set and instantly visible in the table below.

### Studying Flashcards
1.  **Start a Study Session:** On the study set detail page, click the "Start Studying" button. This will take you to the study mode (`/set/[setId]/study`).
2.  **Flip Cards:** Click anywhere on the displayed flashcard to flip it between its front and back.
3.  **Navigate Cards:**
    *   Use the "Next" button to move to the next flashcard in the shuffled deck.
    *   Use the "Prev" button to go back to the previous flashcard.
4.  **Mark as Learned:** Click the "Mark as Learned" button to toggle the card's learned status. This helps you track your mastery within the set. If a card is already marked, the button will change to "Mark as Unlearned."
5.  **Get Smart Suggestions:** While studying, click the "Get Smart Suggestion" button. This will use AI to provide memory aids (e.g., mnemonics, analogies, related concepts) to help you better understand and remember the content. Suggestions will appear in a popover.
6.  **Shuffle Deck:** If you want to randomize the order of cards again, click the "Shuffle Deck" button.

### Managing Cards and Sets
*   **Delete a Card:** On the study set detail page, find the card in the "Cards in this Set" table. Click the trash icon (🗑️) next to the card you wish to delete. Confirm the action in the alert dialog.
*   **Delete a Study Set:** On the study set detail page, click the "Delete Set" button. An alert dialog will ask for confirmation, as this action is permanent.

## Features

*   **Intuitive Study Set Management:** Easily create, view, and organize your flashcard sets.
*   **Interactive Flashcards:** Engage with a dynamic study mode allowing seamless flipping and navigation between cards.
*   **AI-Powered Memory Aids:** Leverage Genkit and Google AI to generate intelligent suggestions like mnemonics, analogies, and related concepts for your flashcards, significantly enhancing recall.
*   **Progress Tracking:** Monitor your learning journey with clear progress indicators for each study set, showing the percentage of cards mastered.
*   **Client-Side Persistence:** All your study sets and flashcards are securely saved locally using IndexedDB, ensuring your data is always available without needing a backend.
*   **Responsive Design:** A sleek, modern user interface crafted with Tailwind CSS and Shadcn UI, providing a consistent and enjoyable experience across all devices.
*   **Toast Notifications:** Receive clear and concise feedback for actions like adding cards or creating sets.

## Technologies Used

VerdantLearn is built using a robust and modern tech stack to ensure a performant and scalable application:

| Technology         | Description                                                                 | Link                                            |
| :----------------- | :-------------------------------------------------------------------------- | :---------------------------------------------- |
| **Next.js**        | A flexible React framework for building full-stack web applications.        | [Next.js](https://nextjs.org/)                  |
| **React**          | A declarative, component-based JavaScript library for UI development.       | [React](https://react.dev/)                     |
| **TypeScript**     | A superset of JavaScript providing static type checking for robust code.    | [TypeScript](https://www.typescriptlang.org/)   |
| **Tailwind CSS**   | A utility-first CSS framework for rapidly building custom designs.          | [Tailwind CSS](https://tailwindcss.com/)       |
| **Shadcn UI**      | A collection of beautiful and accessible UI components built with Radix UI. | [Shadcn UI](https://ui.shadcn.com/)             |
| **Genkit AI**      | An open-source framework to build, deploy, and monitor AI applications.     | [Genkit](https://genkit.ai/)                    |
| **Google AI**      | Provides advanced AI models and services, integrated via Genkit.            | [Google AI](https://ai.google/)                 |
| **IndexedDB**      | A browser-based database for client-side storage of structured data.        | [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) |
| **React Hook Form**| A performant and flexible library for form validation in React.             | [React Hook Form](https://react-hook-form.com/) |
| **Zod**            | A TypeScript-first schema declaration and validation library.               | [Zod](https://zod.dev/)                         |

## Contributing

We welcome contributions to VerdantLearn! Whether it's fixing a bug, adding a new feature, or improving documentation, your help is invaluable.

Here’s how you can contribute:
*   ✨ Fork the repository.
*   🌿 Create a new branch (`git checkout -b feature/your-feature-name`).
*   📝 Make your changes.
*   ✅ Ensure your code adheres to the project's style guidelines.
*   🧪 Write and run tests if applicable.
*   🚀 Commit your changes (`git commit -m 'feat: Add new feature'`).
*   ⬆️ Push to the branch (`git push origin feature/your-feature-name`).
*   🤝 Open a Pull Request.

Please ensure your pull request clearly describes the changes and links to any relevant issues.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author Info

**Daniel**
*   [GitHub](https://github.com/your-github-username)
*   [LinkedIn](https://www.linkedin.com/in/your-linkedin-profile)
*   [Twitter](https://twitter.com/your-twitter-handle)

---

---
![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-Black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Genkit AI](https://img.shields.io/badge/Genkit_AI-6A5ACD?style=for-the-badge&logo=google&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)