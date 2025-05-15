export default async function(method,route,body = null,isBlob=false){
    const options={
        method:method,
        headers:{
            Accept:'application/json',
        }
    }
    if(localStorage.getItem('user_token')){
        options.headers['Authorization'] = `Bearer ${localStorage.getItem('user_token')}`
    }

    if(body){
        if (body instanceof FormData){
            options.body = body
        }
        else{
            options.headers['Content-Type']='application/json'
            options.body = JSON.stringify(body)
        }

    }

    const response = await fetch(`https://project/apicosmos${route}`,options)
    let result = null
    if(response.status===401){
        localStorage.removeItem('user_token')
        window.location.replace('/authorization')
    }
    try{
        if(isBlob){
            result = await response.blob()
        }else{
            result = await response.json()

        }
    }
    catch (e){

    }
    return result

}