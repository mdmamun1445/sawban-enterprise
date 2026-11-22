# SAWBAN ENTERPRISE
### Luxury Airport Meet & Greet, Protocol & Transportation Booking Platform

A modern airport service and transportation booking platform designed to deliver a premium travel experience through professional airport meet and greet, protocol assistance, and private transportation services.

## Project Overview

SAWBAN ENTERPRISE is a Laravel-powered web application featuring a premium corporate design and a customer-friendly booking experience.

The platform allows customers to explore airport services, select service plans, request bookings, and optionally choose transportation. It also includes an administrative dashboard for managing bookings, customers, payments, protocol staff, and pricing settings.

## Key Features

### Customer Website
- Premium luxury corporate website design
- Responsive website layout
- English and Bangla language options
- Airport meet and greet service presentation
- Airport protocol service information
- Service plans and pricing
- Customer booking form
- Passenger information collection
- Optional transportation selection
- Vehicle fare estimation
- BDT and USD currency options
- Contact and service information

### Transportation Services
- Private Car
- Toyota Noah
- HiAce
- Hearse transportation
- One-way and round-trip options
- Destination selection
- Distance-based fare estimation
- Configurable vehicle rates

### Admin Dashboard
- Admin authentication
- Dashboard overview
- Booking management
- Customer management
- Payment management
- Protocol staff management
- Pricing settings
- Vehicle rate management
- Currency exchange rate settings
- Service plan price management

## Technology Stack

| Technology | Purpose |
|---|---|
| Laravel 13 | Backend framework |
| PHP 8.3 | Server-side programming |
| React | Frontend interface |
| TypeScript | Type-safe frontend development |
| Inertia.js | Frontend and backend integration |
| Vite | Frontend build tooling |
| MySQL / SQLite | Database support |
| CSS | Website styling |

## Design Direction

The project follows a premium luxury corporate design system.

- Deep Navy: `#101D31`
- Champagne Gold: `#C9A45C`
- Ivory White: `#F7F4EC`
- Royal Blue: `#263A55`
- Soft Gold: `#D8C39A`

## Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/mdmamun1445/sawban-enterprise.git
```

### 2. Navigate to the Project

```bash
cd sawban-enterprise
```

### 3. Install PHP Dependencies

```bash
composer install
```

### 4. Install Frontend Dependencies

```bash
npm install
```

### 5. Configure Environment

Copy the example environment file:

```bash
copy .env.example .env
```

Generate the application key:

```bash
php artisan key:generate
```

### 6. Configure Database

Update the database configuration in your `.env` file according to your local database setup.

### 7. Run Database Migrations

```bash
php artisan migrate --seed
```

### 8. Build Frontend Assets

```bash
npm run build
```

### 9. Start the Development Server

```bash
php artisan serve
```

Open the application:

```text
http://127.0.0.1:8000
```

For frontend development, run:

```bash
npm run dev
```

## Project Structure

```text
sawban-enterprise/
│
├── app/
│   ├── Http/
│   │   └── Controllers/
│   ├── Models/
│   └── Providers/
│
├── database/
│   ├── migrations/
│   ├── seeders/
│   └── factories/
│
├── public/
│   ├── images/
│   └── videos/
│
├── resources/
│   ├── css/
│   ├── js/
│   │   ├── components/
│   │   ├── pages/
│   │   └── layouts/
│   └── views/
│
├── routes/
├── tests/
├── composer.json
├── package.json
└── README.md
```

## Security Notes

- Never upload `.env` files containing private credentials.
- Configure database credentials locally.
- Use secure authentication for administrative access.
- Keep application dependencies updated.

## Project Status

**Development Project – Portfolio Showcase**

This repository contains the source code for the SAWBAN ENTERPRISE airport service and transportation booking platform.

## Developer

**MD MAMUN**

Web Designer | SEO & Meta Marketing Specialist

GitHub: https://github.com/mdmamun1445

## Repository

https://github.com/mdmamun1445/sawban-enterprise

---

*Designed and developed with a focus on premium user experience, modern web technologies, and efficient booking management.*