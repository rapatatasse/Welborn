

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
    totalpuissancecumuleAbonnement = 0;
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
    var tempsclient = document.getElementById("tempsclient").value
    if (totalpuissancecumulePayant>50) {
      totalpuissancecumulePayant = 50
    } else {
      totalpuissancecumulePayant = totalpuissancecumulePayant * tempsclient /60
    }
    let cellsTotalpuissancecumulePayants = document.querySelectorAll(".chargemoyenne");
    cellsTotalpuissancecumulePayants.forEach(element => {

      element.innerText = totalpuissancecumulePayant;
    })



    baliseTotal.textContent = totalpointdecharges.toString();
    baliseTotalAC.textContent = totalpointdechargesAC.toString();
    baliseTotalDC.textContent = totalpointdechargesDC.toString();
    baliseTotalACDC.textContent = totalpointdechargesACDC.toString();


    var contrat1 = document.getElementById("contrat1");
    contrat1.innerText = ((totalpointdechargesAC * 300) + (totalpointdechargesDC * 500) + (totalpointdechargesACDC*600))*4;
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


//remplissage tbl proposition de revente (prix KWH moyen)
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
  var prixkwh2024  = prixkwh + prixkwh* 9/100;
  var prixkwh2025  = prixkwh2024 + prixkwh2024* 12/100;
  var prixkwh2026  = prixkwh2025 + prixkwh2025* 15/100;


  var prixvente2023 = parseFloat(prixvente2023Input.value);
  prixvente2024Cell.innerText = prixvente2023.toString();
  prixvente2025Cell.innerText = prixvente2023.toString();
  prixvente2026Cell.innerText = prixvente2023.toString();

  if (!isNaN(prixkwh) && !isNaN(prixvente2023)) {
    var marge2023 = prixvente2023 / prixkwh;
    marge2023Cell.innerText = marge2023.toFixed(2);
    prixkwh2023Cell.innerText = prixkwh.toFixed(3);
  }
  if (!isNaN(prixkwh2024) && !isNaN(prixvente2023)) {
    var marge2024 = prixvente2023 / prixkwh2024;
    marge2024Cell.innerText = marge2024.toFixed(2);
    prixkwh2024Cell.innerText = prixkwh2024.toFixed(3);
  }
  if (!isNaN(prixkwh2025) && !isNaN(prixvente2023)) {
    var marge2025 = prixvente2023 / prixkwh2025;
    marge2025Cell.innerText = marge2025.toFixed(2);
    prixkwh2025Cell.innerText = prixkwh2025.toFixed(3);
  }
  if (!isNaN(prixkwh2026) && !isNaN(prixvente2023)) {
    var marge2026 = prixvente2023 / prixkwh2026;
    marge2026Cell.innerText = marge2026.toFixed(2);
    prixkwh2026Cell.innerText = prixkwh2026.toFixed(3);
  }

}




//12/15/20

//calcul pour tableau Proposition de revente
var prixkwhInput = document.getElementById("PrixKwh");
var prixvente2023Input = document.getElementById("prixvente2023");
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

  var totalglobal= document.getElementById("totalglobal");
  totalglobal.innerText = total+"€";
}


