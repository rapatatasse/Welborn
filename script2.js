

//affichage du tableau des bornes a choisir
function toggleDiv() {
  var div = document.getElementById("myDiv");
  var arrowIcon = document.getElementById("arrowIcon");

  if (arrowIcon.innerHTML === "v") {
    arrowIcon.innerHTML = "&#62;";
    div.style.display = "none";
  } else {
    arrowIcon.innerHTML = "v";
    div.style.display = "block";
  }
}

// ecoutes des bouron + du tableau QUELLE TYPE DE BORNE CHOISIR ? ?
for (let btn of document.getElementsByClassName('addrow')) {
  btn.addEventListener('click', function() {
    ajouterLigne(btn);
  });
}
function calcultotalprix() {
  var elementsPrix = document.getElementsByClassName("prix");
  var totalPrix = 0;
  var baliseTotal = document.getElementById("prixtotal");
  console.log("coucou")
  for (var i = 0; i < elementsPrix.length; i++) {
    var valeur = parseFloat(elementsPrix[i].innerText);
    if (!isNaN(valeur)) {
      totalPrix += valeur;
      console.log(valeur)
    }
  }
  baliseTotal.textContent = totalPrix.toFixed(2).toString();
  calculglobal();

}


  // Mettre à jour la valeur dans la balise th



//calcul ligne des total
function calculerNombreBornesTotal() {
  // Récupérer tous les éléments input avec name="nombrebornes"
  var elements = document.getElementsByName("nombrebornes");
  var total = 0;


  // Parcourir les éléments et additionner leurs valeurs
  for (var i = 0; i < elements.length; i++) {
    var valeur = parseInt(elements[i].value);
    if (!isNaN(valeur)) {
      total += valeur;
    }
  }
  // Mettre à jour la valeur dans la balise th
  var baliseTotal = document.getElementById("nombrebornestotal");
  baliseTotal.textContent = total.toString();
  totalpuissancecumulee();
  calculglobal();



  // Mettre à jour le nombre total charges
  var elementspointdecharges = document.getElementsByName("nombredecharge");
  var totalpointdecharges = 0;

  for (var i = 0; i < elementspointdecharges.length; i++) {
    var valeur = parseInt(elementspointdecharges[i].textContent);
    if (!isNaN(valeur)) {
      totalpointdecharges += valeur;
    }
  }



  var baliseTotal = document.getElementById("nombrechargetotal");
  var baliseTotalAC = document.getElementById("nombrechargeAC");
  var baliseTotalDC = document.getElementById("nombrechargeDC");
  var baliseTotalACDC = document.getElementById("nombrechargeACDC");
  totalpointdechargesAC = 0
  totalpointdechargesDC = 0
  totalpointdechargesACDC = 0
  totalpointdechargesAbonnement = 0
  totalpointdechargesPayant = 0

  var rows = document.querySelectorAll("#bornes-souhaitees .marine");
  for (var i = 0; i < rows.length; i += 7) {
    type = rows[i + 3].textContent;
    points = parseInt(rows[i + 2].textContent);
    typecontrat = parseInt(rows[i + 4].value)

    if (type === "AC") {
      totalpointdechargesAC += points;
    }
    if (type === "DC") {
      totalpointdechargesDC += points;
    }
    if (type === "AC + DC") {
      totalpointdechargesACDC += points;
    }
    if (typecontrat === "Abonnement") {
      totalpointdechargesAbonnement += 1;
    }
    if (typecontrat === "Payant") {
      totalpointdechargesPayant += 1;
    }

  }


  let nb_point_charges = document.querySelectorAll(".nbpointcharges");
  nb_point_charges.forEach(element => {
    element.innerText = totalpointdechargesAbonnement;
  })




  baliseTotal.textContent = totalpointdecharges.toString();
  baliseTotalAC.textContent = totalpointdechargesAC.toString();
  baliseTotalDC.textContent = totalpointdechargesDC.toString();
  baliseTotalACDC.textContent = totalpointdechargesACDC.toString();


  var contrat1 = document.getElementById("contrat1");
  contrat1.innerText = ((totalpointdechargesAC * 300) + (totalpointdechargesDC * 500) + (totalpointdechargesACDC))*3 .toString();
  var DC = document.getElementById("DC");
  DC.innerText = (totalpointdechargesDC*16*12*4).toString();
  var AC = document.getElementById("AC");
  AC.innerText = (totalpointdechargesAC*16*12*4).toString();
  var ACDC = document.getElementById("AC DC");
  ACDC.innerText = (totalpointdechargesACDC*16*12*4).toString();
  var Totaltout = document.getElementById("Totaltout");
  Totaltout.innerText = (totalpointdecharges*60).toString();
  calculglobal();
  calculerTempsCharge();


}

