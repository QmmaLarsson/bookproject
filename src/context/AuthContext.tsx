import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import type { User, LoginCredentials, AuthResponse, AuthContextType } from "../types/auth.types";

//Skapa context
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    //Funktion för inloggning
    const login = async (credentials: LoginCredentials) => {
        try {
            //POST-anrop till externt API
            const res = await fetch("https://apiprojektdt210g.onrender.com/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials),
            })

            if (!res.ok) throw new Error("Inloggningen misslyckades");

            const data = await res.json() as AuthResponse;

            //Spara token i localStorage och uppdatera staten setUser
            localStorage.setItem("token", data.token);
            setUser(data.user);
        } catch (error) {
            throw error;
        }
    }

    //Funktion för utloggning
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    }

    //Kontrollera om token finns
    const checkToken = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            return;
        }

        try {
            //GET-anrop till externt API
            const res = await fetch("https://apiprojektdt210g.onrender.com/api/validate", {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token
                }
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            } else if (res.status === 401) {
                //Om token är ogiltig
                localStorage.removeItem("token");
                setUser(null);
            } else {
                console.error("Fel vid validering av token");
            }

        } catch (error) {
            localStorage.removeItem("token");
            setUser(null);
        }
    }

    //Hook som kör checkToken när sidan laddas in
    useEffect(() => {
        checkToken();
    }, [])

    return (
        < AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider >
    )
}

//Egen hook
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth måste användas inom en AuthProvider");
    }

    return context;
}