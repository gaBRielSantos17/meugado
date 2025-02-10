const sendSingleDeviceNotification = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "key=BNRM8a64MzLMgXP3ICuwNDgewwEOFGxLo1x3rBrA0vl5rdde8XAOWFh4ftP0brSywq8iO6QFEzaVosayH19s5ik");
  
  var raw = JSON.stringify({
    "data": {},
    "notification": {
      "body": data.body,
      "title": data.title
    },
    "to": data.token
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("https://fcm.googleapis.com/fcm/send", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  }
  
  export default {
    sendSingleDeviceNotification
}