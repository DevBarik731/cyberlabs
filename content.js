let loading=true
let BmArray=[]
const API_KEY="GET_A_API_FROM_GOOGLE_API_STORE"
const BookMarks = document.createElement("div")
BookMarks.id="BookMarks"
document.body.appendChild(BookMarks) // making bookmark storage
const AddBk = document.createElement("div")
AddBk.id ="AddBk"
document.body.appendChild(AddBk) // for Entering Book Marks


if(!document.getElementById("barrr")){ // it creates the whole extension division on a webpage if its not present already
  BmArray=[]
  chrome.storage.local.get(["marks"],(result)=>{ // ITS A ASYNC function so , .forEach must be inside the callback
    BmArray= result.marks || [];// if response does not comes from result , empty array is assigned
  loading=true
  BmArray.forEach((bm)=>{
    AddBookMark(bm)
  })
  loading=false
})
  const sup = document.createElement("div") // super key to make bar visible
  sup.id="sup";
  document.body.appendChild(sup)

  const newDiv=document.createElement("div") // bar division
  newDiv.id="barrr";
  document.body.appendChild(newDiv)

  const hlt=document.createElement("div") // highliter button
  hlt.id="hlt";
  newDiv.appendChild(hlt)

  const col=document.createElement("div") // color selection button
  col.id="col";
  newDiv.appendChild(col)

  const bk=document.createElement("div") // bookmark button
  bk.id="bk"
  newDiv.appendChild(bk)

  const gemAI = document.createElement("div") // Ai assistant button
  gemAI.id="gemAI"
  newDiv.appendChild(gemAI)
}

let currcol="#f6e54cff" // default color
let hlton=false // highlighter button on or off tgle
let visible=false // visibility of bar
let colbar=false // visibility of color selection area
let bkpop=false // visibility of bookmark popup
let del = false // toggle to delete bookmarks
let gemAreaVisible=false // Ai box visibility
let hlt = document.getElementById("hlt")
let bar = document.getElementById("barrr")
let supr = document.getElementById("sup")
let col = document.getElementById("col")
let bk = document.getElementById("bk")
let gemAI=document.getElementById("gemAI")

const colorselection = document.createElement('div')
colorselection.id="clrsel"
document.body.appendChild(colorselection) //making color selection division

const gemArea = document.createElement("div")
gemArea.id="gemArea"
document.body.appendChild(gemArea) // AI assistant box

const AiResponse = document.createElement("div")
AiResponse.id="AiResponse"
gemArea.appendChild(AiResponse)

supr.addEventListener("click",()=>{ // visibility of whole popup bar
  if(!visible){
    bar.style.display="flex"
    visible=true
  }
  else{
     bar.style.display="none"
     colorselection.style.display="none"
     BookMarks.style.display="none"
     AddBk.style.display="none"
     gemArea.style.display="none"
     gemAreaVisible=false
     colbar=false
     bkpop=false
     visible=false
  }
})
hlt.addEventListener("click",()=>{
  if(!hlton){
    hlton=true
    hlt.style.border="3px solid cyan"
  }
  else{
    hlton=false
    hlt.style.border="none"
  }
}) // this function for highlighter toggle
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
}) // This function handles the highlighting part

col.addEventListener("click",()=>{ 
  if(!colbar){
  colorselection.style.display="flex";
  colbar=true
  BookMarks.style.display="none"
  AddBk.style.display="none"
     bkpop=false
  gemArea.style.display="none"
     gemAreaVisible=false
}else{
  colbar=false
  colorselection.style.display="none"
}
}) // this function handels the color selection area
let arr=["#f6e54cff","#6ccefbff","#6fe773ff","#f081a8ff","#fbc370ff","#cf38eaff"]

arr.forEach((color)=>{
  const newColor = document.createElement('div')
  newColor.className="color";
  newColor.style.backgroundColor=color
  newColor.addEventListener("click",()=>{
    currcol=color
  })
  colorselection.appendChild(newColor)
})

bk.addEventListener("click",()=>{
  if(!bkpop){
    BookMarks.style.display="flex"
    AddBk.style.display="flex"
    bkpop=true
    colbar=false
    colorselection.style.display="none"
    gemArea.style.display="none"
     gemAreaVisible=false
  }
  else{
     BookMarks.style.display="none"
     AddBk.style.display="none"
     bkpop=false
  }
})// toggle for bookmark area

function AddBookMark(str){
  const newDiv = document.createElement("div")
  if(!loading){
  BmArray.push(str)
  chrome.storage.local.set({"marks":BmArray})
  }
  newDiv.className="marked"
  newDiv.textContent=`${str}`
  BookMarks.appendChild(newDiv)
  newDiv.addEventListener("click",()=>{
    if(del){
      newDiv.remove()
      const index = BmArray.indexOf(str);
      if (index !== -1) {
        BmArray.splice(index, 1);
      }
      chrome.storage.local.set({"marks":BmArray})

    }
  })
}

// BOOKMARK DIVISON Insider buttons//
const InputBk = document.createElement("input")
InputBk.id="InputBk"
AddBk.appendChild(InputBk)
const delToggle = document.createElement("div")
delToggle.id="delToggle"
delToggle.className="ad"
delToggle.textContent="delete"
AddBk.appendChild(delToggle)
const addWeb = document.createElement("div")
addWeb.id="addWeb"
addWeb.className="ad"
addWeb.textContent="Bookmark web"
AddBk.appendChild(addWeb)
// ---------------------------------- //

InputBk.addEventListener("keydown",(e)=>{
  if(e.key==="Enter" && (InputBk.value)){
    AddBookMark(InputBk.value)
  }
})
delToggle.addEventListener("click",()=>{
  if(!del){
    del=true
    delToggle.style.border="2px solid white"
  }
  else{
    del=false
    delToggle.style.border="none"
  }
})
addWeb.addEventListener("click",()=>{
  AddBookMark(`${window.location.href}`)
})

async function askAI(txt) {
const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,{
  method:"POST",
  headers:{"Content-type": "application/json"},
  body: JSON.stringify({
    contents:[{parts:[{text:txt}]}],
  })
})
const data = await res.json()
if(data.candidates){
let reply=data.candidates[0].content.parts[0].text
AiResponse.textContent=`${reply}`
}
else if(data.error.message){
  AiResponse.textContent=`${data.error.message}`
}
else{
  AiResponse.textContent=`tera api gaya`
}


}

// AI ASSISTANT PART//
gemAI.addEventListener("click",()=>{
  if(!gemAreaVisible){
    gemArea.style.display="flex"
     gemAreaVisible=true
    colorselection.style.display="none"
     BookMarks.style.display="none"
     AddBk.style.display="none"
     colbar=false
     bkpop=false
  }else{
    gemArea.style.display="none"
     gemAreaVisible=false
  }
})

const AskArea = document.createElement("input")
AskArea.id="AskArea"
gemArea.append(AskArea)

AskArea.addEventListener("keydown",(e)=>{
if(e.key==="Enter" && (AskArea.value)){
    askAI(AskArea.value)
    AskArea.value=""
  }
})



