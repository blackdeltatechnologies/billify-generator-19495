# Billfy Generator

A product by BLACK DELTA TECHNOLOGIES

Billfy Generator is a lightweight, fast, and customizable tool for generating receipts, invoices, and bills.  
It supports offline mode, PDF export, and template customization for businesses and developers.

---

## Usage (For Users)

🧾 Generate a Bill

Create a simple bill/invoice:

billfy --create --amount 45000 --customer "John Doe"

🖨️ Print the Bill

billfy --print

📄 Export as PDF

billfy --export pdf

🎨 Customize Branding

Change logo, business name, contacts, and footer from the configuration file:

```json
{
  "business_name": "Black Delta Technologies",
  "logo": "assets/logo.png",
  "contact": "+255-XXX-XXXXXX",
  "footer_message": "Thank you for your business!"
}
```

📑 Choose a Template

Select any design template by editing:

settings/template.json

Example:

```json
{
  "template": "classic"
}
```

---

## Developer Guide

This section is intended for developers customizing, extending, or integrating Billfy Generator.

Important: The project is intended to be edited in a code IDE (for example VS Code, WebStorm, or any editor that supports JavaScript/TypeScript and project tooling). Make code changes, run builds, and manage version control from your development environment. Avoid editing compiled or deployed assets directly on hosting interfaces — always work from the repository in your IDE.

---

🔧 Installation (Developer Mode)

git clone <YOUR_GIT_URL>  
cd <YOUR_PROJECT_NAME>  
npm install  
npm run dev

This starts the development server with hot reload.

---

## How can I deploy this project?

You can deploy this project to platforms like Netlify, Vercel, or any static-site/CDN host that supports building a Vite app. Typical steps:

1. Connect your repo to the host (Netlify/Vercel).
2. Set the build command to: npm run build
3. Set the publish directory to: dist

For custom domain setup, follow your host's instructions (Netlify, Vercel, etc.) to add and verify domains.

---

## Contributing

- Make changes in a feature branch.
- Open a pull request with a clear description of the change.
- Keep commits small and focused.

---

## License

(Include your license here)
