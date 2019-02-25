function queueGet() {
    db.collection("tracklist").get().then(function(querySnapshot) {
                var wishListContainer = document.getElementById("wishListContainer");
                wishListContainer.innerHTML = "";

                var sectionWishList = document.createElement("section");
                sectionWishList.className = "wishList";
                
                var rowHead = document.createElement("div");
                rowHead.className = "row";

                var div1Head = document.createElement("div");
                div1Head.className = "col-4";
                var div1Text = document.createTextNode("Utwór");
                div1Head.appendChild(div1Text);

                var div2Head = document.createElement("div");
                div2Head.className = "col-4";
                var div2Text = document.createTextNode("Imię");
                div2Head.appendChild(div2Text);

                var div3Head = document.createElement("div");
                div3Head.className = "col-4";
                var div3Text = document.createTextNode("Komentarz");
                div3Head.appendChild(div3Text);

                rowHead.appendChild(div1Head);
                rowHead.appendChild(div2Head);
                rowHead.appendChild(div3Head);

                wishListContainer.appendChild(rowHead)
                wishListContainer.appendChild(sectionWishList)

                querySnapshot.forEach(function(doc) {
                    var row = document.createElement("div");
                    row.className = "row";

                    var div1 = document.createElement("div");
                    div1.className = "col-4";
                    div1.innerHTML = doc.data().track;

                    var div2 = document.createElement("div");
                    div2.className = "col-4";
                    div2.innerHTML = doc.data().name;

                    var div3 = document.createElement("div");
                    div3.className = "col-4";
                    div3.innerHTML = doc.data().comment;

                    row.appendChild(div1);
                    row.appendChild(div2);
                    row.appendChild(div3);

                    //wishListContainer.appendChild(row)
                    sectionWishList.appendChild(row)
                }
            }
        }

        function queueUpdate() {

        }

        trackList.collection("tracklist").onSnapshot(function(querySnapshot) {
            var wishListContainer = document.getElementById("wishListContainer");
            wishListContainer.innerHTML = "";

            var sectionWishList = document.createElement("section");
            sectionWishList.className = "wishList";
            
            var rowHead = document.createElement("div");
            rowHead.className = "row";

            var div1Head = document.createElement("div");
            div1Head.className = "col-4";
            var div1Text = document.createTextNode("Utwór");
            div1Head.appendChild(div1Text);

            var div2Head = document.createElement("div");
            div2Head.className = "col-4";
            var div2Text = document.createTextNode("Imię");
            div2Head.appendChild(div2Text);

            var div3Head = document.createElement("div");
            div3Head.className = "col-4";
            var div3Text = document.createTextNode("Komentarz");
            div3Head.appendChild(div3Text);

            rowHead.appendChild(div1Head);
            rowHead.appendChild(div2Head);
            rowHead.appendChild(div3Head);

            wishListContainer.appendChild(rowHead)
            wishListContainer.appendChild(sectionWishList)

            querySnapshot.docChanges().forEach(function(change) {
                if (change.type === "added") {
                    console.log("New city: ", change.doc.data());
                }
                if (change.type === "modified") {
                    console.log("Modified city: ", change.doc.data());
                }
                if (change.type === "removed") {
                    console.log("Removed city: ", change.doc.data());
                }
                

             {
                var row = document.createElement("div");
                row.className = "row";

                var div1 = document.createElement("div");
                div1.className = "col-4";
                div1.innerHTML = doc.data().track;

                var div2 = document.createElement("div");
                div2.className = "col-4";
                div2.innerHTML = doc.data().name;

                var div3 = document.createElement("div");
                div3.className = "col-4";
                div3.innerHTML = doc.data().comment;

                row.appendChild(div1);
                row.appendChild(div2);
                row.appendChild(div3);

                //wishListContainer.appendChild(row)
                sectionWishList.appendChild(row)
            });
        });