console.log("index.js");

// var client  = mqtt.connect({ host:'test.mosquitto.org', port: 8081})
// or
// var client  = mqtt.connect('wss://test.mosquitto.org:8081/mqtt')

// var client  = mqtt.connect({ host:'mqtt.eclipse.org/mqtt', port: 443})
// or
var address = document.getElementById('address').value;
var client;
$('#broker').click(function() {
    $('#status').val('Connecting....')
    var client = mqtt.connect(address);
    client.on('connect', function() {
        $('#status').val('Connected!')
        console.log('connected')
        $('#sub-button').click(function() {
            $time = new Date()
            let subTopic = $('#sub-input').val()
            $('#subscribe').prepend(`<tr><td> ${subTopic} </td> <td> ${$time.toDateString()+ " " + $time.toLocaleTimeString() }</td></tr> `)
            client.subscribe(subTopic, function(err) {
                if (err) {
                    console.log(err)
                }
            })
            subTopic = "";
        })
    })
    client.on('message', function(topic, message) {
        $time = new Date()
            // message is Buffer
        console.log(topic.toString())
        console.log(message.toString())
        let tpc = topic.toString();
        let msg = message.toString();
        $('#incoming').prepend(`<tr><td> ${tpc} </td> <td> ${msg} </td><td> ${$time.toDateString()+ " " + $time.toLocaleTimeString() }</td></tr> `)
            //   client.end()
    })

    var pub_button = document.getElementById('pub-button');
    pub_button.addEventListener('click', () => {
        $time = new Date()
        let topic = document.getElementById('pub-input').value;
        let pub_input = document.getElementById('pub-input-payload').value;

        client.publish(topic, pub_input)

        $('#published').prepend(`<tr><td> ${topic} </td> <td> ${pub_input} </td><td> ${$time.toDateString()+ " " + $time.toLocaleTimeString() }</td></tr> `)
        topic = "";
        pub_input = "";
    })
})