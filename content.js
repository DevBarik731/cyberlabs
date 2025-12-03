if(!document.getElementById("barrr")){
  const sup = document.createElement("div")
  sup.id="sup";
  document.body.appendChild(sup)
  const newDiv=document.createElement("div")
  newDiv.id="barrr";
  document.body.appendChild(newDiv)
  const hlt=document.createElement("div")
  hlt.id="hlt";
  newDiv.appendChild(hlt)
  const sum=document.createElement("div")
  sum.id="sum";
  newDiv.appendChild(sum)
  const col=document.createElement("div")
  col.id="col";
  newDiv.appendChild(col)
  const trsl=document.createElement("div")
  trsl.id="trsl";
  newDiv.appendChild(trsl)
}
let currcol="yellow"
let hlton=false
let visible=false
let hlt = document.getElementById("hlt")
let bar = document.getElementById("barrr")
let supr = document.getElementById("sup")
let col = document.getElementById("col")
supr.addEventListener("click",()=>{
  if(!visible){
    bar.style.display="flex"
    visible=true
  }
  else{
     bar.style.display="none"
     visible=false
  }
})
hlt.addEventListener("click",()=>{
  hlton=!hlton
  alert(`Hilight-mode set : ${hlton}`)
})
document.addEventListener("mouseup",()=>{
  if(!hlton) return;
  const sel = window.getSelection();
  if (!sel.toString()) return;

  const r = sel.getRangeAt(0);
  const s = document.createElement("span");
  s.style.background = `${currcol}`;
  try{
    r.surroundContents(s);
  }
  catch{
    console.log("Can't highlight that")
  }
  sel.removeAllRanges();
})
const colorselection = document.createElement('div')
colorselection.id="clrsel"
document.body.appendChild(colorselection)
col.addEventListener("click",()=>{
  colorselection.style.display="flex";
})