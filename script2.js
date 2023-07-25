

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
  var totalPrix = 0.00;
  var valeur = 0.00;
  var prixtotalcell = document.getElementById("prixtotal");
  for (var i = 0; i < elementsPrix.length; i++) {
     valeur = parseFloat(elementsPrix[i].innerText.replace(/[^\d,.-]/g, '').replace(",", "."));
     console.log("valeur", valeur); 
    if (!isNaN(valeur)) {
      totalPrix += valeur;
      
    }
  }
  prixtotalcell.textContent = formatNumber(totalPrix,2);

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
  baliseTotal.textContent = total;

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
    //console.log(tempsclient)
    if ((totalpuissancecumulePayant * tempsclient / 60)>50) {
      var totalpuissancecumulePayant2023 = 50
      var totalpuissancecumulePayant2024 = 70
      var totalpuissancecumulePayant2025 = 80
      var totalpuissancecumulePayant2026 = 100
    } else {
      var totalpuissancecumulePayant2023 = totalpuissancecumulePayant * tempsclient /60
      var totalpuissancecumulePayant2024 = totalpuissancecumulePayant * tempsclient /60
      var totalpuissancecumulePayant2025 = totalpuissancecumulePayant * tempsclient /60
      var totalpuissancecumulePayant2026 = totalpuissancecumulePayant * tempsclient /60
    }
    document.getElementById("chargemoyenne2023").innerText = totalpuissancecumulePayant2023.toFixed(2);
    document.getElementById("chargemoyenne2024").innerText = totalpuissancecumulePayant2024.toFixed(2);
    document.getElementById("chargemoyenne2025").innerText = totalpuissancecumulePayant2025.toFixed(2);
    document.getElementById("chargemoyenne2026").innerText = totalpuissancecumulePayant2026.toFixed(2);



    baliseTotal.textContent = totalpointdecharges;
    baliseTotalAC.textContent = totalpointdechargesAC;
    baliseTotalDC.textContent = totalpointdechargesDC;
    baliseTotalACDC.textContent = totalpointdechargesACDC;


    var contrat1 = document.getElementById("contrat1");
    contrat1.innerText = ((totalpointdechargesAC * 300) + (totalpointdechargesDC * 500) + (totalpointdechargesACDC*600))*4 + "€";
    var DC = document.getElementById("DC");
    DC.innerText = (totalpointdechargesDC*16*12*4)+"€";
    var AC = document.getElementById("AC");
    AC.innerText = (totalpointdechargesAC*16*12*4)+"€";
    var ACDC = document.getElementById("AC DC");
    ACDC.innerText = (totalpointdechargesACDC*16*12*4)+"€";
    var Totaltout = document.getElementById("Totaltout");
    Totaltout.innerText = (totalpointdecharges*60)+"€";

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
  baliseTotal.textContent = totalPuissanceCumulee;
  
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
  prixvente2024Cell.innerText = formatNumber(prixvente2023,2);
  prixvente2025Cell.innerText = formatNumber(prixvente2023,2);
  prixvente2026Cell.innerText = formatNumber(prixvente2023,2);

  if (!isNaN(prixkwh) && !isNaN(prixvente2023)) {
    var marge2023 = prixvente2023 / prixkwh;
    marge2023Cell.innerText = formatNumber(marge2023,2);
    prixkwh2023Cell.innerText = formatNumber(prixkwh,3);
  }
  if (!isNaN(prixkwh2024) && !isNaN(prixvente2023)) {
    var marge2024 = prixvente2023 / prixkwh2024;
    marge2024Cell.innerText = formatNumber(marge2024,2);
    prixkwh2024Cell.innerText = formatNumber(prixkwh2024,3);
  }
  if (!isNaN(prixkwh2025) && !isNaN(prixvente2023)) {
    var marge2025 = prixvente2023 / prixkwh2025;
    marge2025Cell.innerText = formatNumber(marge2025,2);
    prixkwh2025Cell.innerText = formatNumber(prixkwh2025,3);
  }
  if (!isNaN(prixkwh2026) && !isNaN(prixvente2023)) {
    var marge2026 = prixvente2023 / prixkwh2026;
    marge2026Cell.innerText = formatNumber(marge2026,2);
    prixkwh2026Cell.innerText = formatNumber(prixkwh2026,3);
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
      var ajouttarif = document.getElementById("ajouttarif").value;

      if (ajouttarif === "NON") {
        tarifValue.innerHTML = "0 €";
        texttarif.innerHTML = "Pas de majoration";
      }
      else if (tarifSelect === "8000") {
        tarifValue.innerHTML = "8000 €";
        texttarif.innerHTML = "PDL ENEDIS Tarif Jaune *";
      } else if (tarifSelect === "15000") {
        tarifValue.innerHTML = "15000";
        texttarif.innerHTML = "PDL ENEDIS Tarif Bleu *";
      } else {
        tarifValue.innerHTML = "errore select tarif";
        texttarif.innerHTML = "errore select tarif";
      }
      
}


