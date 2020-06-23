import React from 'react'

const CafeContext = React.createContext({
    auth: null,
    events: null,
    setEvents: null,
    selected: null,
    setSelected: null,
    jwt: null,
    setJwt: null,
    user: null
});

export const CafeProvider = CafeContext.Provider
export const CafeConsumer = CafeContext.Consumer

export default CafeContext