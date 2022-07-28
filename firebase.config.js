const admin = require('firebase-admin');
const serviceAccount = require("./tradedepot-c9f2c-firebase-adminsdk-fifci-9672f14418.json");

exports.uploadToFireStore = (data) => {
    if(!admin.apps.length){
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
          });
    }   
    const db = admin.firestore();
    const productRef = db.collection("myproducts")
    productRef.doc(data.id.toString()).set(data)
}


