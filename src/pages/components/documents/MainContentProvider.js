import React,{useState} from 'react'
import MainContent from './MainContent'

export const ContextProvider = React.createContext({})

const MainContentProvider = () => {

    const [isSecuritybtn, setIsSecurityBtn] = useState(
        []
    )

    const onChangeSecurityBtn = (val) => {
        // error
        // console.log(val.documentId);
        // let newList = isSecuritybtn
        // newList.push(val)
        // setIsSecurityBtn(newList)
    }

    return (
        <ContextProvider.Provider value={{
            securityBtn: {isSecuritybtn, onChangeSecurityBtn}
        }} >
            <MainContent />
        </ContextProvider.Provider>
    )
}

export default MainContentProvider;