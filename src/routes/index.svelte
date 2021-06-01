<div class="mainnav">
    <div class="inputdiv">
        <input class="transparent" type="text">
        <button class="transparent" >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mic-fill" viewBox="0 0 16 16">
                <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"/>
                <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
            </svg>
        </button>
        <button class="transparent" >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
        </button>
    </div>
</div>
<style>
    .mainnav{
    display: grid;
    place-items: center;
    background: #fff;
    display: flex;
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
       flex: 1 1 10%;
   }
   .transparent{
       border:none;
       background-color: transparent;
       outline:none;
   }
   input{
    flex: 1 1 80%;
    padding-left: 20px;
    font-size: 20px;
   }
</style>