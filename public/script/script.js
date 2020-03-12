// FroalaEditor.DefineIcon('imageInfo', {NAME: 'info', SVG_KEY: 'help'});
//   FroalaEditor.RegisterCommand('imageInfo', {
//     title: 'Info',
//     focus: false,
//     undo: false,
//     refreshAfterCallback: false,
//     callback: function () {
//       var $img = this.image.get();
//       alert($img.attr('src'));
//     }
//   });

//   new FroalaEditor('div#froala-editor', {
//     // Set image buttons, including the name
//     // of the buttons defined in customImageButtons.
//     imageEditButtons: ['imageDisplay', 'imageAlign', 'imageInfo', 'imageRemove']
//   })

// if(imgUpload){
//     upload(imgUpload.filename)
// }

// function upload(filename){
//     console.log("adads");               
//     image = document.createElement("img"); 
//     url = "/upload/" + filename ; 
//     image.src= url 
//     document.querySelector("#new-ans").appendChild(image); 
// }

// like = (e)=>{
//    e.target.classList.add('like');
//    document.querySelector("#unlike-button").classList.remove('unlike')
// }

// unlike = (e)=>{
//    e.target.classList.add('unlike');
//    document.querySelector("#like-button").classList.remove('like');
// }


// document.querySelector("#like-button").addEventListener('click',(e)=>{
//       like(e);
// })

// document.querySelector("#unlike-button").addEventListener('click',(e)=>{
//    unlike(e);
// })

// function search(nameKey, myArray){
//    for (var i=0; i < myArray.length; i++) {
//        if (myArray[i].username === nameKey) {
//            return true;
//        }
//    }
//    return false;
// }