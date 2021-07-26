import { dictData } from "$lib/dictionary";
export async function  get({params }){
    const { word }=params;
    const data = await dictData(word)

    if (data){
        return {
            body:data
        }
    }
}
