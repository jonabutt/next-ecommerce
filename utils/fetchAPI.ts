const baseUrl = process.env.BASE_URL;

export const getData = async (url:string,token:string) => {
    const res = await fetch(`${baseUrl}/api/${url}`,{
        method: 'GET',
        headers: {
            'Authorization': token
        }
    });

    const resultData = await res.json();
    return resultData;
}

export const postData = async (url:string,data:any,token:string) => {
    const res = await fetch(`${baseUrl}/api/${url}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data)
    });

    const resultData = await res.json();
    return resultData;
}

export const putData = async (url:string,data:any,token:string) => {
    const res = await fetch(`${baseUrl}/api/${url}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data)
    });

    const resultData = await res.json();
    return resultData;
}

export const patchData = async (url:string,data:any,token:string) => {
    const res = await fetch(`${baseUrl}/api/${url}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data)
    });

    const resultData = await res.json();
    return resultData;
}

export const deleteData = async (url:string,token:string) => {
    const res = await fetch(`${baseUrl}/api/${url}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    const resultData = await res.json();
    return resultData;
}