function calculglobal() {

  var elements = [
    parseFloat(document.getElementById("prixtotal").innerText.replace(/[^\d,.-]/g, '').replace(",", ".")),
    parseFloat(document.getElementById("tarifValue").innerText.replace(/[^\d,.-]/g, '').replace(",", ".")),
    parseFloat(document.getElementById("IRVE1").value),
    parseFloat(document.getElementById("IRVE2").value),
    parseFloat(document.getElementById("IRVE3").value),
    parseFloat(document.getElementById("IRVE4").value),
    parseFloat(document.getElementById("contrat1").innerText.replace(/[^\d,.-]/g, '').replace(",", ".")),
    parseFloat(document.getElementById("DC").innerText.replace(/[^\d,.-]/g, '').replace(",", ".")),
    parseFloat(document.getElementById("AC").innerText.replace(/[^\d,.-]/g, '').replace(",", ".")),
    parseFloat(document.getElementById("AC DC").innerText.replace(/[^\d,.-]/g, '').replace(",", ".")),
    parseFloat(document.getElementById("Totaltout").innerText.replace(/[^\d,.-]/g, '').replace(",", ".")),
  ]

  let total = 0;
  for (let elm of elements) {
    const val = parseFloat(elm)
    if (isNaN(val)) continue;
    total += val;
    console.log(total + " " + val);
  }

  document.getElementById("totalglobal").innerText = formatNumber(total,2);
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

}

function refrechfrequentation_nbdeclientparjours() {
  var frequentation2023Cell = document.getElementById("frequentation2023");
  var frequentation2024Cell = document.getElementById("frequentation2024");
  var frequentation2025Cell = document.getElementById("frequentation2025");
  var frequentation2026Cell = document.getElementById("frequentation2026");
  var nbclients = parseInt(document.getElementById("nbclients").value);
  //Part EV seul 202
  var frequentation2023 = (parseFloat(nbclients / 30) * 2 / 100).toFixed(0);
  var frequentation2024 = (parseFloat(nbclients / 30) * 4 / 100).toFixed(0);
  var frequentation2025 = (parseFloat(nbclients / 30) * 6 / 100).toFixed(0);
  var frequentation2026 = (parseFloat(nbclients / 30) * 9/ 100).toFixed(0);
  frequentation2023Cell.innerHTML = frequentation2023;
  frequentation2024Cell.innerHTML = frequentation2024;
  frequentation2025Cell.innerHTML = frequentation2025;
  frequentation2026Cell.innerHTML = frequentation2026;

  document.getElementById("nombredeclientjour2023").value = frequentation2023;
  document.getElementById("nombredeclientjour2024").value = frequentation2024;
  document.getElementById("nombredeclientjour2025").value = frequentation2025;
  document.getElementById("nombredeclientjour2026").value = frequentation2026;
  reload();
}


