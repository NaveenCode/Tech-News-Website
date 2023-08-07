import React, {createContext, useContext, useReducer,useEffect } from 'react';
import reducer from './components/reducer';

const API='https://hn.algolia.com/api/v1/search?'
 
const initialState={
    isloading: true,
    query:" ",
    nbPages: 0,
    page: 0,
    hits:[],
}

// Creating context
const AppContext = createContext();

// Creating provider
const AppProvider = ({ children }) => {
    const [state,dispatch]=useReducer(reducer,initialState)
    const fetchApi=async(url)=>{
        dispatch({type:"GET_LOADING"})
        try{
          const res=await fetch(url);
          const data=await res.json();
          console.log(data)
          dispatch({
            type:"GET_STORIES",
            payload:{
                hits:data.hits,
                nbPages:data.nbPages,
            },
          })
          
        }
        catch(error){
          console.log(error)
        }
      }

// To search post
    const searchPost=(searchQuery)=>{
        dispatch({
        type:"searchQuery",
        payload:searchQuery
        })
    }      
    useEffect(()=>{
        fetchApi(`${API}query=${state.query}&page=${state.page}` )
        },[state.query,state.page])

 //To remove the id 
    const removePost=(post_id)=>{ 
         dispatch({
            type:"remove_post",
            payload:post_id
         })
    } 
//Pagination
   const getNextPage=()=>{
    dispatch({
      type:"NEXT_PAGE"
    })
   }  
   const getPrevPage=()=>{
    dispatch({
      type:"PREV_PAGE"
    })
   }  
  return <AppContext.Provider value={{...state,removePost,searchPost,getNextPage,getPrevPage}}>{children}</AppContext.Provider>;
};
const useGlobalContext=()=>{
    return(useContext(AppContext));
}
export { AppContext, AppProvider,useGlobalContext };
