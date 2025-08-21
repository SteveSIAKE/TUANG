import { useState } from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";

export default function Payements() {
  const [modePaiement, setModePaiement] = useState("");
  const [errors,setErrors]= useState ({});
  const location = useLocation();
  const reservation = location.state;
  console.log(reservation);

  const genererBillet = () => {
    const doc = new jsPDF({
      unit: "mm",
      format: [100, 200],
      orientation: "landscape",
    });

    // Couleurs de la palette bleue
    const colors = {
      darkBlue: [13, 36, 85],
      mediumBlue: [25, 82, 159],
      lightBlue: [72, 149, 239],
      veryLightBlue: [207, 226, 243],
      white: [255, 255, 255]
    };

    // Fond dégradé bleu clair
    doc.setFillColor(...colors.veryLightBlue);
    doc.rect(0, 0, 200, 100, 'F');

    // Bandeau supérieur
    doc.setFillColor(...colors.darkBlue);
    doc.rect(0, 0, 200, 15, 'F');
    
    // titre principal
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(...colors.white);
    doc.text("Billet de Train", 100, 10, { align: "center" });

    // Carte principale
    doc.setFillColor(...colors.white);
    doc.setDrawColor(...colors.mediumBlue);
    doc.setLineWidth(0.5);
    doc.roundedRect(10, 20, 180, 70, 3, 3, 'FD');
    
    // Contenu du billet
    doc.setFontSize(12);
    doc.setTextColor(...colors.darkBlue);
    
    // Colonne gauche
    doc.setFont("helvetica", "bold");
    doc.text("Informations du voyage", 20, 30);
    
    doc.setFont("helvetica", "normal");
    doc.text(`• Type de trajet : ${reservation.typeTrajet}`, 20, 40);
    doc.text(`• Départ : ${reservation.depart}`, 20, 50);
    doc.text(`• Destination : ${reservation.destination}`, 20, 60);
    doc.text(`• Date aller : ${reservation.dateAller}`, 20, 70);
    
    if(reservation.typeTrajet === "allerRetour") {
        doc.text(`• Date retour : ${reservation.dateRetour}`, 20, 80);
        doc.text(`• Place : ${reservation.place}`, 20, 90);
    } else {
        doc.text(`• Place : ${reservation.place}`, 20, 80);
    }

    // Colonne droite
    doc.setFont("helvetica", "bold");
    doc.text("Informations de paiement", 110, 30);
    
    doc.setFont("helvetica", "normal");
    doc.text(`• Prix : 50 000 FCFA`, 110, 40);
    doc.text(`• Mode de paiement : ${modePaiement}`, 110, 50);
    
    // Code-barres ou QR Code (espace réservé)
    doc.setFillColor(...colors.lightBlue);
    doc.rect(110, 60, 70, 20, 'F');
    doc.setTextColor(...colors.darkBlue);
    doc.setFontSize(10);
    doc.text("QR Code", 145, 70, { align: "center" });

    // Pied de page
    doc.setFontSize(8);
    doc.setTextColor(...colors.mediumBlue);
    doc.text("Merci de voyager avec nous • TUANG : la plateforme rapide, fiable et 100% en ligne !.", 100, 95, { align: "center" });
    
    window.open(doc.output("bloburl"), "_blank");
};
  const payer = () => {
    const newErrors = {};
    // const validateMessage = {};
    if (!modePaiement) {
      newErrors.Payements= "Veuillez choisir un mode de paiement !";
      setErrors(newErrors);
      return;
    }
    alert(
      `Paiement effectué avec succès via ${
        modePaiement === "mtn" ? "MTN Mobile Money" : "Orange Money"
      }`
    );
    genererBillet();
  };

  return (
    <div className="py-16 px-4 text-center  text-gray-600 bg-gradient-to-r from-blue-50 to-blue-500 dark:from-gray-900 dark:to-blue-900">
      <div className="max-w-md mx-auto mt-8 p-6 bg-gradient-to-r border rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Paiement</h1>

        {reservation ? (
          <>
            <div className="bg-gray-50 p-4 rounded mb-6">
              <p><strong>Type de trajet :</strong> {reservation.typeTrajet}</p>
              <p><strong>Départ :</strong> {reservation.depart}</p>
              <p><strong>Destination :</strong> {reservation.destination}</p>
              <p><strong>Date  aller :</strong> {reservation.dateAller}</p>
              {reservation.typeTrajet === "allerRetour" && (
                <p><strong>Date de retour :</strong> {reservation.dateRetour}</p>
              )}
              <p><strong>Place :</strong> {reservation.place}</p>
              <p><strong>Prix :</strong> 50.000 FCFA</p>
            </div>

            <label className="block mb-2 font-semibold">
              Mode de paiement :
            </label>
            <select
              value={modePaiement}
              onChange={(e) => setModePaiement(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300 mb-4"
            >
              <option value="">-- Sélectionner --</option>
              <option value="mtn">MTN Mobile Money</option>
              <option value="orange">Orange Money</option>
            </select>
            {/* {!modePaiement && (
              <p className="text-red-500">
                Veuillez sélectionner un mode de paiement.
              </p>
            )} */}
             {errors.Payements && (
              <p className="text-red-500 text-sm mt-1">{errors.Payements}</p>
            )}

            <button
              onClick={payer}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            >
              Payer et Générer le Billet
            </button>
          </>
        ) : (
          <p className="text-center text-red-500">
            Aucune réservation trouvée.
          </p>
        )}
      </div>
    </div>
  );
}
