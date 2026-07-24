/* ==========================================
   Daily Wastage
========================================== */

function checkWastageReason() {

    const reason = document.getElementById("wsReason").value;

    const expireBox = document.getElementById("expireBox");
    const responsibleBox = document.getElementById("responsibleBox");

    // Hide everything first
    expireBox.style.display = "none";
    responsibleBox.style.display = "none";

    // Show according to reason
    if (reason === "Expire") {

        expireBox.style.display = "block";

    }

    if (reason === "Damage") {

        responsibleBox.style.display = "block";

    }

}



function submitWastage() {

    const item = document.getElementById("wsItem").value.trim();
    const qty = document.getElementById("wsQty").value.trim();
    const reason = document.getElementById("wsReason").value;
    const resource = document.getElementById("wsResource").value;
    const expire = document.getElementById("wsExpire").value;
    const responsible = document.getElementById("wsResponsible").value.trim();
    const photo = document.getElementById("wsPhoto").files[0];

    if (!item) {
        alert("Enter Item No");
        return;
    }

    if (!qty) {
        alert("Enter Quantity");
        return;
    }

    if (!reason) {
        alert("Select Reason");
        return;
    }

    if (!resource) {
        alert("Select Resource");
        return;
    }

    if (reason === "Expire" && !expire) {
        alert("Select Expiry Date");
        return;
    }

    if (reason === "Damage" && !responsible) {
        alert("Enter Responsible Person");
        return;
    }

    if (!photo) {
        alert("Select Photo");
        return;
    }

    alert("Validation Success ✅");

}

/* ==========================================
   Daily Wastage
   PART 1
========================================== */

const CLOUD_NAME = "m68ghsuf";
const UPLOAD_PRESET = "warehouse";

const FORM_URL =
"https://docs.google.com/forms/d/e/1FAIpQLSf49As2UTIcWt7Ex7sjMu5Lnc1um9zc6-b4GLhPtDXnCtX1Dw/formResponse";

const ENTRY = {

    item: "entry.976789120",
    qty: "entry.382841276",
    reason: "entry.1257136970",
    responsible: "entry.125233202",
    resource: "entry.855328738",
    expire: "entry.410786564",
    photo: "entry.2089791857"

};

let selectedFile = null;



/* ==========================================
   File Name
========================================== */

function showFileName() {

    const input = document.getElementById("wsPhoto");
    const text = document.getElementById("fileName");

    if (!input.files.length) {

        selectedFile = null;
        text.innerText = "No file selected";
        return;

    }

    selectedFile = input.files[0];

    text.innerText = selectedFile.name;

}



/* ==========================================
   Reason
========================================== */

function checkWastageReason() {

    const reason = document.getElementById("wsReason").value;

    const expireBox = document.getElementById("expireBox");
    const responsibleBox = document.getElementById("responsibleBox");

    expireBox.style.display = "none";
    responsibleBox.style.display = "none";

    document.getElementById("wsExpire").value = "";
    document.getElementById("wsResponsible").value = "";

    if (reason === "Damage") {

        responsibleBox.style.display = "block";

    }

    if (reason === "Expire") {

        expireBox.style.display = "block";

    }

}



/* ==========================================
   Compress Image
========================================== */

function compressImage(file) {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = function (e) {

            const img = new Image();

            img.onload = function () {

                let width = img.width;
                let height = img.height;

                const MAX_WIDTH = 1280;
                const MAX_HEIGHT = 1280;

                if (width > MAX_WIDTH) {

                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;

                }

                if (height > MAX_HEIGHT) {

                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;

                }

                const canvas = document.createElement("canvas");

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext("2d");

                ctx.drawImage(
                    img,
                    0,
                    0,
                    width,
                    height
                );

                canvas.toBlob(

                    function(blob){

                        if(blob){

                            resolve(blob);

                        }else{

                            reject("Compression Failed");

                        }

                    },

                    "image/jpeg",

                    0.7

                );

            };

            img.onerror = reject;

            img.src = e.target.result;

        };

        reader.onerror = reject;

        reader.readAsDataURL(file);

    });

}

/* ==========================================
   Upload To Cloudinary
========================================== */

