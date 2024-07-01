// why are we doing this we are doing this to get values from the form or the login component take that value and store it globally 
// how do we do that we do that using createContext we create a datacontenxt and export it then we create a dataprivder component 
// component is actually buidl using dataContext object property Provider this provider tag takes value and passs  it down to childern 
// component but in order use these gloabally declareed state varible you need it use it as wrapper over you app component 

import { createContext, useState } from "react";

export const DataContext = createContext(null);


const DataProvider = ({children}) => {
    const [account , setAccount ] = useState({username: ''});
    return (
        <DataContext.Provider value={{
            account,
            setAccount
        }}>
        {children}
        </DataContext.Provider>
    )
}

export default DataProvider;