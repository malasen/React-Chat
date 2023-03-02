function formatName(name:string):any {
    const splitName: string = name.toLowerCase().substring(1).replace('z1', 'æ').replace('z2', 'ø').replace('z3', 'å');
    const capitalize: string = splitName.charAt(0).toUpperCase() + splitName.slice(1);
    return capitalize.replace("_", "");
}

function getRandomName(names: string[]){
    const randomFirst: string = names[Math.floor(Math.random() * names.length)];
    const firstName: string = formatName(randomFirst);

    let randomLast: string = names[Math.floor(Math.random() * names.length)] + "sen";
    if (randomFirst.startsWith("1")){
       randomLast = names[Math.floor(Math.random() * names.length)] + "dottir";
    }
    const lastName: string = formatName(randomLast);

    return  firstName + " " +  lastName;
}

export default getRandomName