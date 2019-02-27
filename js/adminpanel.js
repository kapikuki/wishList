function getAdminQueue(db) {
    db.collection("tracklist").orderBy("time", "asc").onSnapshot(function(querySnapshot) {
        var mainContent = document.getElementById("mainContent");
        mainContent.innerHTML = "";

        // Creating Header

        var table = document.createElement("table");
        table.className = "table table-hover table-striped table-sm";
        table.setAttribute("id", "queueAdminTable");
        
        const header = `
            <thead>
                <tr>
                    <th>#</th>
                    <th>Utwór</th>
                    <th>Zamawiający</th>
                    <th>Usuń</th>
                </tr>
            </thead>
        `;

        table.innerHTML = header;

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
            deleteButton.innerHTML = "X";

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
        console.log("INFO: Document successfully deleted!");
    }).catch(function(error) {
        console.error("ERROR: Error removing document: ", error);
    });
};