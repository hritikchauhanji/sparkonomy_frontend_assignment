# Sparkonomy Frontend Project 🚀

A modern **Frontend Dashboard Assignment** built with **React, Vite, and Tailwind CSS**.  
This project demonstrates my skills in building **scalable UI architecture**, reusable components, and optimized frontend workflows.

---

## ✨ Features

✅ **Dashboard Stats** – Total Earnings, Payments Awaited, Payments Overdue
✅ **Filter Options** – 1 Month, 3 Months, 1 Year, Custom Calendar
✅ **Gradient UI** – Modern buttons, icons, and text effects
✅ **Charts** – Responsive line/bar chart with filter-based updates
✅ **Invoice Management** – Create, view, and update invoice statuses
✅ **Redux Persistence** – State is cached in localStorage (no reset on refresh)
✅ **Toast Notifications** – Confirmation alerts for invoice creation and status updates
✅ **API Integration Ready** – Easy to connect with backend services

---

## 🛠️ Tech Stack

⚛️ **React 18 + Vite** → Fast and modern frontend setup

🎨 **Tailwind CSS** → Utility-first styling

📊 **Recharts** → Interactive charts

📦 **Redux Toolkit** → State management with persistence

🧩 **TypeScript** → Type-safe state & API responses

🔔 **React Hot Toast** → Toast notifications for user feedback

🖼️ **Lucide React** → Modern SVG icons

---

## 🗂️ Project Structure

```
Sparkonomy-Frontend-Assignment/
│── public/ # Static assets (images, icons, crown, etc.)
│── src/
│ ├── components/ # Reusable UI components (Filters, Stats, Chart, etc.)
│ ├── pages/ # Page-level components (Dashboard.tsx)
│ ├── services/ # API calls (dashboardApi.ts)
│ ├── store/ # Redux Toolkit (dashboardSlice.ts, store.ts, hooks.ts)
│ ├── types/ # TypeScript type definitions (dashboard.ts)
│ ├── App.tsx # Main App component with routes
│ ├── main.tsx # React entry point
│ └── index.css # Tailwind & custom styles
│
│── tailwind.config.js # Tailwind config
│── package.json # Dependencies & scripts
│── README.md # Project documentation
```

## ⚙️ Installation

Clone the repository and install dependencies:

```bash
git clone <https://github.com/hritikchauhanji/sparkonomy_frontend_assignment/>
cd sparkonomy_frontend_assignment
npm install
```

## 🚀 Usage

**Dashboard**

-- View total earnings, payments awaited, and overdue amounts.

-- Filter data by 1 Month, 3 Months, 1 Year, or custom date range.

-- Interactive charts update automatically based on filters.

**Invoice Management**

-- Click “Create New Invoice” card to open the popup form.

-- Fill in Client Name, Amount, and Due Date, then click Create Invoice.

-- Newly created invoices appear in the invoice list with a toast notification.

-- Update invoice statuses (Paid, Unpaid, Draft, Overdue, Awaited, Disputed) directly in the list.

**Toast Notifications**

-- Displays success messages when creating invoices.

-- Shows alerts when updating invoice statuses.
