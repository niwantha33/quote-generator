// get header class

// global quote store 

let text_quote = {
    quote: '',
    author: ''
};

let cnt = 1;

const btn = document.querySelector(".new-quote");

async function set_local_storage(obj){
    // convert object to Json 
    const new_quote = JSON.stringify(obj);
    localStorage.setItem('quote',new_quote);
    // console.log(new_quote)
}

async function get_local_storage(){
    // get json key- locally stored   
   
    let get_quote = localStorage.getItem('quote');

    if(get_quote === null){
        await quote_update_display()
    }
    else{
        // console.log("json: ",JSON.parse(get_quote))
        await quote_display(JSON.parse(get_quote))
    }
    
}

async function quote_display(obj) {  

    const text_area = document.querySelector(".text-area");
    text_area.childNodes[1].textContent = `\"${obj.quote}\"`;

    const person = document.querySelector(".person");
    person.textContent = obj.author;

}

async function quote_update_display() {  
    // call external API 
    try{
        await fetch('https://api.breakingbadquotes.xyz/v1/quotes')
        .then(response => response.json())
        .then(data => {
            text_quote.quote = data[0].quote;
            text_quote.author = data[0].author;

        });
    
    await quote_display(text_quote).then(set_local_storage(text_quote));


    }catch(error)
    {
        console.log(error)
    }
    
}

// this will auto run every 2000 sec and after 5 cnt, new quote will display
setInterval(async function () {
    // debugger;
    
    // console.log()
    btn.classList.remove("animation_cnt")

    btn.textContent = `${cnt} Next Quote`;   

    if (cnt === 5) {
        cnt = 0;  
        btn.classList.add("animation_cnt")  
        // debugger;   
       
        await quote_update_display();
       
    };
    cnt++;
}, 2000);

btn.addEventListener('click', function (e) {
    e.preventDefault()
    e.stopPropagation();
    quote_update_display();
    cnt = 1;
    btn.textContent = `${cnt} Next Quote`;
}, true);

get_local_storage()
