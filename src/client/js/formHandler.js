//Global Variables
let option= document.getElementById('reqType');

//handling the form submit
function handleSubmit(event) {
    event.preventDefault()

    let formdata = {}
    let formText = document.getElementById('articleSrc').value
    switch (option.value) {
        case "url":
             // If the article is URL
            formdata={type:"url",txt:formText};
          break;
        case "text":
             // If the article is Text
             formdata={type:"txt",txt:formText};
      }
     
      // If old result exists remove it
    let oldTag = document.getElementById("results").firstChild;
    if (oldTag) {
        oldTag.remove();
    };
    
    //Check internet is online
    if(!navigator.onLine){
        document.getElementById('results').innerHTML =
            `<div class="error">
                <code>Check you internet connection !</code>
            </div>`;
        return;}

    console.log("::: Form Submitted :::")
    console.log(JSON.stringify(formdata))
    //Integrating with Meaning Cloud API
    fetch("http://localhost:8000/apiKey", {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'Content-Type': 'application/json'
        } 
      })
    .then(res => res.json())
    .then(function(res) {
        if (res.status.code==="0") {
   
            //Pop-up tag on
            let popTag = document.getElementById('pop-up');
            let emoji
            switch (res.score_tag) {
                    case "P+":
                        emoji = '&#128525';
                        break;
                    case "P":
                        emoji = '&#128578'
                        break;
                    case "NEU":
                        emoji = '&#128528'
                        break;
                    case "N":
                        emoji = '&#128577'
                        break;
                    case "N+":
                        emoji = '&#129324'
                        break;
                    case "NONE":
                        emoji = '&#128566'
                    }
            popTag.innerHTML = emoji;
            popTag.classList.remove('hidden');
            popTag.classList.add('popAnimation');
            setTimeout(function(){popTag.classList.add('hidden');popTag.classList.remove('popAnimation');},3000)
            
            //Creating Result Table
            document.getElementById('results').innerHTML = 
            `<table class="table table-stripped">
                <thead>
                    <tr><th>Subjectivity</th><th>Irony</th><th>Score tag</th><th>Agreement</th><th>Confidence</th></tr>
                </thead>
                <tbody>
                    <tr><td>${res.subjectivity}</td><td>${res.irony}</td><td>${res.score_tag}</td><td>${res.agreement}</td><td>${res.confidence}</td></tr>
                </tbody>
            </table>`;
        }
        else {
            document.getElementById('results').innerHTML =
            `<div class="error">
                <code>Error ${res.status.code}: ${res.status.msg}</code>
            </div>`
        }
    })
    .catch(err =>{
        console.log(err);
        //create error tag
        document.getElementById('results').innerHTML =
        `<div class="error">
            <code>Error 500: Internal Server Error</code>
        </div>`;
    });
}

export { handleSubmit }
