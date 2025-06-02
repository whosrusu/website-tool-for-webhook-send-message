// https://github.com/whosrusu

const webhookTokenInput = document.querySelector("#webhookToken");
const displayProfile = document.querySelector(".webhook-profile");
const messageContent = document.querySelector("#content");

let webhookUrl;

webhookTokenInput.addEventListener("input", (value) => {
    let data = String(value.data);
    let very = "https://discord.com/api/webhooks/"

    if(data.startsWith(very) && data.length == very.length){
        alert("this webhook is invalid");
    }
    else if(data.startsWith("https://discord.com/api/webhooks/")){
        let webhookProfile;
        fetch(data, { method: "GET", headers: {'Content-Type': 'application/json'}}).then(body => body.json().then((res) => {
            webhookProfile = res;

            const setPfp = document.querySelector("#webhook-pfp");
            const setName = document.querySelector("#name");
            
            displayProfile.style.display = "block"

            const namePfp = res.avatar;
            const idUser = res.id;
            const nameWebhook = res.name;

            setPfp.innerHTML = `<img src="https://cdn.discordapp.com/avatars/${idUser}/${namePfp}.png?size=1024" alt="">`;
            setName.textContent = nameWebhook;
            webhookUrl = `https://discord.com/api/webhooks/${res.id}/${res.token}`;
        }))
    }
    else if(!data.startsWith("https://discord.com/api/webhooks/")){
        webhookTokenInput.value = "";
    };
})

function sendBtn(){
    webhookTokenInput.required = true;
    if(!webhookTokenInput.value || !messageContent.value){
        alert("you need a valid webhook or a message");
    }
    else if(!webhookTokenInput.value.startsWith("https://discord.com/api/webhooks/")){
        alert("need webhook")
    }
    else if(webhookTokenInput.value.startsWith("https://discord.com/api/webhooks/")){
        fetch(webhookUrl, {method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({content: `${messageContent.value}`})}).then(data => alert("done")).catch(err => alert("content invalid"));
        alert("done");
    }
}

function resetBtn(){
    displayProfile.style.display = "none";

    webhookTokenInput.value = "";
    messageContent.value = "";
}