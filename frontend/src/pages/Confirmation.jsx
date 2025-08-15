import { useLocation } from "react-router-dom";
import { FaTrain } from "react-icons/fa";
import { Link } from "react-router-dom";


function Confirmation() {
  const location = useLocation();
  const data = location.state;
  console.log(data);

  return (
  <div className="py-16 px-4 text-center  text-gray-600 bg-gradient-to-r from-blue-50 to-blue-500 dark:from-gray-900 dark:to-blue-900">
    <div className="max-w-md mx-auto mt-8 p-6 bg-gradient-to-r border rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
        Confirmation de Réservation
      </h1>
      <FaTrain className="text-6xl mx-auto mb-4 text-gray-800 dark:text-white" />
      <div className="flex justify-center px-4 py-2">
         <Link to="/recherche" state={data}>
       <button className="ml-4 px-4 py-2 bg-white text-blue-500 rounded flex justify-center">
         Modifier le trajet 
       </button>
     </Link>
      </div>
      <p><strong>Type de trajet :</strong> {data.typeTrajet}</p>
      <p><strong>Départ :</strong> {data.depart}</p>
      <p><strong>Destination :</strong> {data.destination}</p>
      <p><strong>Date aller :</strong> {data.dateAller}</p>
      {data.typeTrajet === "allerRetour" && (
        <p><strong>Date retour :</strong> {data.dateRetour}</p>
      )}
      <p><strong>Classe :</strong> {data.classe}</p>
      <p><strong>Place :</strong> {data.place}</p>
    </div>
    <div className="mt-8 flex justify-center">
      <Link to="/reservation" state={data}>
        <button className="px-4 py-2 bg-green-500 text-white rounded">
          Réserver
        </button>
      </Link>
      <Link to="/paiements" state={data}>
        <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded">
          Payer
        </button>
      </Link>
    </div>
  </div>
  );
}


export default Confirmation;
