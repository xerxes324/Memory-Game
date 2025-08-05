import { useEffect, useState } from "react";
import { FetchableDevEnvironment } from "vite";

function DisplayCards(props){
    console.log(props.pokemonURL);
}


function GeneratePokemon(props){
    
    // console.log(props.URLArray, "is the array");
    const [pokemon, setPokemon] = useState([]);

    useEffect( ()=>{

        if ( props.URLArray.length !== 0){

            const wrapperFn = async () => {

                const fetchAllPokemon = async () =>{
                    const imagesArray = await Promise.all(
                        props.URLArray.map(url => fetch(url).then(res => res.json()))
                    )
                    return imagesArray;
                }

                const imagesCall = await fetchAllPokemon();
                setPokemon(imagesCall);
            }

            wrapperFn();
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

