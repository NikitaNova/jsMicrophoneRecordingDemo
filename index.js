console.log('test')

navigator.mediaDevices.getUserMedia({audio:true})
    .then(stream =>{

        let audio;
        let options = {
            mimeType: "audio/webm",
            audioBitsPerSecond: 768000
        }
        const mediaRecorder = new MediaRecorder(stream, options)
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
            audio.setAttribute("controls","")
            audio.setAttribute("type","audio/webm")
            document.querySelector("body").append(audio)

        })

        document.querySelector("input[name='stop']")
            .addEventListener("click",function(){
                console.log("stop")
                mediaRecorder.stop()
                audioChunks = []
                console.log(mediaRecorder)

            })

        document.querySelector("input[name='play']")
            .addEventListener("click",function(){
                console.log("play")
                console.log(audio)
                sessionStorage.setItem("audioMessage",audio)
                audio.play()
            })
})