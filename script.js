function ajouterLigne(button) {
  var row = button.parentNode.parentNode;
  var reference = row.cells[1].innerText;
  var nombrecharge = row.cells[4].innerText;
  var puissanceCumulee = row.cells[5].innerText;
  var typecharge = row.cells[2].innerText;

  var tableContainer = document.querySelector('.choixborne');
  var table = tableContainer.querySelector('#bornes-souhaitees');
  var newRow = table.insertRow();

  newRow.innerHTML = '<td class="cell-none marine"></td>' +
    '<td class="marine">' + reference + '</td>' +
    '<td class="marine"><input type="number" name="nombrebornes" min="0" max="10" onKeyDown="return false"></td>' +
    '<td class="marine totalpoint">' + nombrecharge + '</td>' +
    '<td class="marine">' + typecharge + '</td>' +
    '<td class="marine puissance_cumulee">' + puissanceCumulee + '</td>';

  tableContainer.scrollTop = tableContainer.scrollHeight;

  // Ajouter le bouton de suppression à la nouvelle ligne
  var deleteButtonCell = newRow.insertCell();
  var deleteButton = document.createElement('button');
  deleteButton.className = 'delrow';
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

    var nombreBornes = parseInt(input.value);
    var puissanceCumulee = parseInt(puissanceCumuleeCell.innerText);
    totalPointCell.innerText = (nombreBornes * parseInt(nombrecharge)).toString();
    totalPuissanceCell.innerText = (nombreBornes * puissanceCumulee).toString();
  });
}

function supprimerLigne(button) {
  var row = button.parentNode.parentNode;
  var table = row.parentNode;
  table.removeChild(row);
}

for (let btn of document.getElementsByClassName('addrow')) {
  console.log(btn);
  btn.addEventListener('click', function() {
    ajouterLigne(btn);
  });
}
