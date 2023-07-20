      // script envoie email-->

        document.getElementById("emailButton").addEventListener("click", function() {
          var borneschoisiElement = document.getElementById("bornes-souhaitees");
          var trElements = borneschoisiElement.getElementsByTagName("tr");
          var recipient = "contact@artixium.com";
          var subject = "Demande de devis Welborn";
          var body = "";
          body += 'Bonjour, \n\nJe souhaite recevoir un devis pour la solution Welborn ci dessous: \n\n';
          body += 'Référence |	Nb bornes |	Nb point par charge |	Type courant	| Type charge |	Puissance cumulée |	Prix \n';
          for (var i = 0; i < trElements.length; i++) {
            var tdElements = trElements[i].getElementsByTagName("td");
            for (var j = 0; j < tdElements.length; j++) {
              var tdText = tdElements[j].textContent;
              body += tdText.trim(); // Ajoute le texte du td sans espaces supplémentaires
          
              if (j < tdElements.length - 1) {
                body += " | "; // Ajoute le symbole "|" entre chaque td, sauf le dernier
              }
            }
            body += "\n";
          }
          body += 'Total borne souhaité : ' + document.getElementById("prixtotal").innerText + ' \n';
          body += 'Total Général : ' + document.getElementById("totalglobal").innerText + ' \n';
          body += '\n Informations complémentaires: \n\n';
          body += 'Nombre de clients mensuel: ' + document.getElementById("nbclients").value + '\n';
          body += 'Temps Moyen client: ' + document.getElementById("tempsclient").value + 'min \n';
          body += 'Tarif : ' + document.getElementById("tarif").value + ' \n';
          body += 'Prix du kWh : ' + document.getElementById("PrixKwh").value + 'mois \n\n';
          body += 'temps de retour sur investissement : ' + document.getElementById("tempsretour").value + ' \n';
          body += 'Cordialement, \n\n';

          var mailtoLink = "mailto:" + recipient + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
        
          window.open(mailtoLink);
        });
