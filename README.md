Content Analytics Dashboard

A modern analytics dashboard built with React, TypeScript, and TailwindCSS, designed to simulate a SaaS-style content performance platform.

This project demonstrates clean architecture, derived state management, data visualization patterns, and product-oriented UI implementation using modern React best practices.

Overview

The application allows users to:

Filter content by date range and distribution channel

Search posts by title

Analyze performance metrics through dynamic KPI cards

Visualize trends and distributions via interactive charts

Sort tabular data client-side

Export filtered results to CSV

Handle empty states gracefully

All metrics and visualizations are derived from a structured mock dataset and respond instantly to user input.

Core Features
Analytics Overview

Dynamic KPI calculation (views, clicks, average CTR, top channel)

Compact number formatting

Derived metrics computed from filtered state

Filtering System

Date range selector (7 / 30 / 60 / 90 days)

Channel-based filtering

Title search

Reset functionality

Fully reactive state synchronization

Data Visualization

Line chart (views over time)

Bar chart (top posts by clicks)

Pie chart (channel distribution)

Responsive chart containers

Interactive Data Table

Client-side sorting (ascending / descending)

Sorting indicators

Row-level CTR computation

Live updates based on filter state

Data Export

CSV export based on filtered dataset

Includes computed CTR values

Browser-generated file download

State Handling

Derived state via custom hook (useAnalyticsFilters)

Memoized data transformations

Conditional rendering for empty states

Architecture

The project follows a feature-based structure:

src/
  app/
  features/
    analytics/
      components/
      hooks/
      types/
      utils/
Architectural Principles

Separation of business logic and presentation

Custom hooks for state encapsulation

Dedicated data transformation layer for charts

Fully typed data models

Clear responsibility boundaries across modules

Tech Stack

React

TypeScript

TailwindCSS

Recharts

Vite

Getting Started

Install dependencies:

npm install

Run development server:

npm run dev

Build for production:

npm run build
Future Improvements

Backend API integration

Pagination

URL-based filter persistence

Dark mode toggle

Authentication and role-based access control

Performance optimizations for large datasets

Purpose

This project was built to demonstrate:

Scalable component architecture

Real-time derived state management

Analytical dashboard design patterns

Practical SaaS interface implementation

It reflects how a production-ready analytics interface can be structured using modern frontend technologies.
