import { HomeIcon, FileText, Users, History, LogOut } from "lucide-react";
import Index from "./pages/Index.jsx";
import ReceiptPage from "./pages/ReceiptPage.jsx";
import Customers from "./pages/Customers.jsx";
import Documents from "./pages/Documents.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Bills",
    to: "/app",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Receipts",
    to: "/receipt",
    icon: <FileText className="h-4 w-4" />,
    page: <ReceiptPage />,
  },
  {
    title: "Customers",
    to: "/customers",
    icon: <Users className="h-4 w-4" />,
    page: <Customers />,
  },
  {
    title: "Documents",
    to: "/documents",
    icon: <History className="h-4 w-4" />,
    page: <Documents />,
  },
];
