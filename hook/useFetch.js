import {useState , useEffect} from 'react'
import axios from 'axios'


const useFetch = (endpoint ,query) =>{

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    

    const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: {...query},
    headers: {
        'X-RapidAPI-Key': '9d2232aaaemshd6ae86841f04590p1c88eejsn7cac071b7ef3',
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    }
    };

    const fetchData =  async () =>{
        setIsLoading(true)


        try {
            const response = await axios.request(options)
            setData(response.data.data)
            setIsLoading(false)
        } catch (error) {
            setError(error);
            console.error(error);
            if(error.response){
                console.error('Response: ' , error.response)
            }
        } finally{
            setIsLoading(false);
        }
    }

    useEffect(() =>{
        fetchData();
    } , [])

    const refetch = () =>{
        setIsLoading(true);
        fetchData();
    }

    return {data , isLoading , error , refetch}

}

export default useFetch