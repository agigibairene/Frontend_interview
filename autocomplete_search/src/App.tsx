import './App.css'
import { useState, useEffect } from 'react';

interface Recipes{
  id: number
  name: string
  image: string
  ingredients: []
}

export default function App() {
  const [enteredVal, setEnteredVal] = useState<string>('');
  const [fetchedData, setFetchedData] = useState<Recipes[]>();
  const [showResults, setShowResults] = useState<boolean>(false)


  const fetchData = async () =>{
    try{
      const response =  await fetch(`https://dummyjson.com/recipes/search?q=${enteredVal}`);
      const data = await response.json();
      setFetchedData(data?.recipes)
      // console.log(data)
    }
    catch(e){
      console.log(e)
    }
    
  }

  useEffect(()=>{
    if (enteredVal.trim().length < 2) return;
    
    const timeout = setTimeout(()=>{fetchData()}, 500);

    return ()=>clearTimeout(timeout);
  }, [enteredVal])
  
  console.log(fetchedData)

  return (
    <>
      <h1>Autocomplete Search bar</h1>
      <div>
        {/* <button>Search</button> */}
        <input 
          value={enteredVal}
          onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setEnteredVal(e.target.value)}
          onFocus={()=>setShowResults(true)}
          onBlur={()=>setShowResults(false)}
        />

       {
        showResults && (
          <div className="dishes">
          {fetchedData?.map((item: Recipes)=><p key={item.id}>
            {item.name}</p>
        )}
        </div>
        )
       }
      </div>
    </>
  )
}

