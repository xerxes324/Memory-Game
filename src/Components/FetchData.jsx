import { useEffect, useState } from "react";
import CardsMain from "./Cards";

export default function FetchData(){

    const [pokemonData, setPokemonData] = useState([]);
 
    useEffect( () => {
        const pokemonURLArray = [];
        const apiFn = async () => {
            const request = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
            const data = await request.json();
            const results = data.results;

            results.forEach(element => {
                // console.log(element);
                pokemonURLArray.push(element.url);
            });

            setPokemonData(pokemonURLArray);
        }
        apiFn();
        // console.log(pokemonURLArray,"is thje arrya");
        
    }, [])
    console.log(pokemonData, "IS THE POPKEMON DATA")
    return(
        <>
            <CardsMain URLArray = {pokemonData} />
        </>
        
    )

};