export default function TrainTicket() {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-blue-600">
      {/* En-tête avec logo et info voyage */}
      <div className="bg-gray-100 p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">TRAIN EXPRESS</h1>
          <span className="text-xs text-gray-500">BOARDING PASS</span>
        </div>
      </div>

      {/* Corps du billet */}
      <div className="p-6">
        {/* Ligne de départ/arrivée */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-center">
            <p className="text-sm text-gray-500">Départ</p>
            <p className="text-2xl font-bold">PARIS</p>
            <p className="text-xs text-gray-500">Gare de Lyon</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            <span className="text-xs mt-1 text-gray-500">TGV 5432</span>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Arrivée</p>
            <p className="text-2xl font-bold">MARSEILLE</p>
            <p className="text-xs text-gray-500">Saint-Charles</p>
          </div>
        </div>

        {/* Détails du voyage */}
        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <div>
            <p className="text-gray-500">Date</p>
            <p className="font-medium">15 AOÛT 2025</p>
          </div>
          <div>
            <p className="text-gray-500">Heure</p>
            <p className="font-medium">08:45</p>
          </div>
          <div>
            <p className="text-gray-500">Place</p>
            <p className="font-medium">12A</p>
          </div>
          <div>
            <p className="text-gray-500">Wagon</p>
            <p className="font-medium">3</p>
          </div>
        </div>

        {/* Code-barres et QR Code (placeholder) */}
        <div className="border-t border-gray-200 pt-4">
          <div className="bg-gray-200 h-12 w-full mb-2 flex items-center justify-center text-xs text-gray-500">
            CODE-BARRES | 1234 5678 9012
          </div>
          <div className="bg-gray-200 h-24 w-24 mx-auto flex items-center justify-center text-xs text-gray-500">
            QR CODE
          </div>
        </div>
      </div>

      {/* Pied de page */}
      <div className="bg-gray-100 p-3 text-center text-xs text-gray-500">
        <p>Présentez ce billet à l'embarquement • Valide avec pièce d'identité</p>
      </div>
    </div>
  );
};

