// Navigation entre les pages de résultats

import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination() {
  return (
    <div className="flex justify-center  items-center gap-8 p-2 ">       
    <button className="flex items-center gap-2 text-black  ">
        <ChevronLeft className="w-5 h-5" />
        Précédent
      </button>
      {/* <button className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-500">
        <ChevronRight className="w-5 h-5" />
        Page suivante
      </button> */}
      <button className="flex items-center gap-2 text-black ">
        <ChevronRight className="w-5 h-5" />
        Suivant
      </button>
    </div>
  );
}

export default Pagination;  