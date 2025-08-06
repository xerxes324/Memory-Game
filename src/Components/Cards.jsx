import { useEffect, useState } from "react";

function DisplayCards(props){
    console.log("final array is",props.pokemonURL);

    return(
        <>
            {props.pokemonURL.map((url,index) => 
                <div className= "cardContainer" key={index} > 
                    <img className = "pokemonImageStyle" src = {url}></img>
                </div>
            )}
        </>
    )
}


function GeneratePokemon(props){
    
    // console.log(props.URLArray, "is the array");
    const [pokemon, setPokemon] = useState([]);

    useEffect( ()=>{

        if ( props.URLArray.length !== 0){

            const wrapperFn = async () => {

                const fetchAllPokemon = async () =>{
                    const imagesArray = await Promise.all(
                        props.URLArray.map(url => fetch(url).then(res => res.json()).then(data=> data.sprites.front_default))
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

