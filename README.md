# Ecommerce Admin Repository

This repository contains the source code for the administration panel of our Ecommerce platform. This admin panel is built using cutting-edge technologies to ensure a seamless and efficient experience for administrators.

## Table of Contents

- [Ecommerce Admin Repository](#ecommerce-admin-repository)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [APIs](#apis)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)

## Introduction

Our Ecommerce Admin panel leverages the power of Next.js, Tailwind CSS, PostgreSQL, Prisma, Zod, Shadcn UI, and pnpm to provide a robust and modern solution for managing products, orders, and categories in your online store. The use of these technologies ensures a responsive, scalable, and secure administrative experience.

## Features

- **Product Management:** Add, edit, and delete products with ease.
- **Order Management:** View and manage customer orders efficiently.
- **Category Management:** Organize products into categories for easy navigation.
- **User Authentication:** Secure login system for administrators.
- **Dashboard:** Gain insights into key metrics and performance.

## Technologies Used

- **Next.js:** A React framework for building efficient and scalable web applications.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development with a focus on flexibility and customization.
- **PostgreSQL:** A powerful, open-source relational database system.
- **Prisma:** A modern database toolkit that simplifies database access and management with type-safe queries.
- **Zod:** A TypeScript-first schema declaration and validation library for JavaScript and TypeScript.
- **Shadcn UI:** A custom UI library designed for a clean and intuitive user interface.
- **Clerk:** An authentication and user management platform.
- **Cloudinary:** Streamline media management and improve user experience by automatically delivering images and videos, enhanced and optimized for every user.
- **Zutand:** A small, fast, and scalable bearbones state management solution.
- **pnpm:** A fast, disk space-efficient package manager.

## APIs

This section outlines the APIs available for integration with the Ecommerce Admin panel. Ensure you have the necessary API keys and endpoints configured in your environment.

- **Stores API:** `/api/stores`

  - `POST` - Create new Store

- **Store API:** `/api/stores/[storeId]`

  - `PATCH` - Update store of id - `storeId`
  - `DELETE` - Delete store of id - `storeId`

- **Billboards API:** `/api/[storeId]/billboards`

  - `GET` - Get all Billboards
  - `POST` - Create new Billboard

- **Billboard API:** `/api/[storeId]/billboards/[billboardId]`

  - `GET` - Get billboard of id - `billboardId`
  - `PATCH` - Update billboard of id - `billboardId`
  - `DELETE` - Delete billboard of id - `billboardId`

- **Categories API:** `/api/[storeId]/categories`

  - `GET` - Get all Categories
  - `POST` - Create new Category

- **Category API:** `/api/[storeId]/categories/[categoryId]`

  - `GET` - Get category of id - `categoryId`
  - `PATCH` - Update category of id - `categoryId`
  - `DELETE` - Delete category of id - `categoryId`

- **Colors API:** `/api/[storeId]/colors`

  - `GET` - Get all Colors
  - `POST` - Create new Color

- **Color API:** `/api/[storeId]/colors/[colorId]`

  - `GET` - Get color of id - `colorId`
  - `PATCH` - Update color of id - `colorId`
  - `DELETE` - Delete color of id - `colorId`

- **Sizes API:** `/api/[storeId]/sizes`

  - `GET` - Get all Sizes
  - `POST` - Create new Size

- **Size API:** `/api/[storeId]/sizes/[sizeId]`

  - `GET` - Get size of id - `sizeId`
  - `PATCH` - Update size of id - `sizeId`
  - `DELETE` - Delete size of id - `sizeId`

- **Products API:** `/api/[storeId]/products`

  - `GET` - Get all Product match the search params
  - `POST` - Create new Product

- **Product API:** `/api/[storeId]/products/[productId]`

  - `GET` - Get product of id - `productId`
  - `PATCH` - Update productId of id - `productId`
  - `DELETE` - Delete productId of id - `productId`

- **Review API:** `/api/[storeId]/products/[productId]/review`

  - `POST` - Create new review for the product of id - `productId`

- **Checkout API:** `/api/[storeId]/checkout`

  - `POST` - Create new Order

- **Stripe Webhook API:** `/api/webhook`
  - `POST` - Trigger Stripe Payment

**Note:** Refer to the provided `.env.example` file for configuring API endpoints and keys.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following dependencies installed:

- Node.js
- pnpm (Package Node Manager)
- PostgreSQL
- Prisma CLI

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/vishalkrsharma/ecommerce-admin.git
   ```

2. Navigate to the project directory:

   ```bash
   cd ecommerce-admin
   ```

3. Install the dependencies:

   ```bash
   pnpm install
   ```

4. Set up environment variables:
   Create a `.env` file based on the provided `.env.example`. You can use the example file as a template for configuring your environment variables.

5. Run the application:

   ```bash
   pnpm dev
   ```

The admin panel should now be accessible at http://localhost:3000.
