const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

exports.onUserCreate = functions.firestore.document('Reservacion/{userId}').onCreate(async(snap, context) => {
    const values = snap.data();
        const querycliente = await db.collection("Cliente").where("id_cliente", "==", values.id_cliente).get()
        let x = 0;
        querycliente.forEach(
            (querySnapshot) =>
            x = querySnapshot.data().id_cliente
        );    
        const query = await db.collection("Reservacion").where("estado_reservacion", "==", 'Ausencia').
        where("id_cliente", "==", x);
        await query.get().then((snap) => {
            size = snap.size;
        });
        if(size >= 2){
            await db.collection("Reservacion").doc(snap.id).delete()
            console.log("No es posible hacer una reservación");
        }
}
)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