function totalpuissancecumulee() {
  var elementsPuissanceCumulee = document.getElementsByClassName("puissance_cumulee");
  var totalPuissanceCumulee = 0;

  for (var i = 0; i < elementsPuissanceCumulee.length; i++) {
    var valeur = parseInt(elementsPuissanceCumulee[i].innerText);
    if (!isNaN(valeur)) {
      totalPuissanceCumulee += valeur;
    }
  }

  var baliseTotal = document.getElementById("puissancecumuleetotal");
  baliseTotal.textContent = totalPuissanceCumulee.toString();
  calculglobal();


}






function updateMarge2023() {
  var prixkwh2023Cell = document.getElementById("prixkwh2023");
  var prixvente2024Cell = document.getElementById("prixvente2024");
  var prixvente2025Cell = document.getElementById("prixvente2025");
  var prixvente2026Cell = document.getElementById("prixvente2026");
  var prixkwh2024Cell = document.getElementById("prixkwh2024");
  var prixkwh2025Cell = document.getElementById("prixkwh2025");
  var prixkwh2026Cell = document.getElementById("prixkwh2026");


  var marge2023Cell = document.getElementById("marge2023");
  var marge2024Cell = document.getElementById("marge2024");
  var marge2025Cell = document.getElementById("marge2025");
  var marge2026Cell = document.getElementById("marge2026");
  var prixkwh = parseFloat(prixkwhInput.value);
  var prixkwh2024  = prixkwh + prixkwh* 12/100;
  var prixkwh2025  = prixkwh + prixkwh* 15/100;
  var prixkwh2026  = prixkwh + prixkwh* 20/100;


  var prixvente2023 = parseFloat(prixvente2023Input.value);
  prixvente2024Cell.innerText = prixvente2023.toString();
  prixvente2025Cell.innerText = prixvente2023.toString();
  prixvente2026Cell.innerText = prixvente2023.toString();

  if (!isNaN(prixkwh) && !isNaN(prixvente2023)) {
    var marge2023 = prixvente2023 / prixkwh;
    marge2023Cell.innerText = marge2023.toFixed(2);
    prixkwh2023Cell.innerText = prixkwh.toFixed(2);
  }
  if (!isNaN(prixkwh2024) && !isNaN(prixvente2023)) {
    var marge2024 = prixvente2023 / prixkwh2024;
    marge2024Cell.innerText = marge2024.toFixed(2);
    prixkwh2024Cell.innerText = prixkwh2024.toFixed(2);
  }
  if (!isNaN(prixkwh2025) && !isNaN(prixvente2023)) {
    var marge2025 = prixvente2023 / prixkwh2025;
    marge2025Cell.innerText = marge2025.toFixed(2);
    prixkwh2025Cell.innerText = prixkwh2025.toFixed(2);
  }
  if (!isNaN(prixkwh2026) && !isNaN(prixvente2023)) {
    var marge2026 = prixvente2023 / prixkwh2026;
    marge2026Cell.innerText = marge2026.toFixed(2);
    prixkwh2026Cell.innerText = prixkwh2026.toFixed(2);
  }
  calculglobal();
}
//12/15/20

//calcul pour tableau Proposition de revente
var prixkwhInput = document.getElementById("PrixKwh");
var prixvente2023Input = document.getElementById("Prixvente2023");
prixkwhInput.addEventListener("change", updateMarge2023);
prixvente2023Input.addEventListener("change", updateMarge2023);
calculglobal();

function displayTarifValue() {
      var tarifSelect = document.getElementById("typechargeprix");
      var tarifValue = document.getElementById("payant");
      var texttarif = document.getElementById("texttarif");

      if (tarifSelect.value === "8000") {
        tarifValue.innerHTML = "8000 €";
        texttarif.innerHTML = "PDL ENEDIS Tarif Jaune *";
      } else if (tarifSelect.value === "15000") {
        tarifValue.innerHTML = "15000";
        texttarif.innerHTML = "PDL ENEDIS Tarif Bleu *";
      } else {
        tarifJauneValue.innerHTML = "";
        tarifBleuValue.innerHTML = "";
      }
      calculglobal();
}


