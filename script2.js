

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

// ecoutes des bouton + du tableau QUELLE TYPE DE BORNE CHOISIR ? ?
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
    totalpointdechargesAC = 0;
    totalpointdechargesDC = 0;
    totalpointdechargesACDC = 0;
    totalpointdechargesAbonnement = 0;
    totalpointdechargesPayant = 0;
    totalpuissancecumulePayant =0;


    var rows = document.querySelectorAll("#bornes-souhaitees .marine");
    for (var i = 0; i < rows.length; i += 7) {
      type = rows[i + 3].textContent;
      points = parseInt(rows[i + 2].textContent);
      typecontrat = rows[i + 4].querySelector("select").value;
      nombredeborne = parseInt(rows[i + 2].textContent)
      puissanceCumule  = parseInt(rows[i + 5].textContent)
      console.log(rows)
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
        totalpointdechargesAbonnement += nombredeborne;
        totalpuissancecumuleAbonnement += puissanceCumule
      }
      if (typecontrat === "Payant") {
        totalpointdechargesPayant += nombredeborne;
        totalpuissancecumulePayant += puissanceCumule
      }
    }

    let nb_point_charges = document.querySelectorAll(".totalpointdechargesPayant");
    nb_point_charges.forEach(element => {
      element.innerText = totalpointdechargesPayant;
    })

    let cellsTotalpuissancecumulePayants = document.querySelectorAll(".chargemoyenne");
    cellsTotalpuissancecumulePayants.forEach(element => {
      element.innerText = totalpuissancecumulePayant;
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
  reload();
}




//12/15/20

//calcul pour tableau Proposition de revente
var prixkwhInput = document.getElementById("PrixKwh");
var prixvente2023Input = document.getElementById("Prixvente2023");
prixkwhInput.addEventListener("change", updateMarge2023);
prixvente2023Input.addEventListener("change", updateMarge2023);


function displayTarifValue() {
      var tarifSelect = document.getElementById("tarif").value;
      var tarifValue = document.getElementById("tarifValue");
      var texttarif = document.getElementById("texttarif");

      if (tarifSelect === "8000") {
        tarifValue.innerHTML = "8000 €";
        texttarif.innerHTML = "PDL ENEDIS Tarif Jaune *";
      } else if (tarifSelect === "15000") {
        tarifValue.innerHTML = "15000";
        texttarif.innerHTML = "PDL ENEDIS Tarif Bleu *";
      } else {
        tarifValue.innerHTML = "errore select tarif";
        texttarif.innerHTML = "errore select tarif";
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


//rempli tableau POTENTIEL ANNUEL DE VENTE KWH pour Borne par type "PAYANT"
function remplissagetableaupotentielannuel() {
  //1ere colonne
  var tempscharge2023Cell = document.getElementById("tempscharge2023");
  var tempscharge2024Cell = document.getElementById("tempscharge2024");
  var tempscharge2025Cell = document.getElementById("tempscharge2025");
  var tempscharge2026Cell = document.getElementById("tempscharge2026");
  var totalpointdechargesPayant = parseInt(document.getElementById("totalpointdechargesPayant").innerText);

  var tempsclient = parseFloat(document.getElementById("tempsclient").value);
  var tempscharge2023  = tempsclient / 60;
  var tempscharge2024  = tempsclient / 60;
  var tempscharge2025  = tempsclient / 60;
  var tempscharge2026  = tempsclient / 60;


  tempscharge2023Cell.innerHTML = tempscharge2023.toFixed(2);
  tempscharge2024Cell.innerHTML = tempscharge2024.toFixed(2);
  tempscharge2025Cell.innerHTML = tempscharge2025.toFixed(2);
  tempscharge2026Cell.innerHTML = tempscharge2026.toFixed(2);

  //calculernbsession 3eme colonne
  var nbsession2023 = document.getElementById("nbsession2023");
  var nbsession2024 = document.getElementById("nbsession2024");
  var nbsession2025 = document.getElementById("nbsession2025");
  var nbsession2026 = document.getElementById("nbsession2026");

  nbsession2023.innerHTML = (totalpointdechargesPayant/ tempscharge2023);
  nbsession2024.innerHTML = (totalpointdechargesPayant / tempscharge2024);
  nbsession2025.innerHTML = (totalpointdechargesPayant / tempscharge2025);
  nbsession2026.innerHTML = (totalpointdechargesPayant / tempscharge2026);
   //calculernbsession 4eme colonne
  var frequentation2023Cell = document.getElementById("frequentation2023");
  var frequentation2024Cell = document.getElementById("frequentation2024");
  var frequentation2025Cell = document.getElementById("frequentation2025");
  var frequentation2026Cell = document.getElementById("frequentation2026");
  var nbclients = parseInt(document.getElementById("nbclients").value);
  var frequentation2023 = (parseFloat(nbclients / 24) * 2 / 100).toString();
  var frequentation2024 = (parseFloat(nbclients / 24) * 9 / 100).toString();
  var frequentation2025 = (parseFloat(nbclients / 24) * 12 / 100).toString();
  var frequentation2026 = (parseFloat(nbclients / 24) * 15 / 100).toString();
  frequentation2023Cell.innerHTML = frequentation2023;
  frequentation2024Cell.innerHTML = frequentation2024;
  frequentation2025Cell.innerHTML = frequentation2025;
  frequentation2026Cell.innerHTML = frequentation2026;

}



remplissagetableaupotentielannuel();
updateMarge2023();
calculglobal();