//rempli tableau POTENTIEL ANNUEL DE VENTE KWH pour Borne par type "PAYANT"
function remplissageTBLpotentielannuel() {
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
  //Part EV seul 202
  var frequentation2023 = (parseFloat(nbclients / 24) * 2 / 100);
  var frequentation2024 = (parseFloat(nbclients / 24) * 4 / 100);
  var frequentation2025 = (parseFloat(nbclients / 24) * 6 / 100);
  var frequentation2026 = (parseFloat(nbclients / 24) * 9/ 100);
  frequentation2023Cell.innerHTML = frequentation2023.toFixed(0);
  frequentation2024Cell.innerHTML = frequentation2024.toFixed(0);
  frequentation2025Cell.innerHTML = frequentation2025.toFixed(0);
  frequentation2026Cell.innerHTML = frequentation2026.toFixed(0);

  var nombredeclientjour2023Cell = document.getElementById("nombredeclientjour2023");
  var nombredeclientjour2024Cell  = document.getElementById("nombredeclientjour2024");
  var nombredeclientjour2025Cell  = document.getElementById("nombredeclientjour2025");
  var nombredeclientjour2026Cell  = document.getElementById("nombredeclientjour2026");
  var nombredeclientjour2023 = ((frequentation2023*0.7));
  var nombredeclientjour2024 = ((frequentation2024*0.7));
  var nombredeclientjour2025 = ((frequentation2025*0.7));
  var nombredeclientjour2026 = ((frequentation2026*0.7));
  nombredeclientjour2023Cell.innerHTML = nombredeclientjour2023.toFixed(0);
  nombredeclientjour2024Cell.innerHTML = nombredeclientjour2024.toFixed(0);
  nombredeclientjour2025Cell.innerHTML = nombredeclientjour2025.toFixed(0);
  nombredeclientjour2026Cell.innerHTML = nombredeclientjour2026.toFixed(0);

}


