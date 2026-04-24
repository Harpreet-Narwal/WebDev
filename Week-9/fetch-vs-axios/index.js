const axios = require('axios');

// using fetch using then:
function main(){
    fetch("https://dummyjson.com/todos/random")
    .then(async response =>{
        const json = await response.json();
        console.log(json);
    })
}

async function mainUsingFetch(){
    const respose = await fetch("https://dummyjson.com/todos/random");
    const json = await respose.json();
    console.log(json);
}

//Sending Post Request:
async function postUsingFetch() {
    const response = await fetch("https://www.postb.in/1777047060218-6086580255068", {
        method: "POST",
        body: {
            username: "harpreet",
            password: "123123"
        },
        headers: {
            "Authorization" : "Bearer 123"
        }
    })
    const actualData = await response.text();
    console.log(actualData);
}



// postUsingFetch();



async function mainUsingAxios(){
    const respones = await axios.get("https://httpdump.app/dumps/57afb30b-55fa-4cc7-9252-a5b35c96824d?a=2", {
        headers: {
            "Authorization" : "Bearer 123123"
        }
    });
    console.log(respones.data);
}

async function postUsingAxios(){
    const respones = await axios.post("https://httpdump.app/dumps/57afb30b-55fa-4cc7-9252-a5b35c96824d", {
        username: "harpreet",
        password: "123123"
    }, {
        headers: {
            "Authorization" : "Bearer 123"
        }
    });
    console.log(respones.data);
}


postUsingAxios();
mainUsingAxios();
