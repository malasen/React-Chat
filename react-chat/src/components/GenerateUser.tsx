import { useState, useEffect } from "react";
import { API } from "../constants/api.js";
import { Button } from "react-bootstrap"

function User() {
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
    
    function formatName(name:string):any {
        const splitName: string = name.toLowerCase().substring(1).replace('z1', 'æ').replace('z2', 'ø').replace('z3', 'å');
        const capitalize: string = splitName.charAt(0).toUpperCase() + splitName.slice(1);
        return capitalize.replace("_", "");
    }
    function getName(){
        const randomFirst: string = names[Math.floor(Math.random() * names.length)];
        const firstName: string = formatName(randomFirst);
    
        let randomLast: string = names[Math.floor(Math.random() * names.length)] + "sen";
        if (randomFirst.startsWith("1")){
           randomLast = names[Math.floor(Math.random() * names.length)] + "dottir";
        }
        const lastName: string = formatName(randomLast);

        return  firstName + " " +  lastName;
    }
     userName = getName();

    function reRoll(){
        setUserName(getName());    
    }

    return (
        <>
            <p className="text-primary username">{userName}</p>
            <Button variant="secondary" onClick={reRoll}>Reroll</Button>
        </>
    );
}

export default User;
