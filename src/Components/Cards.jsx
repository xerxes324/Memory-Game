import { useEffect } from "react";

function GeneratePokemon(props){
    
    // console.log(props.URLArray, "is the array");
    useEffect( ()=>{

        if ( props.URLArray.length !== 0){
            // const pokemonArray = [];

            const fetchFn = async(pokemon) => {
                const req = await fetch(pokemon);
                const data = await req.json();
                console.log("the data is,", data);
                
            }
    
            for ( let i = 0 ; i < 10 ; i++){
                fetchFn(props.URLArray[i]);
            }
        }
    },[props.URLArray])
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

