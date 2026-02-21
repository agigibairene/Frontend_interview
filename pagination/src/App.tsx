import { useQuery , keepPreviousData} from "@tanstack/react-query"
import { useState } from "react"

interface Product{
  id: number
  title: string
  description: string
  category: string
  thumbnail: string
}

interface Products{
  products: Product[],
  limit: number
  total: number
}

export default function App(){
  const [currentPage, setCurrentPage] = useState<number>(0);

  let productsPerPage = 30;

  
  const { data: products} = useQuery<Products>({
    queryKey: [ 'products', {currentPage}],
    queryFn: async () : Promise<Products> =>{
      const response = await fetch(`https://dummyjson.com/products?skip=${currentPage * productsPerPage}`);
      let data: Products = await response.json()
      return data;
    },
    placeholderData: keepPreviousData,
    staleTime: 1000
  });

  let total = products?.total ?? 0;
  let numberOfPages = Math.ceil(total/productsPerPage);


  return(
    <div>
      <main>
        <h1>Pagination</h1>
        <div className="products">
          {
            products?.products.map((item: Product)=>
              <div className="product" key={item.id}>
                <img src={item.thumbnail} alt="" />
                <p>{item.title}</p>
              </div>
            )
          }
        </div>
        <div className="btns">
          <button disabled={currentPage === numberOfPages - 1} onClick={()=>setCurrentPage(prev=>prev+1)}>Next</button>
          <button disabled={currentPage <=0} onClick={()=>setCurrentPage(prev=>prev-1)}>Previous</button>
        </div>
      </main>
    </div>
  )
}