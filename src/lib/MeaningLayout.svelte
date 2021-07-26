<script>
    import  * as lottie from 'lottie-web'
    import {onMount} from 'svelte'
    import { audioPlayerAnimationData } from '$lib/AnimationLottieFiles'
    export let dataProps ;
    let audioPlayer;
    let player;
    let audioAnimationPlayer;
    onMount(async()=>{
        audioAnimationPlayer = lottie.loadAnimation({
            container: audioPlayer, // the dom element
            renderer: 'svg',
            loop: true,
            autoplay:false ,
            animationData: audioPlayerAnimationData,
        });
    })
    function handleClick(e){
        player.play()
        audioAnimationPlayer.play()
    }
</script>
<div class="main">
   <div class="header">
       <div class="header-main">
            <div class="word-phonics">
                <div class="word-audio">
                    <div class="audio" on:click={handleClick}  bind:this={audioPlayer}>
                        <audio src={dataProps.phonetics[0].audio} bind:this={player} on:ended={audioAnimationPlayer.stop()}>
                            <track kind="captions" />
                        </audio>
                    </div>
                    <span class="word" >{dataProps.word}</span>
                </div>
                <span class="phonics">{dataProps.phonetics[0].text}</span>
            </div>
       </div>
   </div> 
    <div class="meanings-partsOfSpeech">
        {#each dataProps.meanings as meanings }
            <div>
                <span class="partsOfSpeech">{meanings.partOfSpeech}</span>
            </div>        
            {#each meanings.definitions as definitions}
               <p style="font-style: italic;font-weight: bold;">{definitions.definition}</p> 
               {#if definitions?.example}
                    <p>{definitions?.example}</p> 
               {/if}
               {#if definitions?.synonyms}
               <div class="synonyms">
                   <span>synonyms:</span>
                   {#each definitions.synonyms as synonyms }
                        <span>{synonyms}</span>
                   {/each} 
                </div>
               {/if}
            {/each}
        {/each}
    </div>

</div>
<style>
    .word-audio{
        display: flex;
    }
    .synonyms{
        padding: 7px 7px 7px 7px;
        display: grid;
        grid-template-columns: auto auto auto;
    }
    .partsOfSpeech{
        font-family: Arial, Helvetica, sans-serif;
        border-radius: 20px;
        background-color: rgb(132, 168, 236);
        padding: 5px 5px 5px 5px;
    }
    .phonics{
        font-style: italic;
        font-size: 20px;
    }
    .word-phonics{
        display: grid;
        place-items: center;
    }
    .header-main{
        display: flex;
    }
    .audio{
        padding: 20px 20px 7px 7px ;
        width: 30px;
        height: 30px;
    }
    .header{
        display: flex;
        flex-direction: column;

    }
    .main{
        padding: 4rem;
        right: 200px;
        /* position: relative; */

        /* border: rgb(188, 216, 28) 5px solid; */
    }
    .word{
        font-size: 50px ;
    }
</style>