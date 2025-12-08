let loading=true
// let BmArray=[]
// const BookMarks = document.createElement("div")
// BookMarks.id="BookMarks"
// document.body.appendChild(BookMarks) // making bookmark storage
// const AddBk = document.createElement("div")
// AddBk.id ="AddBk"
// document.body.appendChild(AddBk) // for Entering Book Marks


// if(!document.getElementById("barrr")){ // it creates the whole extension division on a webpage if its not present already
//   BmArray=[]
//   chrome.storage.local.get(["marks"],(result)=>{ // ITS A ASYNC function so , .forEach must be inside the callback
//     BmArray= result.marks || [];// if response does not comes from result , empty array is assigned
//   loading=true
//   BmArray.forEach((bm)=>{
//     AddBookMark(bm)
//   })
//   loading=false
// })
//   const sup = document.createElement("div")
//   sup.id="sup";
//   document.body.appendChild(sup)
//   const newDiv=document.createElement("div")
//   newDiv.id="barrr";
//   document.body.appendChild(newDiv)
//   const hlt=document.createElement("div")
//   hlt.id="hlt";
  
//   newDiv.appendChild(hlt)
//   const sum=document.createElement("div")
//   sum.id="sum";
  
//   newDiv.appendChild(sum)
//   const col=document.createElement("div")
//   col.id="col";
  
//   newDiv.appendChild(col)
//   const trsl=document.createElement("div")
//   trsl.id="trsl";
  
//   newDiv.appendChild(trsl)
//   const bk=document.createElement("div")
//   bk.id="bk"
//   newDiv.appendChild(bk)
// }

// let currcol="#f6e54cff" // default color
// let hlton=false // highlighter button on or off tgle
// let visible=false // visibility of bar
// let colbar=false // visibility of color selection area
// let bkpop=false // visibility of bookmark popup
// let del = false // toggle to delete bookmarks
// let hlt = document.getElementById("hlt")
// let bar = document.getElementById("barrr")
// let supr = document.getElementById("sup")
// let col = document.getElementById("col")
// let bk = document.getElementById("bk")

// const colorselection = document.createElement('div')
// colorselection.id="clrsel"
// document.body.appendChild(colorselection) //making color selection division

// supr.addEventListener("click",()=>{ // visibility of whole popup bar
//   if(!visible){
//     bar.style.display="flex"
//     visible=true
//   }
//   else{
//      bar.style.display="none"
//      colorselection.style.display="none"
//      BookMarks.style.display="none"
//      AddBk.style.display="none"
//      colbar=false
//      bkpop=false
//      visible=false
//   }
// })
// hlt.addEventListener("click",()=>{
//   if(!hlton){
//     hlton=true
//     hlt.style.border="3px solid cyan"
//   }
//   else{
//     hlton=false
//     hlt.style.border="none"
//   }
// }) // this function for highlighter toggle
// document.addEventListener("mouseup",()=>{
//   if(!hlton) return;
//   const sel = window.getSelection();
//   if (!sel.toString()) return;

//   const r = sel.getRangeAt(0);
//   const s = document.createElement("span");
//   s.style.background = `${currcol}`;
//   try{
//     r.surroundContents(s);
//   }
//   catch{
//     console.log("Can't highlight that")
//   }
//   sel.removeAllRanges();
// }) // This function handles the highlighting part

// col.addEventListener("click",()=>{ 
//   if(!colbar){
//   colorselection.style.display="flex";
//   colbar=true
//   BookMarks.style.display="none"
//   AddBk.style.display="none"
//      bkpop=false
// }else{
//   colbar=false
//   colorselection.style.display="none"
// }
// }) // this function handels the color selection area
// let arr=["#f6e54cff","#6ccefbff","#6fe773ff","#f081a8ff","#fbc370ff","#cf38eaff"]

// arr.forEach((color)=>{
//   const newColor = document.createElement('div')
//   newColor.className="color";
//   newColor.style.backgroundColor=color
//   newColor.addEventListener("click",()=>{
//     currcol=color
//   })
//   colorselection.appendChild(newColor)
// })

// bk.addEventListener("click",()=>{
//   if(!bkpop){
//     BookMarks.style.display="flex"
//     AddBk.style.display="flex"
//     bkpop=true
//     colbar=false
//     colorselection.style.display="none"
//   }
//   else{
//      BookMarks.style.display="none"
//      AddBk.style.display="none"
//      bkpop=false
//   }
// })// toggle for bookmark area

// function AddBookMark(str){
//   const newDiv = document.createElement("div")
//   if(!loading){
//   BmArray.push(str)
//   chrome.storage.local.set({"marks":BmArray})
//   }
//   newDiv.className="marked"
//   newDiv.textContent=`${str}`
//   BookMarks.appendChild(newDiv)
//   newDiv.addEventListener("click",()=>{
//     if(del){
//       newDiv.remove()
//       const index = BmArray.indexOf(str);
//       if (index !== -1) {
//         BmArray.splice(index, 1);
//       }
//       chrome.storage.local.set({"marks":BmArray})

//     }
//   })
// }

// const InputBk = document.createElement("input")
// InputBk.id="InputBk"
// AddBk.appendChild(InputBk)
// const delToggle = document.createElement("div")
// delToggle.id="delToggle"
// delToggle.className="ad"
// delToggle.textContent="delete"
// AddBk.appendChild(delToggle)
// const addWeb = document.createElement("div")
// addWeb.id="addWeb"
// addWeb.className="ad"
// addWeb.textContent="Bookmark web"
// AddBk.appendChild(addWeb)

// InputBk.addEventListener("keydown",(e)=>{
//   if(e.key==="Enter" && (InputBk.value)){
//     AddBookMark(InputBk.value)
//   }
// })
// delToggle.addEventListener("click",()=>{
//   if(!del){
//     del=true
//     delToggle.style.border="2px solid white"
//   }
//   else{
//     del=false
//     delToggle.style.border="none"
//   }
// })
// addWeb.addEventListener("click",()=>{
//   AddBookMark(`${window.location.href}`)
// })