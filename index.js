console.log('test')

navigator.mediaDevices.getUserMedia({audio:true})
    .then(stream =>{

    let audio;
    const mediaRecorder = new MediaRecorder(stream)
    let audioChunks = [];

    document.querySelector("input[name='record']")
        .addEventListener("click",function(){
            console.log("record")
            mediaRecorder.start()
        })

    mediaRecorder.addEventListener("dataavailable", event=>{
        console.log("collect data")
        audioChunks.push(event.data)
        const audioBlob = new Blob(audioChunks)
        const audioURL = URL.createObjectURL(audioBlob)
        audio = new Audio(audioURL)
    })

    document.querySelector("input[name='stop']")
        .addEventListener("click",function(){
            console.log("stop")
            mediaRecorder.stop()
            audioChunks = []
    })

    document.querySelector("input[name='play']")
        .addEventListener("click",function(){
            console.log("play")
            audio.play()
        })


})