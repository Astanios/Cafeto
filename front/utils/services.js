export const getEvents = async (jwt) => {
    try {
        let res = await fetch('http://192.168.1.8:4000/', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + jwt
            }
        });
        res = await res.json();
        return(res);
    } catch (e) {
        console.error(e);
    }
};

export const createEvent = async (jwt, data) => {
    try {
        let res = await fetch('http://192.168.1.8:4000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            },
            body: JSON.stringify(data)
        });
        res = await res.json();
        return(res);
    } catch (e) {
        console.error(e);
    }
};

export const updateEvent = async (jwt, eventId, data) => {
    try {
        let res = await fetch(`http://192.168.1.8:4000/${eventId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            },
            body: JSON.stringify(data)
        });
        res = await res.json();
        return(res);
    } catch (e) {
        console.error(e);
    }
};

export const deleteEvent = async (jwt, eventId) => {
    try {
        let res = await fetch(`http://192.168.1.8:4000/${eventId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            }
        });
        res = await res.json();
        return(res);
    } catch (e) {
        console.error(e);
    }
};

export const checkUser = async (jwt, data) => {
    try {
            let checkUser = await fetch('http://192.168.1.8:4000/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwt
                },
                body: JSON.stringify(data)
            });
        res = await res.json();
        return(res);
    } catch (e) {
        console.error(e);
    }
};