import { createContext, useContext, useState } from 'react'

// Step 1: Create the Context
const UserContext = createContext(null)

export function UserProvider({ children }) {
    const [user, setUser] = useState("Muhammad Umais")

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext

