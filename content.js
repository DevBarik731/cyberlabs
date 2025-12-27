let loading=true
let BmArray=[]
const GROQ_API_KEY="REMOVED"
const GEMINI_API_KEY="REMOVED"
const DEEPSEAK_API_KEY="REMOVED"

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

  const hltxt=document.createElement("div") // Area Where Highlited text will be shown
  hltxt.id="hltxt";
  newDiv.appendChild(hltxt)

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
let HltStorageVisible=false // Visibility Of storage Area of highlights

let hlt = document.getElementById("hlt")
let hltxt = document.getElementById("hltxt")
let bar = document.getElementById("barrr")
let supr = document.getElementById("sup")
let col = document.getElementById("col")
let bk = document.getElementById("bk")
let gemAI=document.getElementById("gemAI")

const colorselection = document.createElement('div')
colorselection.id="clrsel"
document.body.appendChild(colorselection) //making color selection division

const HltStorageArea = document.createElement("div")
HltStorageArea.id="HltStorageArea"
document.body.appendChild(HltStorageArea)//Area Where Highlited texts will be stored.

const HighlightsArea = document.createElement("div")
HighlightsArea.id="HighlightsArea"
HltStorageArea.appendChild(HighlightsArea)

const HltDelete = document.createElement("div")
HltDelete.id="HltDelete"
let HltDeleteTog=false
HltDelete.textContent="Delete"
HltStorageArea.appendChild(HltDelete)

const gemArea = document.createElement("div")
gemArea.id="gemArea"
document.body.appendChild(gemArea) // AI assistant box

const AiResponse = document.createElement("div")
AiResponse.id="AiResponse"
gemArea.appendChild(AiResponse)//Area Where Conversation with Chatbot will take place

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
     HltStorageArea.style.display="none"
     HltStorageVisible=false
     gemAreaVisible=false
     colbar=false
     bkpop=false
     visible=false
  }
})

hlt.addEventListener("click",()=>{
  if(!hlton){
    hlton=true
    hlt.style.border=`3px solid ${currcol}`
  }
  else{
    hlton=false
    hlt.style.border="none"
  }
}) // this function for highlighter toggle

hltxt.addEventListener("click",()=>{
  if(!HltStorageVisible){
    HltStorageArea.style.display="flex";
    HltStorageVisible=true
    colorselection.style.display="none";
  colbar=false
  BookMarks.style.display="none"
  AddBk.style.display="none"
     bkpop=false
  gemArea.style.display="none"
     gemAreaVisible=false
  }
  else{
    HltStorageArea.style.display="none";
    HltStorageVisible=false
  }
}) // Visibilty of Storage Area of highlighted text

document.addEventListener("mouseup",()=>{
  if(!hlton) return;
  const sel = window.getSelection();
  if (!sel.toString()) return;
  
  const r = sel.getRangeAt(0);
  const s = document.createElement("span");
  s.style.background = `${currcol}`;
  try{
    r.surroundContents(s);
    AddHighlitedTxt(`${sel.toString()}`)
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
  HltStorageArea.style.display="none";
    HltStorageVisible=false
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
    hlt.style.border=`3px solid ${color}`
    hlton=true
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
    HltStorageArea.style.display="none";
    HltStorageVisible=false
  }
  else{
     BookMarks.style.display="none"
     AddBk.style.display="none"
     bkpop=false
  }
})// toggle for bookmark area

HltDelete.addEventListener("click",()=>{
if(!HltDeleteTog){
    HltDeleteTog=true
    HltDelete.style.border="2px solid white"
  }
  else{
    HltDeleteTog=false
    HltDelete.style.border="none"
  }
})

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

function AddHighlitedTxt(str){
  const newDiv = document.createElement("div")
  newDiv.className="Highlights"
  let w = Math.ceil(str.length/25)*15
  newDiv.style.height=`${w}px`
  newDiv.style.backgroundColor=currcol
  newDiv.textContent=`${str}`
  newDiv.addEventListener("click",()=>{
    if(HltDeleteTog){
      newDiv.remove()
    }
  })
  HighlightsArea.appendChild(newDiv)
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

let processing=false // This part used to disable requesting when one request is in process

async function askgemini(txt) {
processing=true
const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,{
  method:"POST",
  headers:{"Content-type": "application/json"},
  body: JSON.stringify({
    contents:[{parts:[{text:`${txt} Respond in exactly one concise paragraph; do not use headings, bullet points, or line breaks`}]}],
  })
})
const data = await res.json()
if(data.candidates){
let reply=data.candidates[0].content.parts[0].text
AiMessageBox(`${reply}`)

}
else if(data.error.message){
  AiMessageBox(`${data.error.message}`)
}
else{
  AiMessageBox(`tera api gaya`)
}
processing=false

}
async function askDeepSeek(txt) {
  processing=true
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions",{
    method:"POST",
    headers:{
      "Content-type":"application/json",
      "Authorization":`Bearer ${DEEPSEAK_API_KEY}`
    },
    body:JSON.stringify({
      "model":"tngtech/deepseek-r1t2-chimera:free",
      "messages":[
        {"role":"user","content":`${txt} Respond in exactly one concise paragraph; do not use headings, bullet points, or line breaks`},
      ],
      "stream":false
    })
  })
  const data = await res.json()
  if(data.choices){
    AiMessageBox(`${data.choices[0].message.content}`)
  }
  else{
    AiMessageBox(`gaya beta tera api`)
  }
  processing=false

}
async function askChatGPT(txt) {
  processing=true
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${GROQ_API_KEY}`
  },
  // body: '{\n  "model": "llama-3.3-70b-versatile",\n  "messages": [{\n      "role": "user",\n      "content": "Explain the importance of fast language models"\n  }]\n}',
  body: JSON.stringify({
    'model': 'openai/gpt-oss-120b',
    'messages': [
      {
        'role': 'user',
        'content': `${txt} (Respond in exactly one concise paragraph; do not use headings, bullet points, or line breaks)`
      }
    ]
  })
});
const data = await res.json()
  if(data.choices){
    AiMessageBox(`${data.choices[0].message.content}`)
  }
  else{
    AiMessageBox(`gaya beta tera api`)
  }
  processing=false
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

const AskArea = document.createElement("input") //Input Box where user will put their questions to AI
AskArea.id="AskArea"
gemArea.append(AskArea)
let gemini=false // boolean Selecting Gemini Model
let deepseek=false //boolean Selecting DeepSeak Model
let chatgpt=false //boolean Selecting ChatGPT oss-120b

const gemToggle = document.createElement("div")
gemToggle.id="gemTog"
gemToggle.className="Tog"
gemArea.appendChild(gemToggle)

const deepToggle = document.createElement("div")
deepToggle.id="deepTog"
deepToggle.className="Tog"
gemArea.appendChild(deepToggle)

const gptToggle = document.createElement("div")
gptToggle.id="gptTog"
gptToggle.className="Tog"
gemArea.appendChild(gptToggle)


const WebSummary = document.createElement("div")
WebSummary.id="WebSummary"
gemArea.appendChild(WebSummary)
WebSummary.textContent="Web Summary"

function AiMessageBox(txt){
const newDiv = document.createElement("div")
let w = Math.ceil(txt.length/25)*15
newDiv.style.height=`${w}px`
newDiv.className="AiMessageBox"
newDiv.textContent=`𝘼𝙞𝙈𝙖𝙩𝙚:  ${txt}`
AiResponse.appendChild(newDiv)
} // Function to create a division for Received Messages
function UserMessageBox(txt){
const newDiv = document.createElement("div")
let w = Math.ceil(txt.length/25)*15
newDiv.style.height=`${w}px`
newDiv.className="UserMessageBox"
newDiv.textContent=`𝙔𝙤𝙪:  ${txt}`
AiResponse.appendChild(newDiv)
} // Function to create a division for User messages



WebSummary.addEventListener("click",()=>{
  if(processing) return;
  UserMessageBox(`${window.location.href} Summarise this webpage in brief`)
  if(gemini){
    askgemini(`${window.location.href} Summarise this webpage in brief`)
    processing=true
  }
  else if(deepseek){
    askDeepSeek(`${window.location.href} Summarise this webage in brief`)
    processing=true
  }
  else if(chatgpt){
    askChatGPT(`${window.location.href} Summarise this webage in brief`)
    processing=true
  }
  else{
    setTimeout(()=>{
        AiMessageBox(`Please Select A model`)
      },2000)
  }
  
})



AskArea.addEventListener("keydown",(e)=>{
if(e.key==="Enter" && (AskArea.value)){
    if(processing) return;
    UserMessageBox(AskArea.value)
    if(gemini){
    askgemini(AskArea.value)
    processing=true
    }
    else if(deepseek){
      askDeepSeek(AskArea.value)
      processing=true
    }
    else if(chatgpt){
      askChatGPT(AskArea.value)
      processing=true
    }
    else{
      setTimeout(()=>{
        AiMessageBox(`Please Select A model`)
      },2000)
    }
    AskArea.value=""
    
  }
})

gemToggle.addEventListener("click",()=>{
  gemini=true
  deepseek=false
  chatgpt=false
  gptToggle.style.border="none"
  gemToggle.style.border="2px solid cyan"
  deepToggle.style.border="none"
})

deepToggle.addEventListener("click",()=>{
  gemini=false
  deepseek=true
  chatgpt=false
  gptToggle.style.border="none"
  gemToggle.style.border="none"
  deepToggle.style.border="2px solid cyan"
})
gptToggle.addEventListener("click",()=>{
gemini=false
  deepseek=false
  chatgpt=true
  gptToggle.style.border="2px solid cyan"
  gemToggle.style.border="none"
  deepToggle.style.border="none"
})



