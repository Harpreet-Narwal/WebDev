// Using `1-counter.md` or `2-counter.md` from the easy section, can you create a
// clock that shows you the current machine time?

// Can you make it so that it updates every second, and shows time in the following formats - 

//  - HH:MM::SS (Eg. 13:45:23)

//  - HH:MM::SS AM/PM (Eg 01:45:23 PM)


function currentTime(){
    // let time = new Date().toLocaleTimeString();

    // console.log(time.split(' ')[0]);

    // setTimeout(currentTime, 1000);

    let time = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    });

    console.log(time);

    setTimeout(currentTime, 1000);

}

currentTime();