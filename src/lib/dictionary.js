export const dictData=(word)=>{
    return Promise.resolve().then(async()=>{
        try {
            const fetchData= await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`)
            const textData = await fetchData.text()
            const jsonData = await JSON.parse(textData)
            return jsonData
        } catch (error) {
            return 'not found'
        }
    })
}
