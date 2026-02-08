# Daily Spending Report App

A React web application that integrates with YNAB (You Need A Budget) to visualize daily spending patterns by category.

## Genesis & Prologue
**Why:**  
This application grew out of a frustration to manage our daily spending, despite the wonderful world of [YNAB](https://www.ynab.com). How can we be spending this much every day while I have my eagle eyes on the account at least every week?! My manager daemon whispered in my ear "what isn't measured isn't managed...". I realized that while I love YNAB, it doesn't give you a built-in break-down of your daily spending, so I decided to build something to help.  

**Technical Approach:**  
I stuck with React and Vite because that's what I'd been using in Full Stack Open - I wanted to focus on solving the data problem rather than learning a new framework. I chose Material-UI specifically for their chart components. Since I do a lot of reporting in my operations role, I wanted to challenge myself to integrate data visualization into a real project.  

**What I learned:**  
* The power of regex for text processing
* How to integrate chart libraries into React applications  

**What I would do differently:**  
Start with UI first and work backwards to data parsing, rather than processing data without knowing how charts would consume it.

## Demo

https://github.com/user-attachments/assets/a0fab467-8bdf-4ac3-b73e-fe9024cb3f65

## Features

- Connect to your YNAB account via API
- Select custom date ranges for analysis
- View daily spending totals
- Interactive bar charts showing spending breakdown by category
- Clean, responsive Material-UI interface

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and development server
- **Material-UI (MUI)** - Component library and charts
- **YNAB SDK** - API integration for budget data

## Getting Started

### Prerequisites

- Node.js (v18+)
- A YNAB account with API access
- YNAB Personal Access Token ([get one here](https://app.ynab.com/settings/developer))

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd daily-spending-report-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create environment files in the project root:

   **`.env`** (shared configuration loaded by all modes):

   ```
   VITE_ACCESS_TOKEN=your_ynab_api_token
   ```

   **`.env.test`** (test mode - loaded when running `npm run test`):

   ```
   VITE_MAIN_BUDGET_ID=your_test_budget_uuid
   VITE_MAIN_CHECKING_ID=your_test_account_uuid
   ```

   **`.env.personal`** (personal mode - loaded when running `npm run personal`):

   ```
   VITE_MAIN_BUDGET_ID=your_personal_budget_uuid
   VITE_MAIN_CHECKING_ID=your_personal_account_uuid
   ```

   See `.env.example` for a template with all available variables.

4. Start the development server:

   ```bash
   npm run test        # Runs in test mode (uses .env.test)
   npm run personal    # Runs in personal mode (uses .env.personal)
   ```

5. Open your browser to `http://localhost:5173`

## Usage

1. Select a start and end date for the period you want to analyze
2. Choose a specific day from the dropdown to see detailed spending
3. View the bar chart breakdown of spending by category

## Available Scripts

| Command            | Description                               |
| ------------------ | ----------------------------------------- |
| `npm run test`     | Start development server in test mode     |
| `npm run personal` | Start development server in personal mode |
| `npm run build`    | Build for production                      |
| `npm run preview`  | Preview production build                  |
| `npm run lint`     | Run ESLint                                |

## Project Structure

```
src/
├── main.jsx          # App entry point
├── App.jsx           # Main component with UI logic
└── modules/
    └── ynab/
        ├── config.js     # Environment configuration loader
        ├── index.js      # Data processing logic
        ├── ynabApi.js    # YNAB API functions
        └── index.test.js # Unit tests
```

## Testing

Testing focuses on the YNAB data-processing module using Node's built-in test runner. The current suite validates the core aggregation logic for grouping transactions by date and category, keeping coverage centered on the calculations that drive the reporting UI.

Run unit tests with:

```bash
node --test src/modules/ynab/index.test.js
```

## License

MIT