function remplissageTBLMargesParChargeUnitaire() {
  // Cellules à remplir
  var prixrevient2023Cell = document.getElementById("prixrevient2023");
  var prixrevient2024Cell = document.getElementById("prixrevient2024");
  var prixrevient2025Cell = document.getElementById("prixrevient2025");
  var prixrevient2026Cell = document.getElementById("prixrevient2026");

  // Cellules utilisées pour le calcul
  var prixkwh2023 = parseFloat(document.getElementById("prixkwh2023").innerText.replace(/[^\d,.-]/g, '').replace(",", "."));
  var prixkwh2024 = parseFloat(document.getElementById("prixkwh2024").innerText.replace(/[^\d,.-]/g, '').replace(",", "."));
  var prixkwh2025 = parseFloat(document.getElementById("prixkwh2025").innerText.replace(/[^\d,.-]/g, '').replace(",", "."));
  var prixkwh2026 = parseFloat(document.getElementById("prixkwh2026").innerText.replace(/[^\d,.-]/g, '').replace(",", "."));
  var chargemoyenne2023 = parseFloat(document.getElementById("chargemoyenne2023").innerText.replace(/[^\d,.-]/g, '').replace(",", "."));
  var chargemoyenne2024 = parseFloat(document.getElementById("chargemoyenne2024").innerText.replace(/[^\d,.-]/g, '').replace(",", "."));
  var chargemoyenne2025 = parseFloat(document.getElementById("chargemoyenne2025").innerText.replace(/[^\d,.-]/g, '').replace(",", "."));
  var chargemoyenne2026 = parseFloat(document.getElementById("chargemoyenne2026").innerText.replace(/[^\d,.-]/g, '').replace(",", "."));

  // Mes calculs
  prixrevient2023Cell.innerText = formatNumber((chargemoyenne2023 * prixkwh2023), 2);
  prixrevient2024Cell.innerText = formatNumber((chargemoyenne2024 * prixkwh2024),2);
  prixrevient2025Cell.innerText = formatNumber((chargemoyenne2025 * prixkwh2025),2);
  prixrevient2026Cell.innerText = formatNumber((chargemoyenne2026 * prixkwh2026),2);
  // Cellules à remplir
  var prixrevente2023Cell = document.getElementById("prixrevente2023");
  var prixrevente2024Cell = document.getElementById("prixrevente2024");
  var prixrevente2025Cell = document.getElementById("prixrevente2025");
  var prixrevente2026Cell = document.getElementById("prixrevente2026");
  var prixvente2023 = parseFloat(document.getElementById("prixvente2023").value);
  var prixvente2024 = parseFloat(document.getElementById("prixvente2024").innerText.replace(/[^\d,.-]/g, '').replace(",", "."));
  var prixvente2025 = parseFloat(document.getElementById("prixvente2025").innerText.replace(/[^\d,.-]/g, '').replace(",", "."));
  var prixvente2026 = parseFloat(document.getElementById("prixvente2026").innerText.replace(/[^\d,.-]/g, '').replace(",", "."));


  prixrevente2023Cell.innerText = formatNumber((prixvente2023 * chargemoyenne2023),2);
  prixrevente2024Cell.innerText = formatNumber((prixvente2024 * chargemoyenne2024),2);
  prixrevente2025Cell.innerText = formatNumber((prixvente2025 * chargemoyenne2025),2);
  prixrevente2026Cell.innerText = formatNumber((prixvente2026 * chargemoyenne2026),2);

  var margeunit2023Cell = document.getElementById("margeunit2023");
  var margeunit2024Cell = document.getElementById("margeunit2024");
  var margeunit2025Cell = document.getElementById("margeunit2025");
  var margeunit2026Cell = document.getElementById("margeunit2026");
  var prixrevente2023 = parseFloat(document.getElementById("prixrevente2023").innerText.replace(/[^\d,.-]/g, '').replace(",", "."));
  var prixrevente2024 = parseFloat(document.getElementById("prixrevente2024").innerText.replace(/[^\d,.-]/g, '').replace(",", "."));
  var prixrevente2025 = parseFloat(document.getElementById("prixrevente2025").innerText.replace(/[^\d,.-]/g, '').replace(",", "."));
  var prixrevente2026 = parseFloat(document.getElementById("prixrevente2026").innerText.replace(/[^\d,.-]/g, '').replace(",", "."));
  var prixrevient2023 = parseFloat(document.getElementById("prixrevient2023").innerText.replace(/[^\d,.-]/g, '').replace(",", "."));
  var prixrevient2024 = parseFloat(document.getElementById("prixrevient2024").innerText.replace(/[^\d,.-]/g, '').replace(",", "."));
  var prixrevient2025 = parseFloat(document.getElementById("prixrevient2025").innerText.replace(/[^\d,.-]/g, '').replace(",", "."));
  var prixrevient2026 = parseFloat(document.getElementById("prixrevient2026").innerText.replace(/[^\d,.-]/g, '').replace(",", "."));
  margeunit2023Cell.innerText = formatNumber((prixrevente2023 - prixrevient2023),2);
  margeunit2024Cell.innerText = formatNumber((prixrevente2024 - prixrevient2024),2);
  margeunit2025Cell.innerText = formatNumber((prixrevente2025 - prixrevient2025),2);
  margeunit2026Cell.innerText = formatNumber((prixrevente2026 - prixrevient2026),2);


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
  var prixrevente2023 = parseFloat(document.getElementById("prixrevente2023").innerText.replace(/[^\d,.-]/g, '').replace(",", "."));
  var prixrevente2024 = parseFloat(document.getElementById("prixrevente2024").innerText.replace(/[^\d,.-]/g, '').replace(",", "."));
  var prixrevente2025 = parseFloat(document.getElementById("prixrevente2025").innerText.replace(/[^\d,.-]/g, '').replace(",", "."));
  var prixrevente2026 = parseFloat(document.getElementById("prixrevente2026").innerText.replace(/[^\d,.-]/g, '').replace(",", "."));
  var margeunit2023 = parseFloat(document.getElementById("margeunit2023").innerText.replace(/[^\d,.-]/g, '').replace(",", "."));
  var margeunit2024 = parseFloat(document.getElementById("margeunit2024").innerText.replace(/[^\d,.-]/g, '').replace(",", "."));
  var margeunit2025 = parseFloat(document.getElementById("margeunit2025").innerText.replace(/[^\d,.-]/g, '').replace(",", "."));
  var margeunit2026 = parseFloat(document.getElementById("margeunit2026").innerText.replace(/[^\d,.-]/g, '').replace(",", "."));
  var nombredeclientjour2023 = parseInt(document.getElementById("nombredeclientjour2023").value);
  var nombredeclientjour2024 = parseInt(document.getElementById("nombredeclientjour2024").value);
  var nombredeclientjour2025 = parseInt(document.getElementById("nombredeclientjour2025").value);
  var nombredeclientjour2026 = parseInt(document.getElementById("nombredeclientjour2026").value);
  var totalglobal = parseFloat(document.getElementById("totalglobal").innerText.replace(/[^\d,.-]/g, '').replace(",", "."));

  var margeopera2023 = (margeunit2023 * nombredeclientjour2023*30*12)
  var margeopera2024 = (margeunit2024 * nombredeclientjour2024*30*12)
  var margeopera2025 = (margeunit2025 * nombredeclientjour2025*30*12)
  var margeopera2026 = (margeunit2026 * nombredeclientjour2026*30*12)

  var coutevmap2023 = (prixrevente2023 * nombredeclientjour2023*30*12*0.085);
  var coutevmap2024 = (prixrevente2024 * nombredeclientjour2024*30*12*0.085);
  var coutevmap2025 = (prixrevente2025 * nombredeclientjour2025*30*12*0.085);
  var coutevmap2026 = (prixrevente2026 * nombredeclientjour2026*30*12*0.085);

  //renvoie au cellules


  margeopera2023Cell.innerText = formatNumber(margeopera2023,2);
  margeopera2024Cell.innerText = formatNumber(margeopera2024,2);
  margeopera2025Cell.innerText = formatNumber(margeopera2025,2);
  margeopera2026Cell.innerText = formatNumber(margeopera2026,2);

  coutevmap2023Cell.innerText = formatNumber(coutevmap2023,2);
  coutevmap2024Cell.innerText = formatNumber(coutevmap2024,2);
  coutevmap2025Cell.innerText = formatNumber(coutevmap2025,2);
  coutevmap2026Cell.innerText = formatNumber(coutevmap2026,2);

  var margebrut2023 = (margeopera2023 - coutevmap2023)
  var margebrut2024 = (margeopera2024 - coutevmap2024)
  var margebrut2025 = (margeopera2025 - coutevmap2025)
  var margebrut2026 = (margeopera2026 - coutevmap2026)

  margebrute2023Cell.innerText = formatNumber(margebrut2023,2);
  margebrute2024Cell.innerText = formatNumber(margebrut2024,2);
  margebrute2025Cell.innerText = formatNumber(margebrut2025,2);
  margebrute2026Cell.innerText = formatNumber(margebrut2026,2);



  travauxcumulee2023Cell.innerText = formatNumber((totalglobal * 0.25),2);
  travauxcumulee2024Cell.innerText = formatNumber((totalglobal * 0.50),2);
  travauxcumulee2025Cell.innerText = formatNumber((totalglobal * 0.75),2);
  travauxcumulee2026Cell.innerText = formatNumber((totalglobal),2);

  //remplissage tbl retour sur investissement
  var mbcu2023 = 0
  var mbcu2024 = 0
  var mbcu2025 = 0
  var mbcu2026 = 0

  mbcu2023 =  margebrut2023;
  mbcu2024 =  mbcu2023 + margebrut2024;
  mbcu2025 =   margebrut2023 +margebrut2024 +margebrut2025;
  mbcu2026 = margebrut2023 +margebrut2024 +margebrut2025+ margebrut2026;

  margebrutcumule2023Cell.innerText = formatNumber(mbcu2023,2)
  margebrutcumule2024Cell.innerText = formatNumber(mbcu2024,2)
  margebrutcumule2025Cell.innerText = formatNumber(mbcu2025,2)
  margebrutcumule2026Cell.innerText = formatNumber(mbcu2026,2)


  magenetcumulee2023Cell.innerText = formatNumber((mbcu2023 - (totalglobal * 0.25)),2);
  magenetcumulee2024Cell.innerText = formatNumber((mbcu2024 - (totalglobal * 0.50)),2);
  magenetcumulee2025Cell.innerText = formatNumber((mbcu2025 - (totalglobal * 0.75)),2);
  magenetcumulee2026Cell.innerText = formatNumber((mbcu2026 - (totalglobal)),2);

  //colorisation des cellules
  const magnets = ["magnetcumulee2023", "magnetcumulee2024", "magnetcumulee2025", "magnetcumulee2026"];
  for (const magnet of magnets) {
    const magnetCumulee = document.getElementById(magnet);
    const magnetCumuleeValue = magnetCumulee.innerText.replace(/[^\d,.-]/g, '').replace(",", ".");
  
    if (magnetCumuleeValue > 0) {
      magnetCumulee.classList.add("text-green");
      magnetCumulee.classList.remove("text-red");
    } else {
      magnetCumulee.classList.add("text-red");
      magnetCumulee.classList.remove("text-green");
    }
  }

  //remplissager retour su rinvestissement
  if (mbcu2026 != 0){
  tempsretourCell.innerText = (totalglobal * 48 / mbcu2026).toFixed(2);
  }


}
