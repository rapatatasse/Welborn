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
    '<td class="marine ">  <select name="typechargeprix" id="typechargeprix" onchange="displayTarifValue()"> <option value="Payant"  >Payant</option><option value="Abonnement" >Abonnement</option></select> </td>' +
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

    calcultotalprix();
    calculerNombreBornesTotal();
    calculglobal();
    setChargeValue();
  });

  calcultotalprix();
  calculerNombreBornesTotal();
  calculglobal();
  initTypeCharge(newRow);
  setChargeValue();
}
 // bouton - sur tableau Nombre de bornes souhaités ?
function supprimerLigne(button) {
  var row = button.parentNode.parentNode;
  var table = row.parentNode;
  table.removeChild(row);
  calculerNombreBornesTotal();
  calcultotalprix();
  calculerNombreBornesTotal();
  calculglobal();
  setChargeValue();
  ;
}
