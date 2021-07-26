<script>
    import { searchHistory } from '$lib/stores'
</script>
<div class="main">
    <h1> history stuffs</h1>
    <div class="flex">
        {#each $searchHistory as items }
        <div class="eachitem">
            <span>
                {items}...
            </span>
        </div> 
        {/each}
    </div>
</div>
<style>
    .main{
        display: grid;
        place-items: center;
    }
    .flex{
        display: flex;
        flex-direction: column;
        font-size: 30px;
        font-family: monospace;
        flex-grow: 20px;
    }
    .eachitem{
        margin-top: 10px;
        width: 100%;
        height: 100%;
        /* padding: 10px 5px 10px 20px; */
        padding: 5px 5px 5px 5px ;
        border-radius: 25px;
        border: 1px solid transparent;
        box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%); 
        cursor: pointer;
    } 
</style>