import axios from 'axios'


export const textApiEng = async () =>{
    const data = await axios.get('https://baconipsum.com/api/?type=meat-and-filler&paras=5&format=text').then(
        response => response.data
    )
    return data
}
export const textApiRus = async () =>{
    const data = await axios.get('https://fish-text.ru/get?format=html&number=5').then(
        response => response.data
    )

    console.log('data', data)
    return data.slice(3, -4)
}
