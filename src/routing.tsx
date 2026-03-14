import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import Layout from "./pages/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import BookPage from "./pages/BookPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/admin",
                element: (
                    <ProtectedRoute><AdminPage /></ProtectedRoute>
                )
            },
            {
                path: "/book/:bookId",
                element: <BookPage />
            }
        ]
    }
])

export default router;