async function uploadToCloudinary(file) {

    const compressed = await compressImage(file);

    const data = new FormData();

    data.append("file", compressed);
    data.append("upload_preset", UPLOAD_PRESET);

    const response = await fetch(

        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,

        {

            method: "POST",
            body: data

        }

    );

    if (!response.ok) {

        throw new Error("Cloudinary Upload Failed");

    }

    const result = await response.json();

    return result.secure_url;

}



/* ==========================================
   Form Validation
========================================== */

function validateWastage() {

    const item = document.getElementById("wsItem").value.trim();
    const qty = document.getElementById("wsQty").value.trim();
    const reason = document.getElementById("wsReason").value;
    const resource = document.getElementById("wsResource").value;
    const expire = document.getElementById("wsExpire").value;
    const responsible = document.getElementById("wsResponsible").value.trim();

    if (!item) {

        alert("Enter Item No");
        return false;

    }

    if (!qty) {

        alert("Enter Quantity");
        return false;

    }

    if (!reason) {

        alert("Select Reason");
        return false;

    }

    if (!resource) {

        alert("Select Resource");
        return false;

    }

    if (reason === "Damage" && !responsible) {

        alert("Responsible is required");
        return false;

    }

    if (reason === "Expire" && !expire) {

        alert("Expire Date is required");
        return false;

    }

    if (!selectedFile) {

        alert("Select Photo");
        return false;

    }

    return true;

}

/* ==========================================
   Submit Wastage
========================================== */

async function submitWastage() {

    if (!validateWastage()) return;

    const btn = document.getElementById("wsBtn");

    btn.disabled = true;
    btn.innerText = "Submitting...";

    try {

        const photoURL = await uploadToCloudinary(selectedFile);

        const data = new FormData();

        data.append(ENTRY.item,
            document.getElementById("wsItem").value.trim());

        data.append(ENTRY.qty,
            document.getElementById("wsQty").value.trim());

        data.append(ENTRY.reason,
            document.getElementById("wsReason").value);

        data.append(ENTRY.resource,
            document.getElementById("wsResource").value);

        data.append(
            ENTRY.responsible,
            document.getElementById("wsResponsible").value.trim()
        );

        data.append(
            ENTRY.expire,
            document.getElementById("wsExpire").value
        );

        data.append(
            ENTRY.photo,
            photoURL
        );

        await fetch(

            FORM_URL,

            {

                method: "POST",
                mode: "no-cors",
                body: data

            }

        );

        resetWastageForm();

        alert("Daily Wastage Submitted Successfully ✅");

    }

    catch (error) {

        console.error(error);

        alert("Submission Failed ❌");

    }

    finally {

        btn.disabled = false;
        btn.innerText = "Submit";

    }

}

/* ==========================================
   Reset Form
========================================== */

function resetWastageForm() {

    document.getElementById("wsItem").value = "";
    document.getElementById("wsQty").value = "";
    document.getElementById("wsReason").value = "";
    document.getElementById("wsResource").value = "";
    document.getElementById("wsExpire").value = "";
    document.getElementById("wsResponsible").value = "";

    document.getElementById("wsPhoto").value = "";

    document.getElementById("fileName").innerText =
        "No file selected";

    selectedFile = null;

    document.getElementById("expireBox").style.display = "none";
    document.getElementById("responsibleBox").style.display = "none";

}



/* ==========================================
   Initialize
========================================== */

window.addEventListener("load", function () {

    document.getElementById("expireBox").style.display = "none";
    document.getElementById("responsibleBox").style.display = "none";

    document
        .getElementById("wsReason")
        .addEventListener("change", checkWastageReason);

    document
        .getElementById("wsPhoto")
        .addEventListener("change", showFileName);

});

/* ==========================================
   Helpers
========================================== */

function enableWastageButton() {

    const btn = document.getElementById("wsBtn");

    btn.disabled = false;
    btn.innerText = "Submit";

}

function disableWastageButton() {

    const btn = document.getElementById("wsBtn");

    btn.disabled = true;
    btn.innerText = "Submitting...";

}



/* ==========================================
   Optional Enter Key Support
========================================== */

document.addEventListener("keydown", function (e) {

    const box = document.getElementById("wastage");

    if (box.style.display !== "block") return;

    if (e.key === "Enter") {

        if (
            e.target.tagName === "INPUT" ||
            e.target.tagName === "SELECT"
        ) {

            e.preventDefault();
            submitWastage();

        }

    }

});



/* ==========================================
   End
========================================== */