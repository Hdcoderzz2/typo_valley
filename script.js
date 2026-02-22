var data=[];
var current_key="Sakshi";
function load(){
    fetch('./data.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();  
                }).then((data2)=>{
                    data.push(data2);
                    if(Object.keys(data2).length==1){
                        document.getElementById("rf").disabled=true;
                        document.getElementById('text1').innerHTML="1/1";
                    }
                     document.getElementById("pfp").style.backgroundImage=`url('images/${data[0][current_key]['pfp']}')`;
                });
}
var counter=0;
function pfp(){
    document.getElementById("pfp").style.backgroundImage=`url('images/${data[0][current_key]['pfp']}')`;
}
function set_mt(){
    let margin_gap=document.getElementById("typo_title");
    document.getElementById("typo_list").style.marginTop=`${margin_gap.clientHeight+20}px`;
}
function cn(){
    document.getElementById("nc").style.opacity="0";
    setTimeout(()=>{document.getElementById("nc").style.opacity="1"},500);
}
function text(){
    const arr_len=Object.keys(data[0]).length;
    document.getElementById("text1").innerHTML=`${counter+1}/${arr_len}`;
}
function right(){
    const arr_len=Object.keys(data[0]).length;
    let lb=document.getElementById("lf");
    let rb=document.getElementById("rf");
    if(lb.disabled==true){
        lb.disabled=false;
    }
    if(counter==arr_len-2){
        rb.disabled=true;
    }
    counter++;
    cn();
    current_key=Object.keys(data[0])[counter];
    pfp();
    document.getElementById("name").innerHTML=current_key;
    text();
}
function left(){
    let lb=document.getElementById("lf");
    let rb=document.getElementById("rf");
    if(rb.disabled==true){
        rb.disabled=false;
    }
    if(counter==1){
        lb.disabled=true;
    }
    counter--;
    cn();
    current_key=Object.keys(data[0])[counter];
    pfp();
    document.getElementById("name").innerHTML=current_key;
    text();
}
function typo(){
    if(current_key=="HD"){
        alert("HD does not make typos.");
    }else{
    document.body.style.overflowX="none";
    document.getElementById("s1").style.display="none";
    document.getElementById("s2").style.display="block";
    document.getElementById("s1").style.opacity="0";
    setTimeout(()=>{
        set_mt();
        get_typos();
        },120);
    setTimeout(()=>{document.getElementById("s2").style.opacity="1"},500);}
}
function back(){
    document.getElementById("typo_list").remove();
    const div=document.createElement("div");
    div.setAttribute('id','typo_list');
    document.getElementById("s2").appendChild(div);
    document.getElementById("s1").style.display="flex";
    document.getElementById("s2").style.display="none";
    document.getElementById("s2").style.opacity="0";
    setTimeout(()=>{document.getElementById("s1").style.opacity="1"},500);
}
function get_typos(){
    let typos=Object.keys(data[0][current_key]['typos']);
    for(let i=0;i<typos.length;i++){
        const list_item=document.createElement("div");
        list_item.classList.add('list_item');
        const p=document.createElement('p');
        p.innerHTML=`${i+1}. &nbsp;${data[0][current_key]['typos'][i]['typo']}`;
        const button=document.createElement('button');
        const span=document.createElement("span");
        button.classList.add("jtm");
        span.classList.add('material-symbols-outlined');
        span.innerHTML="imagesmode";
        button.setAttribute('onclick',`window.open('${data[0][current_key]['typos'][i]['url']}')`);
        button.appendChild(span);
        list_item.appendChild(p);
        list_item.appendChild(button);
        document.getElementById("typo_list").appendChild(list_item);
    }
}