# Daily Spending Report App

A React web application that integrates with YNAB (You Need A Budget) to visualize daily spending patterns by category.

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

   **`.env`** (shared configuration):
   ```
   VITE_ACCESS_TOKEN=your_ynab_api_token
   ```

   **`.env.test`** (test mode):
   ```
   VITE_MODE=test
   VITE_TEST_BUDGET_ID=your_test_budget_uuid
   VITE_TEST_BUDGET_CHECKING_ID=your_test_account_uuid
   ```

   **`.env.personal`** (personal/production mode):
   ```
   VITE_MODE=personal
   VITE_MAIN_BUDGET_ID=your_personal_budget_uuid
   VITE_MAIN_CHECKING_ID=your_personal_account_uuid
   ```

4. Start the development server:

   ```bash
   npm run dev              # Runs in default mode (test)
   npm run dev:test        # Explicitly runs in test mode
   npm run dev:prod        # Runs in personal/production mode
   ```

5. Open your browser to `http://localhost:5173`

## Usage

1. Select a start and end date for the period you want to analyze
2. Choose a specific day from the dropdown to see detailed spending
3. View the bar chart breakdown of spending by category

## Available Scripts

| Command            | Description                              |
| ------------------ | ---------------------------------------- |
| `npm run dev`      | Start development server (test mode)     |
| `npm run dev:test` | Start development server in test mode    |
| `npm run dev:prod` | Start development server in personal mode |
| `npm run build`    | Build for production                     |
| `npm run preview`  | Preview production build                 |
| `npm run lint`     | Run ESLint                               |

## Project Structure

```
src/
├── main.jsx          # App entry point
├── App.jsx           # Main component with UI logic
└── modules/
    └── ynab/
        ├── index.js      # Data processing logic
        ├── ynabApi.js    # YNAB API functions
        └── index.test.js # Unit tests
```

## Testing

Run unit tests with:

```bash
node --test src/modules/ynab/index.test.js
```

## License

MIT
