/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react';

interface Product{
  id: number
  title: string
  description: string
  category: string
  images: string[]
}

export default function App(){
  const [ products, setProducts ] = useState<Product[]>();

  const fetchedData = async () =>{
    try{
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();

      setProducts(data.products)
    }
    catch(e){
      console.error(e)
    }
  }

  useEffect(()=>{
    fetchedData()
  }, []);

  console.log(products)

  return(
    <div>
      <h1>Pagination</h1>

      <div className='main'>
        <div  className='products'>
          { products && products.map((item: Product)=>{
            const {id, title, images} = item;
            return(
              <div className='product' key={id}>
                <img src={images[0]} alt={title} />
                <p>{title}</p>
              </div>
            )
          })}
        </div>

        <div className='btns'>
          <button>Next</button>
          <button>Previous</button>
        </div>
      </div>
    </div>
  )
}