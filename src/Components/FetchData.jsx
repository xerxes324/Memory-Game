import { useEffect, useState } from "react";

function RenderImages(props){
    console.log(props.URLArray);
}


export default function FetchData(){


    const [pokemonData, setPokemonData] = useState([]);
 
    useEffect( () => {
        const pokemonURLArray = [];
        const apiFn = async () => {
            const request = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
            const data = await request.json();
            const results = data.results;

            results.forEach(element => {
                pokemonURLArray.push(element.url);
            });

            setPokemonData(pokemonURLArray);
        }
        apiFn();
    }, [])

    return(
        <>
            <RenderImages URLArray = {pokemonData} />
        </>
        
    )

};