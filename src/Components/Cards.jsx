import { useEffect, useState } from "react";
import FetchData from "./FetchData";

function DisplayCards(props){
    // console.log("final array is",props.pokemonURL);
    // console.log(props.arr,"is the array")
    // console.log(props.pokemonURL,"is the pokemon")

    return(
        <>
            {props.pokemonURL.map((url,index) => 
                
                <div className= "cardContainer" key={index} onClick={()=> props.clickfunction(props.arr)}> 
                    <img className = "pokemonImageStyle" src = {url}></img>
                </div>
            )}
        </>
    )
}


function GeneratePokemon(props){

    const [pokemon, setPokemon] = useState([]);

    const shuffle = (arr) => {
    
        console.log(arr, "is the array bro");

        let currentIndex = arr.length;
        while (currentIndex !== 0){
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
        }

        setPokemon(arr);
        
    }

    useEffect( ()=>{

        if ( props.URLArray.length !== 0){

            const wrapperFn = async () => {

                const fetchAllPokemon = async () =>{
                    const imagesArray = await Promise.all(
                        props.URLArray.map(url => fetch(url).then(res => res.json()).then(data=> data.sprites.front_default))
                    )
                    
                    shuffle(imagesArray)
                }

                await fetchAllPokemon();

            }

            wrapperFn();
        }

    },[props.URLArray])

    return(
        <>
            <DisplayCards pokemonURL = {pokemon} clickfunction = {shuffle} arr={pokemon}/>
        </>
    )
}

export default function CardsMain(props){
    // console.log(props.URLArray,"is the CARDS array");

    return(

        <>
            <div className="cards">
                <GeneratePokemon URLArray = {props.URLArray}/>
            </div>
        </>
    )
}