function calculglobal() {

  var elements = [
    document.getElementById("IRVE1").value,
    document.getElementById("IRVE2").value,
    document.getElementById("IRVE3").value,
    document.getElementById("IRVE4").value,
    document.getElementById("prixtotal").innerText,
    document.getElementById("Totaltout").innerText,
    document.getElementById("tarif").value,
    document.getElementById("DC").innerText,
    document.getElementById("AC").innerText,
    document.getElementById("AC DC").innerText,
    document.getElementById("contrat1").innerText
  ]

  let total = 0;
  for (let elm of elements) {
    const val = parseFloat(elm)
    if (isNaN(val)) continue;
    total += val;
  }

  var invglobal= document.getElementById("invglobal");
  invglobal.innerText = total+"€";
}
function calculerTempsCharge() {
  var tempscharge2023Cell = document.getElementById("tempscharge2023");
  var tempscharge2024Cell = document.getElementById("tempscharge2024");
  var tempscharge2025Cell = document.getElementById("tempscharge2025");
  var tempscharge2026Cell = document.getElementById("tempscharge2026");

  var tempsclientCell = document.getElementById("tempsclient");
  var tempsclient = parseFloat(tempsclientCell.value);
  var tempscharge2023  = tempsclient / 60;
  var tempscharge2024  = tempsclient / 60;
  var tempscharge2025  = tempsclient / 60;
  var tempscharge2026  = tempsclient / 60;


  tempscharge2023Cell.innerHTML = tempscharge2023.toFixed(2);
  tempscharge2024Cell.innerHTML = tempscharge2024.toFixed(2);
  tempscharge2025Cell.innerHTML = tempscharge2025.toFixed(2);
  tempscharge2026Cell.innerHTML = tempscharge2026.toFixed(2);

}





function initTypeCharge(row) {
  let inputs = row.querySelectorAll("input, select");
  let choice = row.querySelector("[name='typechargeprix']")

  let totalpoints = parseInt(row.querySelector(".totalpoint").innerText);
  row.dataset.chargeVal = totalpoints;

  for (let input of inputs) {
    input.addEventListener("change", function(e) {
      setChargeValue(row,choice.value);
      getTotalCharges();
    })
  }

  getTotalCharges();
}

function setChargeValue(row,choice) {
  let totalpoints = parseInt(row.querySelector(".totalpoint").innerText);
  if (choice == "Abonnement") {
    row.dataset.chargeVal = 0;
  } else {
    //calcul si "Payant"
    row.dataset.chargeVal = totalpoints;
  }
}

function getTotalCharges() {
  let nb_point_charges = document.querySelectorAll(".nbpointcharges");
  let selectedRows = document.querySelectorAll(".selectedRows");
  let total = 0;
  for (let row of selectedRows) {
    total+= parseInt(row.dataset.chargeVal);
  }

  nb_point_charges.forEach(element => {
    element.innerText = total;
  })
}
function calculernbsession() {
  //EN COURS
  var tempscharge2023 = document.getElementById("tempscharge2023");
  var tempscharge2024 = document.getElementById("tempscharge2024");

  var tempscharge2025 = document.getElementById("tempscharge2025");

  var nbpointcharges = document.getElementById("nbpointcharges");
  var nbsession2023 = document.getElementById("nbsession2023");
  var tempscharge2026 = document.getElementById("tempscharge2026");
  var nbsession2024 = document.getElementById("nbsession2024");
  var nbsession2025 = document.getElementById("nbsession2025");
  var nbsession2026 = document.getElementById("nbsession2026");

  var nbsession2023 = (nbpointcharges / tempscharge2023);
  var nbsession2024 = (nbpointcharges / tempscharge2024);
  var nbsession2025 = (nbpointcharges / tempscharge2025);
  var nbsession2026 = (nbpointcharges / tempscharge2026);



  nbsession2023.innerHTML = nbsession2023.toFixed(2);
  nbsession2024.innerHTML = nbsession2024.toFixed(2);
  nbsession2025.innerHTML = nbsession2025.toFixed(2);
  nbsession2026.innerHTML = nbsession2026.toFixed(2);


}
updateMarge2023();
displayTarifValue();
calculglobal();
calculerTempsCharge();
initTypeCharge();
