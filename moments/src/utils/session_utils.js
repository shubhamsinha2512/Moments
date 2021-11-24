import {BASE_URL, API} from './API'

export const setSession = (token) => {
    localStorage.setItem("MOMENT_TOKEN", token)
}

export const getSession = (token) => {
    return localStorage.getItem("MOMENT_TOKEN")
}

export const validateSession = async () => {

    let validity = false;

    let token = localStorage.getItem("MOMENT_TOKEN")

    if(token){
        // console.log(token)
        await fetch(BASE_URL+API.VALIDATE_SESSION, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({token: token})
        })
        .then(res =>  res.json())
        .then(res => {
            console.log(res)
            if(res.status == 0) validity = true;
        })
        .catch(err =>  console.log(err))
    }
    console.log("token validity", validity)
    return validity;
}


