import { Outlet } from "react-router-dom"
import Header from "../components/Header"

const Layout = () => {
    return (
        <>
            <div className="page">
                <Header />
                <main><Outlet /></main>
                <footer>&copy; Emma Larsson</footer>
            </div>
        </>
    )
}

export default Layout
