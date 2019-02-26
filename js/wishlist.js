function queueGenerate(db) {
    db.collection("tracklist").orderBy("time", "asc").onSnapshot(function(querySnapshot) {
        var wishListContainer = document.getElementById("wishListContainer");
        wishListContainer.innerHTML = "";

        // Creating Header

        var table = document.createElement("table");
        table.className = "table table-hover table-striped";
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

        var counterRow = 0;

        //body.className = "";

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

function getAdminQueue(db) {
    db.collection("tracklist").orderBy("time", "asc").onSnapshot(function(querySnapshot) {
        var mainContent = document.getElementById("mainContent");
        mainContent.innerHTML = "";

        // Creating Header

        var table = document.createElement("table");
        table.className = "table table-hover table-striped";
        table.setAttribute("id", "queueAdminTable");
        
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

        var headerCell3 = headerRow.insertCell(3);
        headerCell3.innerHTML = "Dedykacja";

        var headerCell4 = headerRow.insertCell(4);
        headerCell4.innerHTML = "Usuń";

        mainContent.appendChild(table);

        // Creating Body

        var body = table.createTBody();
        body.setAttribute("id", "queueAdminTBody");

        var counterRow = 0;

        //body.className = "";

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

            var cell3 = row.insertCell(3);
            cell3.innerHTML = doc.data().comment;

            var cell4 = row.insertCell(4);
            let deleteButton = document.createElement("button");

            deleteButton.className = "btn btn-sm btn-danger";
            deleteButton.innerHTML = "&#xE106;";

            cell4.appendChild(deleteButton);
            deleteButton.addEventListener("click", (e) => {
                e.stopPropagation();
                let id = e.target.parentElement.parentElement.getAttribute("id");
                deleteTrack(id);
            });
        });
    });
};

function deleteTrack(id) {
    db.collection("tracklist").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
};