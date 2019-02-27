function queueGenerate(db) {
    db.collection("tracklist").orderBy("time", "asc").onSnapshot(function(querySnapshot) {
        var wishListContainer = document.getElementById("wishListContainer");
        wishListContainer.innerHTML = "";

        // Creating Header

        var table = document.createElement("table");
        table.className = "table table-hover table-striped table-sm";
        table.setAttribute("id", "wishListTable");

        const header = `
            <thead>
                <tr>
                    <th>#</th>
                    <th>Utwór</th>
                    <th>Zamawiający</th>
                </tr>
            </thead>
        `;

        table.innerHTML = header;

        wishListContainer.appendChild(table);

        // Creating Body

        var body = table.createTBody();
        body.setAttribute("id", "wishListTBody");

        var counterRow = 0;

        //body.className = "";

        querySnapshot.forEach(function(doc) {
            counterRow++;

            const row = `
                <tr id="${doc.id}">
                    <td>${counterRow}</td>
                    <td>${doc.data().track}</td>
                    <td>${doc.data().name}</td>
                </tr>
            `;

            body.innerHTML += row;
        });
    })
};

// order song function
const orderSong = document.querySelector('#order-song-form');
orderSong.addEventListener('submit', (e) => {
    e.preventDefault();
  
    // get order info
    const orderName = orderSong['orderName'].value;
    const orderTitle = orderSong['orderTitle'].value;
    const orderComment = orderSong['orderComment'].value;
    console.log("Name: " + orderName);
    console.log("Title: " + orderTitle);
    console.log("Comment: " + orderComment);

    db.collection("tracklist").add({
        name: orderName,
        track: orderTitle,
        comment: orderComment,
        time: firebase.firestore.FieldValue.serverTimestamp()
    });

    $('#modal-orderSong').modal('hide');
    orderSong.reset();
    
});