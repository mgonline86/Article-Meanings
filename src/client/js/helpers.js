//Global Variables
let option= document.getElementById('reqType');
let formInputTag

// Warning if no input was entered
function onBlur(){
    if (document.getElementById('articleSrc').value==='') {
        let warnTag = document.getElementById('submitWarn');
        let warnBorder = document.getElementById('articleSrc');
        warnBorder.classList.add('warnBorder');
        warnTag.classList.remove('hidden');
    }
}

//choosing input type txt or url
function switchForm(){
    switch (option.value) {
        case "url":
            formInputTag = document.getElementById('articleSrc');
            if (formInputTag) {
                formInputTag.remove();
            }
            option.insertAdjacentHTML("afterend", '<input type="url" id="articleSrc" name="articleSrc" onblur="Client.onBlur()" placeholder="http://" required>');
          break;
        case "text":
            formInputTag = document.getElementById('articleSrc');
            if (formInputTag) {
                formInputTag.remove();
            }
            option.insertAdjacentHTML("afterend", '<textarea id="articleSrc" type="text" name="input" value="" onblur="Client.onBlur()" placeholder="Article Text ..." required ></textarea>');
      }
};

export { onBlur, switchForm }
