export default async function(method,route,body = null){
    const options={
        method:method,
        headers:{
            Accept:'application/json',
        }
    }
    if(body){
        options.headers['Content-Type']='application/json'
        options.body = JSON.stringify(body)
    }
    const response = await fetch(`https://project/apicosmos${route}`,options)
    return await response.json()
}