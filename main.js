
var prediction_1 = "";
var prediction_2 = "";

Webcam.set({
        width:350,
        height:300,
        image_format:'png',
        image_quality:90
    });

camera = document.getElementById("camera")

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){

        document.getElementById("result").innerHTML = '<img id="capture_image" src = "'+data_uri+'">'
    });
}

console.log("ml5 version", ml5.version)

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/9M-kcqdgL/model.json', modelLoaded);

function modelLoaded()
{
    console.log('model loaded');
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is" + prediction_1;
    speak_data_2 = "The second prediction is" + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById('capture_image');
    classifier.classify(img, gotResult);
}

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/9M-kcqdgL/model.json', modelLoaded)

function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("gesture_name_result").innerHTML = results[0].label;
        document.getElementById("gesture_name_result2").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;

        speak();

        if(results[0].label == "Good")
        {
            document.getElementById("update_gesture").innerHTML = "&#128077";
        }

        if(results[0].label == "Bad")
        {
            document.getElementById("update_gesture").innerHTML = "&#128078";
        }

        if(results[0].label == "Peaceful")
        {
            document.getElementById("update_gesture").innerHTML = "&#128076";
        }
    }
}