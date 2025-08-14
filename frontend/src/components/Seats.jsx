import { FaChair } from "react-icons/fa";
import { useState } from "react";

export default function Seats() {
  const [selectedSeat, setSelectedSeat] = useState(null);

  return (
    <div className="grid grid-cols-4 gap-3 p-4">
      {[...Array(20)].map((_, i) => {
        const isSelected = selectedSeat === i + 1;
        return (
          <button
            key={i}
            type="button"
            onClick={() => setSelectedSeat(i + 1)}
            className={`p-3 border rounded-lg transition-all duration-200 flex flex-col items-center justify-center transform ${
              isSelected
                ? "bg-blue-500 text-white border-blue-500 scale-105 shadow-lg"
                : "bg-white/50 hover:bg-gray-100 hover:border-gray-300"
            }`}
          >
            <FaChair
              className={`text-2xl transition-colors duration-200 ${
                isSelected ? "text-white" : "text-gray-500"
              }`}
            />
            <span className="mt-1 text-sm font-medium">{i + 1}</span>
          </button>
        );
      })}
    </div>
  );
}
