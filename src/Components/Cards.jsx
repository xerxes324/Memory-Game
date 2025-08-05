import { useEffect, useState } from "react";

function DisplayCards(props){
    console.log(props.pokemonURL);
}


function GeneratePokemon(props){
    
    // console.log(props.URLArray, "is the array");
    const [pokemon, setPokemon] = useState([]);

    useEffect( ()=>{

        if ( props.URLArray.length !== 0){
            const pokemonArray = [];

            const fetchFn = async(pokemon) => {
                const req = await fetch(pokemon);
                const data = await req.json();
                // console.log("the data is,", data.sprites.front_default);
                pokemonArray.push(data.sprites.front_default);
            }
    
            for ( let i = 0 ; i < 10 ; i++){
                fetchFn(props.URLArray[i]);
            }

            setPokemon(pokemonArray);
            // console.log("the array is : ", pokemonArray);
        }
    },[props.URLArray])

    return(
        <>
            <DisplayCards pokemonURL = {pokemon}/>
        </>
    )
}

export default function Cards(props){
    // console.log(props.URLArray,"is the CARDS array");

    return(

        <>
            <div className="cards">
                <GeneratePokemon URLArray = {props.URLArray}/>
            </div>
        </>
    )
}

