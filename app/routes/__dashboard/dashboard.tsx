import { LoaderFunction, json } from "@remix-run/node"
import { getSessionState } from "~/utils/cookies"



export let loader: LoaderFunction = async ({ request }) => {

    try{

        const sessionState = await getSessionState(request, false, true, null, "/login");

        console.log(sessionState);
        return sessionState;



    }catch(e: any){
        
          return json({error: e.message}, {status: 500})
  
    }


}

export default function dashboard() {



  return (
    <div>dashboard</div>
  )
}
