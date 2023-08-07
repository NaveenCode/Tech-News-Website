const reducer=(state,action) =>{
    switch(action.type){
        case "GET_LOADING":
          return {
            ...state,
            isloading:true}
        case "GET_STORIES":
            return{
                ...state,
                isloading:false,
                hits:action.payload.hits,
                nbPages:action.payload.nbPages,
            }
        case "remove_post":
            return{
                ...state,
                hits:state.hits.filter((curelem)=>
                    curelem.objectID!== action.payload),
            } 
        case "searchQuery":
            return{
                ...state,
                query:action.payload,
            }  
        case "NEXT_PAGE":
            let pageNumInc=state.page+1
            if(pageNumInc>=state.nbPages){
                pageNumInc=0;
            }
            return{
                ...state,
                page:pageNumInc
            }      
        case "PREV_PAGE":
            let pageNum=state.page-1
            if(pageNum<=0){
                pageNum=state.nbPages-1
            }
            return{
                ...state,
                page:pageNum,
            }  
        default:
            return{
                state
            }
    }
  
  
}

export default reducer;
