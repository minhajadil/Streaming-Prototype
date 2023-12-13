
let cur_id = 1000 ;
let descending = false ;


const navbar=async()=>{

    const response = await fetch(" https://openapi.programming-hero.com/api/videos/categories") ;
    const jason = await response.json() ;
    const data = jason.data ;
    console.log(data);

    const but= document.getElementById("navbuttons") ;

    data.forEach((element)=>{
        const butto = document.createElement('div') ;
        butto.innerHTML=`<button onclick=shownormal(${element.category_id}) class="buttons"> ${element.category}</button>` ;
        but.appendChild(butto) ;
    })

}





const shownormal= async(id)=>
{
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`) ;
    const jason = await response.json() ;
    const data = jason.data ;
    cur_id= id ;
    showcategorydata(data) ;
}

const viewnumbers= (str)=>
{
    const strr = str.replace('K','') ;
    const value = parseFloat(strr) ;
    return value ;
}
 





const showsorted= async()=>{
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${cur_id}`) ;
    const jason = await response.json() ;
    const data = jason.data ;
    const narray = [...data] ;

    const sortbutton = document.getElementById("sorting") ;


    if(!descending)
    {
        narray.sort((a,b)=>viewnumbers(b.others.views)- viewnumbers(a.others.views)) ;
        descending= true ;
        sortbutton.innerText='Sort by Views (Asc)' ;

    }
    else{
        narray.sort((a,b)=> viewnumbers(a.others.views)-viewnumbers(b.others.views)) ;
        descending= false ;
        sortbutton.innerText='Sort by Views (Desc)' ;

    }

    
    
    showcategorydata(narray) ;

}



function showcategorydata(data)
{

    const cardcontainer= document.getElementById("card-container") ;
    cardcontainer.innerHTML= `` ;

    if(data.length==0)
    {

        cardcontainer.innerHTML=`

        <div class="nocontent text-center ">
    <img class="" src="./Resources/Icon.png" alt="">
    <h1 class="text-black  text-body-emphasis ">Oops!! Sorry,<br> There is no content here</h1>
    

</div>
        
        `

    }


    else{

    
     
   



    

    
    data.forEach((element) => {

        const seconds =element.others.posted_date ;

        let hours = seconds/3600 ;
        let minutes = (seconds%3600)/60 ;
        hours =parseInt(hours) ;
        minutes= parseInt(minutes) ;

        const varified = element.authors[0].verified ;
       
        const card = document.createElement('div') ;

        card.classList="col-3 cards "

        card.innerHTML= `

        <div class="cardsproto">
      <img class ="image-section" src="${element.thumbnail}" alt="">
      <div class="time"> ${element.others.posted_date ? `${hours} hours ${minutes} min ago`  : "" }  
        </div>
      
      <div class="author d-flex gap-3 pt-4 ">
        <img class="authph " src="${element.authors[0].profile_picture}" alt="">
        <div class="authortextdiv">
        <h1 class="name">${element.title}</h1> 
        <div class="authorverified d-flex gap-1  ">
    <p class="text-body-secondary text-opacity-100 "> ${element.authors[0].profile_name}</p>

    ${varified? '<img class="verifiedbatch" src="./Resources/verified.png" alt="">' : ""}
     
    </div>

            <p class="text-body-secondary  ">${element.others.views} Views</p>
        </div>
      </div>
    </div>

    

        
         ` ;
        cardcontainer.appendChild(card) ;

        
        
        
    });

}

}
navbar() ;
shownormal(1000) ;
