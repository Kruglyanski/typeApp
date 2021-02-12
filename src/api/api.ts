import axios from 'axios'


export const textApi = async () =>{
    const data = await axios.get('https://baconipsum.com/api/?type=meat-and-filler&paras=2&format=text').then(
        response => response.data
    )
    return data
}
