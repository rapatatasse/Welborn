
 // bouton + sur tableau QUELLE TYPE DE BORNE CHOISIR ?
function ajouterLigne(button) {
  var row = button.parentNode.parentNode ;
  var reference = row.cells[0].innerText;
  var nombrecharge = row.cells[4].innerText;
  var puissanceCumulee = row.cells[5].innerText;
  var typecharge = row.cells[2].innerText;
  var prix = row.cells[6].innerText;

  var tableContainer = document.querySelector('.choixborne');
  var table = tableContainer.querySelector('#bornes-souhaitees');
  var newRow = table.insertRow();

  newRow.innerHTML =
    '<td class="marine">' + reference + '</td>' +
    '<td class="marine"><input type="number" name="nombrebornes" min="0" max="10" value="1"  onKeyDown="return false"></td>' +
    '<td class="marine totalpoint" name="nombredecharge">' + nombrecharge + '</td>' +
    '<td class="marine">' + typecharge + '</td>' +
    '<td class="marine puissance_cumulee">' + puissanceCumulee + '</td>' +
    '<td class="marine prix">' + prix + '</td>';



  tableContainer.scrollTop = tableContainer.scrollHeight;

  // Ajouter le bouton de suppression à la nouvelle ligne
  var deleteButtonCell = newRow.insertCell();
  var deleteButton = document.createElement('button');
  deleteButton.className = 'delrow btn btn-danger';
  deleteButton.textContent = '-';
  deleteButton.addEventListener('click', function() {
    supprimerLigne(this);
  });
  deleteButtonCell.appendChild(deleteButton);

  newRow.querySelector("input").addEventListener("change", function() {
    var input = this;
    var totalPointCell = input.parentNode.nextElementSibling;
    var totalPuissanceCell = totalPointCell.nextElementSibling.nextElementSibling;
    var puissanceCumuleeCell = newRow.querySelector('.puissance_cumulee');
    var nombrecharge = parseInt(input.value);


    var nombreBornes = parseInt(input.value);
    calculerNombreBornesTotal();


    var puissanceCumulee = parseInt(puissanceCumuleeCell.innerText);
    totalPointCell.innerText = (nombreBornes * parseInt(nombrecharge)).toString();
    totalPuissanceCell.innerText = (nombreBornes * puissanceCumulee).toString();
  });
  calculerNombreBornesTotal();
}
 // bouton - sur tableau Nombre de bornes souhaités ?
function supprimerLigne(button) {
  var row = button.parentNode.parentNode;
  var table = row.parentNode;
  table.removeChild(row);
  calculerNombreBornesTotal();
  ;
}

// ecoutes des bouron + du tableau QUELLE TYPE DE BORNE CHOISIR ? ?
for (let btn of document.getElementsByClassName('addrow')) {

  btn.addEventListener('click', function() {
    ajouterLigne(btn);
  });
}


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



  // Mettre à jour le nombre total charges
  var elementspointdecharges = document.getElementsByName("nombredecharge");
  var totalpointdecharges = 0;

  for (var i = 0; i < elementspointdecharges.length; i++) {
    var valeur = parseInt(elementspointdecharges[i].textContent);
    if (!isNaN(valeur)) {
      totalpointdecharges += valeur;
    }
  }
  console.log(totalpointdecharges)

  var baliseTotal = document.getElementById("nombrechargetotal");
  baliseTotal.textContent = totalpointdecharges.toString();
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

}
//12/15/20

//calcul pour tableau Proposition de revente
var prixkwhInput = document.getElementById("PrixKwh");
var prixvente2023Input = document.getElementById("Prixvente2023");
prixkwhInput.addEventListener("change", updateMarge2023);
prixvente2023Input.addEventListener("change", updateMarge2023);





updateMarge2023();
