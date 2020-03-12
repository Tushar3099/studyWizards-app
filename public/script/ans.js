var editor = new EditorJS({
    
    holder: 'editorjs'
    ,
    
    image: { 
      class: SimpleImage,
      inlineToolbar: ['link'],
    },
    });

    const saveButton = document.getElementById('save-button');
    const output = document.getElementById('output');

    const sendHttpRequest = (method,url,data)=>{
      const promise = new Promise((resolve,reject)=>{
        const xhr = new XMLHttpRequest();

        xhr.open(method,url);

        xhr.responseType = 'json';

        if(data){
          xhr.setRequestHeader('Content-Type','application/json');
        }

        xhr.onload = ()=>{
          resolve(xhr.response);
        }
        xhr.send(JSON.stringify(data))
      });
      return promise;
    }


    saveButton.addEventListener('click', () => {
    editor.save().then( savedData => {
          sendHttpRequest('POST','/test', savedData);
      })
    })