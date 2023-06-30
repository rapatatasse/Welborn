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
  newRow.classList.add("selectedRows")

  newRow.innerHTML =
    '<td class="marine" >' + reference + '</td>' +
    '<td class="marine textright" ><input type="number" name="nombrebornes" min="0" max="10" value="1" data-point-charge="'+nombrecharge+'" data-puissance="'+puissanceCumulee+'" data-prix="'+prix+'" onKeyDown="return false"></td>' +
    '<td class="marine textright totalpoint" name="nombredecharge">' + nombrecharge + '</td>' +
    '<td class="marine ">' + typecharge + '</td>' +
    '<td class="marine ">  <select name="typechargeprix" id="typechargeprix" onchange="displayTarifValue()"> <option value="Payant">Payant</option><option value="Abonnement" >Abonnement</option></select> </td>' +
    '<td class="marine  textright puissance_cumulee ">' + puissanceCumulee + '</td>' +
    '<td class="marine textright prix">' + prix + '</td>';

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

    var nombreBornes = parseInt(input.value);
    rowpointdecharge = parseInt(input.getAttribute("data-point-charge"));
    rowpuissance = parseInt(input.getAttribute("data-point-charge"));
    rowprix = parseFloat(input.getAttribute("data-prix"));


    //var totalPointCell = input.parentNode.nextElementSibling;
    var totalPointchargeCell = newRow.querySelector('.totalpoint');
    var puissanceCumuleeCell = newRow.querySelector('.puissance_cumulee');
    var totalprixCell = newRow.querySelector('.prix');

    var nombrecharges = rowpointdecharge * nombreBornes;
    totalPointchargeCell.innerText = nombrecharges;
    puissanceCumuleeCell.innerText = nombreBornes * puissanceCumulee;
    totalprixCell.innerText =  (rowprix * nombreBornes).toFixed(2)


    reload();

  });

  reload();
  initTypeCharge(newRow);

}


 // bouton - sur tableau Nombre de bornes souhaités ?
function supprimerLigne(button) {
  var row = button.parentNode.parentNode;
  var table = row.parentNode;
  table.removeChild(row);

  reload();

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


function reload() {
  console.log("reload function")
  updateMarge2023();
  calcultotalprix();
  calculerNombreBornesTotal();
  calculglobal();
  remplissageTBLpotentielannuel();
  displayTarifValue();
  remplissageTBLMargesParChargeUnitaire();
  remplissageTBLMargesAnnuelle();


}



reload();
