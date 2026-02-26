// Matrix effect
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let letters = "01POPKID";
letters = letters.split("");
let fontSize = 14;
let columns = canvas.width / fontSize;
let drops = [];
for(let x=0;x<columns;x++) drops[x]=1;

function draw(){
    ctx.fillStyle="rgba(0,0,0,0.05)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="#0f0";
    ctx.font=fontSize+"px monospace";
    for(let i=0;i<drops.length;i++){
        let text = letters[Math.floor(Math.random()*letters.length)];
        ctx.fillText(text,i*fontSize,drops[i]*fontSize);
        if(drops[i]*fontSize>canvas.height && Math.random()>0.975) drops[i]=0;
        drops[i]++;
    }
}
setInterval(draw,33);

// Visitor counter (local)
if(!localStorage.visits) localStorage.visits=0;
localStorage.visits++;
document.getElementById("visits").innerText=localStorage.visits;

// GitHub Profile
fetch("https://api.github.com/users/popkidc")
.then(r=>r.json())
.then(d=>{
avatar.src=d.avatar_url;
name.innerText=d.login;
bio.innerText=d.bio||"Developer";
followers.innerText=d.followers;
following.innerText=d.following;
repos.innerText=d.public_repos;
});

// Repo stats
fetch("https://api.github.com/users/popkidc/repos?per_page=100")
.then(r=>r.json())
.then(repos=>{
stars.innerText = repos.reduce((t,r)=>t+r.stargazers_count,0);
forks.innerText = repos.reduce((t,r)=>t+r.forks_count,0);
});

// POPKID-XD specific
fetch("https://api.github.com/repos/popkidc/POPKID-XD")
.then(r=>r.json())
.then(repo=>{
botStars.innerText=repo.stargazers_count;
botForks.innerText=repo.forks_count;
watchers.innerText=repo.watchers_count;
issues.innerText=repo.open_issues_count;
});

// Activity
fetch("https://api.github.com/users/popkidc/events")
.then(r=>r.json())
.then(events=>{
activityList.innerHTML="";
events.slice(0,10).forEach(e=>{
activityList.innerHTML+=`<div>${e.type} → ${e.repo.name}</div>`;
});
});
