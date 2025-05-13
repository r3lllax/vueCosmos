export default async function(method,route,body = null){
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
        options.headers['Content-Type']='application/json'
        options.body = JSON.stringify(body)
    }
    const response = await fetch(`https://project/apicosmos${route}`,options)
    if(response.status===401){
        localStorage.removeItem('user_token')
        window.location.replace('/authorization')
    }
    try{
        return await response.json()
    }
    catch (e){
        return null
    }


}