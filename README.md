Billfy Generator

A product by BLACK DELTA TECHNOLOGIES

Billfy Generator is a lightweight, fast, and customizable tool for generating receipts, invoices, and bills.
It supports offline mode, PDF export, and template customization for businesses and developers.


---

Usage (For Users)

🧾 Generate a Bill

Create a simple bill/invoice:

billfy --create --amount 45000 --customer "John Doe"

🖨️ Print the Bill

billfy --print

📄 Export as PDF

billfy --export pdf

🎨 Customize Branding

Change logo, business name, contacts, and footer from the configuration file:

{
  "business_name": "Black Delta Technologies",
  "logo": "assets/logo.png",
  "contact": "+255-XXX-XXXXXX",
  "footer_message": "Thank you for your business!"
}

📑 Choose a Template

Select any design template by editing:

settings/template.json

Example:

{
  "template": "classic"
}


---

Developer Guide

This section is intended only for developers customizing, extending, or integrating Billfy Generator.


---

🔧 Installation (Developer Mode)

git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
npm run dev

This starts the development server with hot reload.



## What technologies are used for this project?

This project is built with .

- Vite
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

All GPT Engineer projects can be deployed directly via the GPT Engineer app.

Simply visit your project at [GPT Engineer](https://gptengineer.app/projects/1340b42f-5412-43e0-b239-b5fdabd2feb7/improve) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.gptengineer.app/tips-tricks/custom-domain/)
