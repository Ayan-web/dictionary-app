<script>
    import * as typo from 'typo-js'
    import {onMount} from 'svelte'
    import {searchHistory } from '$lib/stores'
    import MeaningLayout from '$lib/MeaningLayout.svelte'
    let autoCompleteData=[]
    let autoCompleteList=[]
    let searchText='';
    let activeElement= -1;
    let autoCompleteElement
    let dictionary;
    let isCorrect=false;
    let dictdata;
    onMount(async ()=>{
        const adata = await fetch('static/en_US/en_US.aff')
        const affdata = await adata.text()
        const ddata = await fetch('static/en_US/en_US.dic')
        const dicdata = await ddata.text()
        dictionary = new typo("en_US",affdata,dicdata)
        // if($searchHistory.length>0){
        //     searchText=$searchHistory[$searchHistory.length-1]
        //     handleSearch()
        // }
        
    })
    function spellCheck(word){
        // console.log(searchText)
        return Promise.resolve().then(()=>{
            return dictionary.check(word)
        })
    }
    function getAutoCompleteDate(data, word){
        return Promise.resolve().then(()=>{
            // console.log(data[5].word)
            if (data.length<=0) return []
            // console.log(data)
            let returnList=[]
            for(let i = 0;i<data.length;i++){
                if ((data[i].word.substr(0, word.length).toUpperCase() == word.toUpperCase())&& returnList.length<6) {
                   returnList =[...returnList, data[i].word] 
                }
            }
            return returnList;
        })
    }
    function organiseData( previousdata, data){
        return Promise.resolve().then(()=>{
        if (data.length<=0) return previousdata
         return [...previousdata,...data]
        })
    }
    
    async function autoComplete(e){
            if(searchText.length<1) {
                autoCompleteList=[]
                activeElement=-1;
                return
            }
            // console.log(searchText)
            isCorrect = await spellCheck(searchText)
            // console.log(isCorrect)
            autoCompleteList = await getAutoCompleteDate(autoCompleteData, searchText)  
            // console.log(autoCompleteList)
            if (autoCompleteList.length<=0){
                // console.log('get called')
                const fetchData = await fetch(`https://api.datamuse.com/words?sp=${searchText}*`)
                const textData = await fetchData.text();
                const jsonData = await JSON.parse(textData)
                // autoCompleteData = [...autoCompleteData,jsonData]
                autoCompleteData = await organiseData(autoCompleteData, jsonData)
                autoCompleteList = await getAutoCompleteDate(autoCompleteData,searchText)
                // console.log(autoCompleteData)
            }
            // console.log(autoCompleteData.length)
    }
    function getDictData(word){
        return Promise.resolve().then(async ()=>{
            try {
                const fetchData= await fetch(`/api/dictionary/${word}`)
                const textData = await fetchData.text()
                const jsonData = await JSON.parse(textData)
                return jsonData
            } catch (error) {
               console.log("not found ") 
            }
        })
    }
    async function handleSearch(e){
        autoCompleteList=[]
        isCorrect = await spellCheck(searchText)        
        if (searchText.length<=0) return
        searchText = searchText.trim();
        if(!isCorrect){
            console.log('not a word')
            return
        }
        if (searchText.toUpperCase() === $searchHistory[$searchHistory.length -1]?.toUpperCase()){
            return
        }
        if([...searchText.matchAll(/[^a-zA-Z]/g)].length>0){
            console.log('only write words ')
            return
        }
        console.log(searchText)
        dictdata = await getDictData(searchText)
        console.log(dictdata)
        autoCompleteList=[]
        $searchHistory = [...$searchHistory,searchText]
        // console.log($searchHistory)
    }
    function setActive(){
        if(!autoCompleteElement) return
        if (activeElement >= autoCompleteElement.childNodes.length) activeElement = 0;
        if (activeElement < 0) activeElement = (autoCompleteElement.childNodes.length - 1);
        for(let i=0;i<autoCompleteElement.childNodes.length;i++){
            autoCompleteElement.childNodes[i].classList.remove("itemFocus")
        }
        autoCompleteElement.childNodes[activeElement].classList.add("itemFocus")
    }
    function keyDownHandler(e){ // this is a great place
        if(e.keyCode===40){
            // console.log('down')
            activeElement++;
            setActive()
        }
        else if(e.keyCode===38){
            // console.log('up')
            activeElement--
            setActive()
        }
        else if (e.keyCode===13){
            // console.log(activeElement)
            if (activeElement<0) {
                handleSearch(e) 
                return
            }
            if (!autoCompleteElement) return
            autoCompleteElement.childNodes[activeElement].click()
        }
    }
    async function elementClick(e){
        searchText = autoCompleteElement.childNodes[activeElement].innerText
        autoCompleteList=[]
        activeElement=-1
        handleSearch(e)
    }
    function handleClear(e){
        searchText=""
        autoCompleteList=[]
    }
