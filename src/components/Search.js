import React from 'react';
import { useGlobalContext } from '../context';


const Search = () => {
  const {query,searchPost}=useGlobalContext();
  
  return (
    <> 
      
        <h1>React Tech Website</h1>
        <form onSubmit={(e)=>e.preventDefault()}>
          <div>
            <input type="text" value={query} placeholder='Search...' onChange={(e)=>searchPost(e.target.value)}/>
          </div>
        </form>
    
    </>
  )
}

export default Search
