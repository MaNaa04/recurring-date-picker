# 📅 Recurring Date Picker Component

A modern, reusable React component for selecting complex recurring schedules, inspired by calendar applications like Google Calendar and TickTick.

![Project Screenshot](/recurring-date-picker/screenshot.png)

---

## ✨ Features

* **Flexible Recurrence Rules:** Supports Daily, Weekly, Monthly, and Yearly options.
* **Custom Intervals:** Set schedules to repeat every 'X' days, weeks, months, or years.
* **Advanced Weekly Selection:** Choose specific days of the week for weekly recurrences.
* **Complex Monthly Patterns:** Supports both "On day X of the month" and "On the Nth weekday of the month" (e.g., the second Tuesday).
* **Date Range Selection:** Set a required start date and an optional end date to constrain the pattern.
* **Live Calendar Preview:** An interactive mini-calendar that instantly visualizes the selected recurring dates.
* **Themed UI:** A clean, professional UI inspired by modern SaaS dashboards.

---

## 🚀 Tech Stack

* **Framework**: Next.js (React)
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **State Management**: Zustand
* **Date Logic**: `date-fns`
* **Testing**: Jest & React Testing Library
* **Deployment**: Vercel

---

## 🛠️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have Node.js and npm installed on your machine.

### Installation & Setup

1.  Clone the repository:
    ```sh
    git clone [https://github.com/your-username/recurring-date-picker.git](https://github.com/your-username/recurring-date-picker.git)
    ```
2.  Navigate to the project directory:
    ```sh
    cd recurring-date-picker
    ```
3.  Install NPM packages:
    ```sh
    npm install
    ```
4.  Run the development server:
    ```sh
    npm run dev
    ```
5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## ✅ Running Tests

This project includes unit and integration tests to ensure reliability and correctness.

To run the tests, execute the following command:

```sh
npm test