window.onload = () => {
  function SELECT() {
    var params = {
      "from": ["artista", "canzone"],
      "select": ["nome as artista", "titolo as canzone", "anno", "punteggio"],
      "where": {
        "anno": parseInt(document.getElementById("txt").value)
      },
      "orderby": " punteggio",
      "desc": true,
      "limit": 30
    }

    fetch("/api/select", {
      method: "POST",
      body: JSON.stringify(params),
      credentials: "same-origin", // include i cookie nella richiesta
      headers: {
        "content-type": "application/json",
        "CSRF-Token": document.getElementsByName("csrf-token")[0].getAttribute("content").toString() // imposta il token nel meta tag come header
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          console.log(res.status);
          return;
        }

        res.json().then((data) => {
          document.getElementById("app").innerHTML = "";
          var result = data
          for (var i = 0; i < result.length; i++) {
            document.getElementById("app").innerHTML += JSON.stringify(result[i]) + "\n"
          }
        });
      }
      )
      .catch(function (err) {
        console.log("Fetch Error ", err);
      });
  }

  document.getElementById("txt").addEventListener("keypress", (e) => {
    var key = e.which || e.keyCode;
    if (key === 13) {
      e.preventDefault();
      SELECT()
      document.getElementById("txt").value.replace(/\n/g, "");
    }
  });
  document.getElementById("btn").addEventListener("click", SELECT);
};