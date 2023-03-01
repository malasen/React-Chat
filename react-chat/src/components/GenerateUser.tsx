import { useState, useEffect } from "react";
import { API } from "../constants/api.js";

function User() {
    const [names, setNames] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    useEffect(function () {
        async function fetchData() {
            try {
                const response = await fetch(API);
                const json = await response.json();
                
                setNames(json.variables[0].values);
            } catch (error:any) {
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        <div>{error}</div>;
    }
    const randomName: string = names[Math.floor(Math.random() * names.length)];

    return (
        <>
            <div>{randomName}</div>
        </>
    );
}

export default User;
