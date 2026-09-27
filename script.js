function openSection(id){

    letheadtions = document.querySelectorAll(".form-box");


    sections.forEach(section=>{

        section.style.display="none";

    });


    document.getElementById(id).style.display="block";


    window.scrollTo({

        top:document.getElementById(id).offsetTop - 20,
        behavior:"smooth"

    });

}



/* =========================================================
   SUBMITTER NAME LIST
   ========================================================= */

const submitterNames = [

    "AHMED ALAA",
    "ALI",
    "MD DELOWAR",
    "Mohamed Abdelmagid",
    "AMZAD HOSSAIN",
    "Redwan hossain",
    "Liton hossain",
    "MD ALAUDDIN",
    "MD DULAL",
    "SHERAZ MOHAMMAD",
    "MALIK ABDUL WAHAB",
    "SHAKIB HOSSAIM",
    "ASHIK MIA",
    "JAHIDUL ISLAM",
    "RUBAYET HOSSIAN",
    "MOSTAK AHMED",
    "JUWEL RANA",
    "AMRAN HOSSIN",
    "SURUJ ISLAM",
    "SOYAN JAHANGIR MOLLA",
    "SAKIB 2",
    "NURUL ISLAM",
    "TANBIR HOSSAIN",
    "Saiful islam",
    "Ebrahim hossain",
    "Rahat Prodhan",
    "Rakibul islam",
    "RAJUN AHMED",
    "FAIZAN RAZA ANSAR",
    "ASHRAFUL ISLAM"

];



/* =========================================================
   SEARCH SUBMITTER
   ========================================================= */

function searchSubmitter(){

    const input =
        document.getElementById("ssSubmitter");

    const results =
        document.getElementById("submitterResults");


    const searchText =
        input.value.trim().toLowerCase();


    results.innerHTML = "";


    let matches;


    if(searchText === ""){

        matches = submitterNames;

    }else{

        matches = submitterNames.filter(name =>
            name.toLowerCase().includes(searchText)
        );

    }


    if(matches.length === 0){

        results.style.display = "none";
        return;

    }


    matches.forEach(name => {

        const item =
            document.createElement("div");

        item.className = "submitter-result";

        item.textContent = name;


        item.onclick = function(){

            input.value = name;

            results.innerHTML = "";

            results.style.display = "none";

        };


        results.appendChild(item);

    });


    results.style.display = "block";

}



/* =========================================================
   CLOSE SUBMITTER SEARCH WHEN CLICKING OUTSIDE
   ========================================================= */

document.addEventListener("click", function(event){

    const box =
        document.querySelector(".submitter-search-box");

    const results =
        document.getElementById("submitterResults");


    if(box && !box.contains(event.target)){

        results.style.display = "none";

    }

});



/* =========================================================
   SHORT AND EXTRA SUBMIT
   ========================================================= */

function submitShortStock(){

    let item =
        document.getElementById("ssItem").value;

    let shelf =
        document.getElementById("ssShelf").value;

    let qty =
        document.getElementById("ssQty").value;

    let submitter =
        document.getElementById("ssSubmitter").value.trim();

    let btn =
        document.getElementById("ssBtn");



    if(!item || !shelf || !qty || !submitter){

        alert("Please fill all fields");
        return;

    }



    /* Check that selected name exists in the list */

    const validSubmitter =
        submitterNames.some(
            name => name.toLowerCase() === submitter.toLowerCase()
        );


    if(!validSubmitter){

        alert("Please select a valid Submitter name");
        return;

    }



    btn.innerText = "Submitting...";
    btn.disabled = true;



    let formURL =
        "https://docs.google.com/forms/d/e/1FAIpQLSeZHsCODK7rsTB8mYlvYertYe2tQPkVEbmN2_GlHhYjt_kD9Q/formResponse";



    let data = new FormData();


    data.append(
        "entry.1799151119",
        item
    );


    data.append(
        "entry.238910530",
        shelf
    );


    data.append(
        "entry.1546724091",
        qty
    );


    data.append(
        "entry.1886054839",
        submitter
    );



    fetch(formURL, {

        method:"POST",

        mode:"no-cors",

        body:data

    })

    .then(()=>{

        alert(
            "Short and Extra Submitted Successfully ✅"
        );


        document.getElementById("ssItem").value="";

        document.getElementById("ssShelf").value="";

        document.getElementById("ssQty").value="";

        document.getElementById("ssSubmitter").value="";


        btn.innerText="Submit";

        btn.disabled=false;

    })

    .catch(()=>{

        alert("Submission Failed ❌");

        btn.innerText="Submit";

        btn.disabled=false;

    });

}



/* =========================================================
   EXPIRY SUBMIT
   ========================================================= */

function submitExpiry(){

    let item =
        document.getElementById("exItem").value;

    let shelf =
        document.getElementById("exShelf").value;

    let date =
        document.getElementById("exDate").value;

    let btn =
        document.getElementById("exBtn");



    if(!item || !shelf || !date){

        alert("Please fill all fields");

        return;

    }



    btn.innerText = "Submitting...";

    btn.disabled = true;



    let formURL =
        "https://docs.google.com/forms/d/e/1FAIpQLSf3hbklM1VB6Q-mcMBt1SEW-X0CHnuc8zE80sukcuYM-xa-EQ/formResponse";



    let data = new FormData();


    data.append(
        "entry.1125785521",
        item
    );


    data.append(
        "entry.886232807",
        shelf
    );


    data.append(
        "entry.1897260948",
        date
    );



    fetch(formURL, {

        method:"POST",

        mode:"no-cors",

        body:data

    })

    .then(()=>{

        alert(
            "Expiry Submitted Successfully ✅"
        );


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