</script>

    <div class="mainnav">
        <div class="inputdiv">
            <input class="transparent {isCorrect?'':'wrong'} "  type="text" bind:value={searchText} on:input={autoComplete} on:keydown={keyDownHandler}>
            {#if $searchHistory.length>0}
            <button class="transparent" on:click={handleClear}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
                </svg>
            </button>
            {/if}
            <button class="transparent" on:click={handleSearch}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
            </button>
        </div>
        
    </div>
    {#if autoCompleteList.length>0}
    <div class="autoCompleteElement"  bind:this={autoCompleteElement}>
        {#each autoCompleteList as data}
        <div class="autoCompleteItems" on:click={elementClick}>
            <span>
                <b>{data.substr(0, searchText.length)}</b>{data.substr(searchText.length)}
            </span>
        </div> 
        {/each}
    </div>
    {/if}
    <div class="container">
        {#if dictdata}
            {#each dictdata as data}
                <div class="meaning"> 
                    <MeaningLayout dataProps={data}/>
                </div>
                {/each}
        {/if}
    </div>
<style>
    .container{
        /* border: rgb(0, 0, 0) 4px solid; */
        width: 670px;
    } 
    :global(.itemFocus){
        background-color:cornsilk;
    }
    /* .meaning{ */
        /* position: static; */
        /* position: absolute; */
        /* position: fixed; */
        /* z-index: -1; */
        /* border: black 1px solid; */
    /* } */
    .wrong{
        text-decoration: 1px wavy underline;
    }
    .autoCompleteItems{
    border-top: 1px solid #e8eaed;
    margin: 0 14px;
    padding-bottom: 4px;
    font-size: 20px;
    /* border: black 1px solid; */
    }
    .autoCompleteElement{
        position:sticky;
        top:70px;
        /* z-index: -1; */
        height: min-content;
        width: 670px;
        /* bottom: 217px; */
        /* position: absolute; */
        bottom:80px;
        background: #fff;
        box-shadow: 0 9px 8px -3px rgb(64 60 67 / 24%), 8px 0 8px -7px rgb(64 60 67 / 24%), -8px 0 8px -7px rgb(64 60 67 / 24%);
        display: flex;
        flex-direction: column;
        list-style-type: none;
        margin: 0;
        padding: 0;
        border: 0;
        border-radius: 0 0 24px 24px;
        padding-bottom: 4px;
        overflow: hidden;
    }
    .mainnav{
        /* position: fixed; */
        position: sticky;
        top: 20px;
    display: grid;
    place-items: center;
    background: #fff;
    /* display: flex; */
    border: 1px solid transparent;
    box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
    height: 39px;
    width: 690px;
    border-radius: 24px;
    z-index: 3;
    height: 44px;
    margin: 0 auto;
    }
   .inputdiv{

       display: flex;
       width:inherit;
   } 
   button{
       flex: 1 1 7%;
   }
   .transparent{
       border:none;
       background-color: transparent;
       outline:none;
   }
   input{
    flex: 1 1 90%;
    padding-left: 20px;
    font-size: 20px;
   }
</style>