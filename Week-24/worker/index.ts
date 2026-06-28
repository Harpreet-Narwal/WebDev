import { createClient } from "redis";


const client = createClient();

client.connect()
    .then(async () =>{
        while(1){
            
            const response = await client.rPop("problems")
            
            if(!response){
                await new Promise((r) => setTimeout(r, 1000));
                continue;
            }

            const parsedResponse = JSON.parse(response);
            const code = parsedResponse.code;
            const language = parsedResponse.language;
            console.log("Processing questions for user " + parsedResponse.userId);
            if(language == "C++"){
                console.log("Running users C++ code")
                await new Promise((r) => setTimeout(r, 1000 * 10));
                //sandboxing
            }

            if(language == 'js'){
                console.log("Running users js code");
                await new Promise((r) => setTimeout(r, 1000 * 2));
            }

            // Update the status in the DB
        }

    });

// SANDBOX, E2B