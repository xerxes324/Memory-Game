import { useEffect, useState } from "react";

function DisplayCards(props){
    
    const tempArray = props.arr.map(x => x)
    console.log("currentscore is: ", props.currentscore)
    return(
        <>
            {props.pokemonURL.map((url,index) => 
                
                <div className= "cardContainer" key={index} onClick={() => {
                    props.clickfunction(tempArray);
                    props.setscore(props.currentscore + 1);
                }}> 
                    <img className = "pokemonImageStyle" src = {url}></img>
                </div>
            )}
        </>
    )
}



function GeneratePokemon(props){
    // console.log("rendering...")
    const [pokemon, setPokemon] = useState([]);

    const shuffle = (arr) => {
    
        // console.log(arr, "is the array bro");

        let currentIndex = arr.length;
        while (currentIndex !== 0){
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
        }
        // console.log(arr, "is the shuffled array bro")
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
            <DisplayCards pokemonURL = {pokemon} clickfunction = {shuffle} arr={pokemon}  setscore =  {props.setscore} currentscore = {props.currentscore} />
        </>
    )
}

export default function CardsMain(props){
    console.log("currentscore", props.currentscore);
    return(

        <>
            <div className="cards">
                <GeneratePokemon URLArray = {props.URLArray} setscore =  {props.setscore} currentscore = {props.currentscore} />
            </div>
        </>
    )
}

