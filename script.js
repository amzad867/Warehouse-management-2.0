function openSection(id){

    let sections = document.querySelectorAll(".form-box");


    sections.forEach(section=>{

        section.style.display="none";

    });


    document.getElementById(id).style.display="block";


    window.scrollTo({

        top:document.getElementById(id).offsetTop - 20,
        behavior:"smooth"

    });


}

function submitShortStock(){

    let item = document.getElementById("ssItem").value;
    let shelf = document.getElementById("ssShelf").value;
    let qty = document.getElementById("ssQty").value;

    let btn = document.getElementById("ssBtn");


    if(!item || !shelf || !qty){

        alert("Please fill all fields");
        return;

    }


    btn.innerText = "Submitting...";
    btn.disabled = true;



    let formURL =
    "https://docs.google.com/forms/d/e/1FAIpQLSeZHsCODK7rsTB8mYlvYertYe2tQPkVEbmN2_GlHhYjt_kD9Q/formResponse";


    let data = new FormData();

    data.append("entry.907493488", item);
    data.append("entry.297184791", shelf);
    data.append("entry.444154312", qty);



    fetch(formURL,{

        method:"POST",
        mode:"no-cors",
        body:data

    })
    .then(()=>{

        alert("Short Stock Submitted Successfully ✅");


        document.getElementById("ssItem").value="";
        document.getElementById("ssShelf").value="";
        document.getElementById("ssQty").value="";


        btn.innerText="Submit";
        btn.disabled=false;


    })
    .catch(()=>{

        alert("Submission Failed ❌");

        btn.innerText="Submit";
        btn.disabled=false;

    });


}

function submitExpiry(){

    let item = document.getElementById("exItem").value;
    let shelf = document.getElementById("exShelf").value;
    let date = document.getElementById("exDate").value;

    let btn = document.getElementById("exBtn");


    if(!item || !shelf || !date){

        alert("Please fill all fields");
        return;

    }


    btn.innerText = "Submitting...";
    btn.disabled = true;



    let formURL =
    "https://docs.google.com/forms/d/e/1FAIpQLSf3hbklM1VB6Q-mcMBt1SEW-X0CHnuc8zE80sukcuYM-xa-EQ/formResponse";


    let data = new FormData();


    data.append("entry.1125785521", item);
    data.append("entry.886232807", shelf);
    data.append("entry.1897260948", date);



    fetch(formURL,{

        method:"POST",
        mode:"no-cors",
        body:data

    })

    .then(()=>{


        alert("Expiry Submitted Successfully ✅");


        document.getElementById("exItem").value="";
        document.getElementById("exShelf").value="";
        document.getElementById("exDate").value="";


        btn.innerText="Submit";
        btn.disabled=false;


    })

    .catch(()=>{


        alert("Submission Failed ❌");


        btn.innerText="Submit";
        btn.disabled=false;


    });


}