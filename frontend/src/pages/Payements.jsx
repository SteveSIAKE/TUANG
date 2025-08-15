import { useState } from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";

export default function Payements() {
  const [modePaiement, setModePaiement] = useState("");
  const location = useLocation();
  const reservation = location.state;
  console.log(reservation);

  const genererBillet = () => {
    const doc = new jsPDF({
      unit: "mm",
      format: [100, 200],
      orientation: "landscape",
    });
    doc.setFont("monteserat", "bold");
    doc.setFontSize(18);
    doc.text("Billet de Train", 70, 20);

    doc.setFontSize(12);
    doc.text(`Type de trajet : ${reservation.typeTrajet}`, 20, 30);
    doc.text(`Départ : ${reservation.depart}`, 20, 40);
    doc.text(`Destination : ${reservation.destination}`, 20, 50);
    doc.text(`Date  aller : ${reservation.dateAller}`, 20, 60);
    doc.text(`Date  retour : ${reservation.dateRetour}`, 20, 70);
    doc.text(`Place : ${reservation.place}`, 20, 80);
    doc.text(`Prix : 50000FCFA`, 20, 90);
    doc.text(`Mode de paiement : ${modePaiement}`, 20, 100);
    window.open(doc.output("bloburl"), "_blank");
    
  };
  const payer = () => {
    if (!modePaiement) {
      alert("Veuillez choisir un mode de paiement !");
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
              {reservation.dateRetour && (
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
            {!modePaiement && (
              <p className="text-red-500">
                Veuillez sélectionner un mode de paiement.
              </p>
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