function remplissageTBLMargesParChargeUnitaire() {
  // Cellules à remplir
  var prixrevient2023Cell = document.getElementById("prixrevient2023");
  var prixrevient2024Cell = document.getElementById("prixrevient2024");
  var prixrevient2025Cell = document.getElementById("prixrevient2025");
  var prixrevient2026Cell = document.getElementById("prixrevient2026");

  // Cellules utilisées pour le calcul
  var prixkwh2023 = parseFloat(document.getElementById("prixkwh2023").innerText);
  var prixkwh2024 = parseFloat(document.getElementById("prixkwh2024").innerText);
  var prixkwh2025 = parseFloat(document.getElementById("prixkwh2025").innerText);
  var prixkwh2026 = parseFloat(document.getElementById("prixkwh2026").innerText);
  var chargemoyenne = parseFloat(document.getElementById("chargemoyenne").innerText);

  // Mes calculs
  prixrevient2023Cell.innerText = (chargemoyenne * prixkwh2023).toFixed(2);
  prixrevient2024Cell.innerText = (chargemoyenne * prixkwh2024).toFixed(2);
  prixrevient2025Cell.innerText = (chargemoyenne * prixkwh2025).toFixed(2);
  prixrevient2026Cell.innerText = (chargemoyenne * prixkwh2026).toFixed(2);
  // Cellules à remplir
  var prixrevente2023Cell = document.getElementById("prixrevente2023");
  var prixrevente2024Cell = document.getElementById("prixrevente2024");
  var prixrevente2025Cell = document.getElementById("prixrevente2025");
  var prixrevente2026Cell = document.getElementById("prixrevente2026");
  var prixvente2023 = parseFloat(document.getElementById("prixvente2023").value);
  var prixvente2024 = parseFloat(document.getElementById("prixvente2024").innerText);
  var prixvente2025 = parseFloat(document.getElementById("prixvente2025").innerText);
  var prixvente2026 = parseFloat(document.getElementById("prixvente2026").innerText);


  prixrevente2023Cell.innerText = (prixvente2023 * chargemoyenne).toFixed(2);
  prixrevente2024Cell.innerText = (prixvente2024 * chargemoyenne).toFixed(2);
  prixrevente2025Cell.innerText = (prixvente2025 * chargemoyenne).toFixed(2);
  prixrevente2026Cell.innerText = (prixvente2026 * chargemoyenne).toFixed(2);

  var margeunit2023Cell = document.getElementById("margeunit2023");
  var margeunit2024Cell = document.getElementById("margeunit2024");
  var margeunit2025Cell = document.getElementById("margeunit2025");
  var margeunit2026Cell = document.getElementById("margeunit2026");
  var prixrevente2023 = parseFloat(document.getElementById("prixrevente2023").innerText);
  var prixrevente2024 = parseFloat(document.getElementById("prixrevente2024").innerText);
  var prixrevente2025 = parseFloat(document.getElementById("prixrevente2025").innerText);
  var prixrevente2026 = parseFloat(document.getElementById("prixrevente2026").innerText);
  var prixrevient2023 = parseFloat(document.getElementById("prixrevient2023").innerText);
  var prixrevient2024 = parseFloat(document.getElementById("prixrevient2024").innerText);
  var prixrevient2025 = parseFloat(document.getElementById("prixrevient2025").innerText);
  var prixrevient2026 = parseFloat(document.getElementById("prixrevient2026").innerText);
  margeunit2023Cell.innerText = (prixrevente2023 - prixrevient2023).toFixed(2);
  margeunit2024Cell.innerText = (prixrevente2024 - prixrevient2024).toFixed(2);
  margeunit2025Cell.innerText = (prixrevente2025 - prixrevient2025).toFixed(2);
  margeunit2026Cell.innerText = (prixrevente2026 - prixrevient2026).toFixed(2);


}
function remplissageTBLMargesAnnuelle() {
  //celluel a remplir
  var margeopera2023Cell = document.getElementById("margeopera2023");
  var margeopera2024Cell = document.getElementById("margeopera2024");
  var margeopera2025Cell = document.getElementById("margeopera2025");
  var margeopera2026Cell = document.getElementById("margeopera2026");

  var margebrute2023Cell = document.getElementById("margebrute2023");
  var margebrute2024Cell = document.getElementById("margebrute2024");
  var margebrute2025Cell = document.getElementById("margebrute2025");
  var margebrute2026Cell = document.getElementById("margebrute2026");

  var coutevmap2023Cell = document.getElementById("coutevmap2023");
  var coutevmap2024Cell = document.getElementById("coutevmap2024");
  var coutevmap2025Cell = document.getElementById("coutevmap2025");
  var coutevmap2026Cell = document.getElementById("coutevmap2026");


      ///cellules tbl sur investissement
      var margebrutcumule2023Cell = document.getElementById("margebrutcumule2023");
      var margebrutcumule2024Cell = document.getElementById("margebrutcumule2024");
      var margebrutcumule2025Cell = document.getElementById("margebrutcumule2025");
      var margebrutcumule2026Cell = document.getElementById("margebrutcumule2026");
      var travauxcumulee2023Cell = document.getElementById("travauxcumulee2023");
      var travauxcumulee2024Cell = document.getElementById("travauxcumulee2024");
      var travauxcumulee2025Cell = document.getElementById("travauxcumulee2025");
      var travauxcumulee2026Cell = document.getElementById("travauxcumulee2026");
      var magenetcumulee2023Cell = document.getElementById("magenetcumulee2023");
      var magenetcumulee2024Cell = document.getElementById("magenetcumulee2024");
      var magenetcumulee2025Cell = document.getElementById("magenetcumulee2025");
      var magenetcumulee2026Cell = document.getElementById("magenetcumulee2026");
      //dernier ligne temps de retour
      var tempsretourCell = document.getElementById("tempsretour");






  //variable pour calcul
  var prixrevente2023 = parseFloat(document.getElementById("prixrevente2023").innerText);
  var prixrevente2024 = parseFloat(document.getElementById("prixrevente2024").innerText);
  var prixrevente2025 = parseFloat(document.getElementById("prixrevente2025").innerText);
  var prixrevente2026 = parseFloat(document.getElementById("prixrevente2026").innerText);
  var margeunit2023 = parseFloat(document.getElementById("margeunit2023").innerText);
  var margeunit2024 = parseFloat(document.getElementById("margeunit2024").innerText);
  var margeunit2025 = parseFloat(document.getElementById("margeunit2025").innerText);
  var margeunit2026 = parseFloat(document.getElementById("margeunit2026").innerText);
  var nombredeclientjour2023 = parseFloat(document.getElementById("nombredeclientjour2023").innerText);
  var nombredeclientjour2024 = parseFloat(document.getElementById("nombredeclientjour2024").innerText);
  var nombredeclientjour2025 = parseFloat(document.getElementById("nombredeclientjour2025").innerText);
  var nombredeclientjour2026 = parseFloat(document.getElementById("nombredeclientjour2026").innerText);
  var totalglobal = parseFloat(document.getElementById("totalglobal").innerText);

  var margeopera2023 = (margeunit2023 * nombredeclientjour2023*24*12)
  var margeopera2024 = (margeunit2024 * nombredeclientjour2024*24*12)
  var margeopera2025 = (margeunit2025 * nombredeclientjour2025*24*12)
  var margeopera2026 = (margeunit2026 * nombredeclientjour2026*24*12)

  var coutevmap2023 = (prixrevente2023 * nombredeclientjour2023*24*12*0.085);
  var coutevmap2024 = (prixrevente2024 * nombredeclientjour2024*24*12*0.085);
  var coutevmap2025 = (prixrevente2025 * nombredeclientjour2025*24*12*0.085);
  var coutevmap2026 = (prixrevente2026 * nombredeclientjour2026*24*12*0.085);

  //renvoie au cellules


  margeopera2023Cell.innerText = margeopera2023.toFixed(2);
  margeopera2024Cell.innerText = margeopera2024.toFixed(2);
  margeopera2025Cell.innerText = margeopera2025.toFixed(2);
  margeopera2026Cell.innerText = margeopera2026.toFixed(2);

  coutevmap2023Cell.innerText = coutevmap2023.toFixed(2);
  coutevmap2024Cell.innerText = coutevmap2024.toFixed(2);
  coutevmap2025Cell.innerText = coutevmap2025.toFixed(2);
  coutevmap2026Cell.innerText = coutevmap2026.toFixed(2);

  var margebrut2023 = (margeopera2023 - coutevmap2023)
  var margebrut2024 = (margeopera2024 - coutevmap2024)
  var margebrut2025 = (margeopera2025 - coutevmap2025)
  var margebrut2026 = (margeopera2026 - coutevmap2026)

  margebrute2023Cell.innerText = margebrut2023.toFixed(2);
  margebrute2024Cell.innerText = margebrut2024.toFixed(2);
  margebrute2025Cell.innerText = margebrut2025.toFixed(2);
  margebrute2026Cell.innerText = margebrut2026.toFixed(2);


  travauxcumulee2023Cell.innerText = (totalglobal * 0.25).toFixed(2);
  travauxcumulee2024Cell.innerText = (totalglobal * 0.50).toFixed(2);
  travauxcumulee2025Cell.innerText = (totalglobal * 0.75).toFixed(2);
  travauxcumulee2026Cell.innerText = (totalglobal).toFixed(2);



  //remplissage tbl retour sur investissement
  var mbcu2023 = 0
  var mbcu2024 = 0
  var mbcu2025 = 0
  var mbcu2026 = 0

  mbcu2023 =  margebrut2023;
  mbcu2024 =  mbcu2023 + margebrut2024;
  mbcu2025 =   margebrut2023 +margebrut2024 +margebrut2025;
  mbcu2026 = margebrut2023 +margebrut2024 +margebrut2025+ margebrut2026;

  margebrutcumule2023Cell.innerText = mbcu2023.toFixed(2)
  margebrutcumule2024Cell.innerText = mbcu2024.toFixed(2)
  margebrutcumule2025Cell.innerText = mbcu2025.toFixed(2)
  margebrutcumule2026Cell.innerText = mbcu2026.toFixed(2)


  magenetcumulee2023Cell.innerText = (mbcu2023 - (totalglobal * 0.25)).toFixed(2);
  magenetcumulee2024Cell.innerText = (mbcu2024 - (totalglobal * 0.50)).toFixed(2);
  magenetcumulee2025Cell.innerText = (mbcu2025 - (totalglobal * 0.75)).toFixed(2);
  magenetcumulee2026Cell.innerText = (mbcu2026 - (totalglobal)).toFixed(2);

  //remplissager retour su rinvestissement
  if (mbcu2026 != 0){
  tempsretourCell.innerText = (totalglobal * 48 / mbcu2026).toFixed(2);
  }


}
