import { useState } from "react";
import type { SyntheticEvent } from "react";

//Komponent tar emot en sökning och skickar den till HomePage
const SearchBar = ({ onSearch }: { onSearch: (search: string) => void }) => {
    const [search, setSearch] = useState("");

    //Hanterar när formuläret skickas
    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (search.trim() !== "") {
            //Skickar sökningen till HomePage
            onSearch(search);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={search} placeholder="Sök böcker..." onChange={(e) => setSearch(e.target.value)} />
            <button type="submit">Sök</button>
        </form>
    );
};

export default SearchBar;