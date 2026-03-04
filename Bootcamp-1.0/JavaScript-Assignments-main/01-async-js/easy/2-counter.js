// ## Counter without setInterval

// Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

// (Hint: setTimeout)


let cnt = 0;
function changeCounter(){
    cnt++;

    console.log(cnt);
    setTimeout(changeCounter, 3000);

}

changeCounter();