function queueGenerate(db) {
    db.collection("tracklist").orderBy("time", "asc").onSnapshot(function(querySnapshot) {
        var wishListContainer = document.getElementById("wishListContainer");
        wishListContainer.innerHTML = "";

        // Creating Header

        var table = document.createElement("table");
        table.className = "table table-hover";
        table.setAttribute("id", "wishListTable");
        
        var header = table.createTHead();
        //header.className = "";

        var headerRow = header.insertRow(0);
        //headerRow.className = "";

        var headerCell0 = headerRow.insertCell(0);
        headerCell0.innerHTML = "#";

        var headerCell1 = headerRow.insertCell(1);
        headerCell1.innerHTML = "Utwór";

        var headerCell2 = headerRow.insertCell(2);
        headerCell2.innerHTML = "Zamawiający";

        wishListContainer.appendChild(table);

        // Creating Body

        var body = table.createTBody();
        body.setAttribute("id", "wishListTBody");

        //body.className = "";

        var counterRow = 0;

        querySnapshot.forEach(function(doc) {
            counterRow++;

            var row = body.insertRow(-1);
            row.setAttribute("id", doc.id);

            var cell0 = row.insertCell(0);
            cell0.innerHTML = counterRow;

            var cell1 = row.insertCell(1);
            cell1.innerHTML = doc.data().track;

            var cell2 = row.insertCell(2);
            cell2.innerHTML = doc.data().name;

        });
    })
};

/*function queueUpdate(db) {
    db.collection("tracklist").onSnapshot(function(querySnapshot) {
        var body = document.getElementById("wishListTBody");

        querySnapshot.docChanges().forEach(function(change) {
            if (change.type === "added") {
                var row = body.insertRow(-1);
                row.setAttribute("id", change.doc.id);

                var cell0 = row.insertCell(0);
                cell0.innerHTML = "#";

                var cell1 = row.insertCell(1);
                cell1.innerHTML = change.doc.data().track;

                var cell2 = row.insertCell(2);
                cell2.innerHTML = change.doc.data().name;
            }
            if (change.type === "modified") {}
            if (change.type === "removed") {
                var row = document.getElementById(change.doc.id);
                row.parentNode.removeChild(row);
            }
        });
    });
}*/

function orderTrack(db,newName,newTrack,newComment) {
    db.collection("tracklist").add({
        name: newName,
        track: newTrack,
        comment: newComment,
        time: firebase.firestore.FieldValue.serverTimestamp()
    });
    console.log("Zamówiono")
}