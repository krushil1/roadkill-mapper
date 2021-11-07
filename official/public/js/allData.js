const url = "/api/v1/stores";

let total = fetch(url);
total
  .then((response) => {
    return response.json();
  })
  .then((resData) => {
    let totalNum = resData.count;
    document.getElementById("total").innerHTML = totalNum;
  })
  .catch((error) => {
    console.log(error);
  });

async function allData() {
  const res = await fetch("/api/v1/stores");
  const data = await res.json();
  const stuff = data.data.map((store) => {
    return {
      name: store.storeId,
      address: store.location.formattedAddress,
    };
  });
  appendData(stuff);
}

function appendData(data) {
  var mainContainer = document.getElementById("myData");

  for (var i = 0; i < data.length; i++) {
    var newI = 1 + i;

    var h6 = document.createElement("h6");
    var animal = newI + ".) " + data[i].name + "<br>";
    var addy = "Address: " + data[i].address;

    h6.innerHTML = animal + addy;
    // h6.style.color = "purple";
    h6.style.marginTop = "35px";
    mainContainer.appendChild(h6);
  }
}

allData();
