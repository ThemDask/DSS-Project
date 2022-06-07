function button_click() {

    // display "success" message
    var msg = document.getElementById('success');
    msg.innerHTML = 'Success!';

    //select fields
    gender = document.getElementById('gender')
    diabetes = document.getElementById('diabetes')
    anaemia = document.getElementById('anaemia')
    pressure = document.getElementById('pressure')
    smoking = document.getElementById('smoking')

    //input fields
    age = document.getElementById('age')
    cpk = document.getElementById('CPK')
    serum_sodium = document.getElementById('serum_sodium')
    serum_creatinine = document.getElementById('serum_creatinine')
    platelets = document.getElementById('platelets')
    contraction = document.getElementById('contraction')
    time = document.getElementById('time')

    //organise user input into an object
    dataObj = {
    gender: gender.value,
    diabetes: diabetes.value,
    anaemia: anaemia.value,
    pressure: pressure.value,
    smoking: smoking.value,
    age: age.value,
    cpk: cpk.value,
    serum_sodium: serum_sodium.value,
    serum_creatinine: serum_creatinine.value,
    platelets: platelets.value,
    contraction: contraction.value,
    time: time.value
    }

    info = JSON.stringify(dataObj);
    //console.log(info)

    $.ajax({    /* passes the object to the server */
    url:"/",
    type:"POST",
    contentType: "application/json",
    data: JSON.stringify(dataObj)});
}

function return_results() {

    res = document.getElementById('result')
    $.ajax({    /* returns results from server */
    url:"/res",
    type:"GET",
    success : function(result) {
        console.log(result);
        res.innerHTML = result;
        },
    });
}

document.body.style.zoom="70%"