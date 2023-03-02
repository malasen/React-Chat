import { useState, useEffect } from "react";
import { API } from "../constants/api.js";
import { Button } from "react-bootstrap"
import getRandomName from "../services/getRandomName";

function GetUser() {
    const [names, setNames] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);
    let [userName, setUserName] = useState<string>("");

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
    
    
     userName = (getRandomName(names));

    function reRoll(){
        setUserName(getRandomName(names));    
    }

    return (
        <>
            <p className="text-primary username">{userName}</p>
            <Button variant="secondary" onClick={reRoll}>Reroll</Button>
        </>
    );
}

export default GetUser;
