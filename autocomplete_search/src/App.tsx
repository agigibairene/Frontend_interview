import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import './App.css'


interface Products{
  id: number;
  title: string;
  description: string;
}

interface Cache{
  [key: string]: Products[];
}



export default function App(){
  const [inputVal, setInputVal] = useState<string>('');
  const [fetchedData, setFetchedData] = useState<Products[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [ cache, setCache ] = useState<Cache>({});
  

  useEffect(()=>{
    if (inputVal.trim().length < 2) return;

    const fetchData = async () =>{
    try{
      if (cache[inputVal]){
        setFetchedData(cache[inputVal]);
        return;
      }
      const response = await fetch(`https://dummyjson.com/products/search?q=${inputVal}`);
      const data = await response.json();
      setFetchedData(data.products)
      setCache((prev)=>({
        ...prev,
        [inputVal] : data.products
    }))

    } 
    catch(e){
      console.error(e)
    }   
  }

  const timer =  setTimeout(()=>fetchData(), 400);
  return ()=>clearTimeout(timer);
   
  }, [inputVal])

  return(
    <div className='app'>
      <h2>Autocomplete Search bar</h2>
      <div className="main-search">
        <div className='input-div'>
          <Search />
          <input 
            value={inputVal} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setInputVal(e.target.value)} 
            onFocus={()=>setShowResults(true)}
            onBlur={()=>setShowResults(false)}
          />
        </div>
        {
          showResults && <div className='products'>
          {
            fetchedData.length > 0 && fetchedData?.map((product: Products)=>(
              <p key={product.id}>{product.title}</p>
            ))
          }
        </div>
        }
      </div>
    </div>
  )
}