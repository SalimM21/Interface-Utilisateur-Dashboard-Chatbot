import React from "react";
import { motion } from "framer-motion";

/**
 * ----------
 * Composant d'indicateur de chargement animé.
 * Utilisé pour indiquer à l’utilisateur qu’une action est en cours :
 *  - Chargement de données (API)
 *  - Rendu de graphique
 *  - Export en cours
 *
 * Props :
 *  - message : texte optionnel à afficher sous le spinner
 */
const Loader = ({ message = "Chargement en cours..." }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full py-10 text-center">
      {/* Spinner animé */}
      <motion.div
        className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />

      {/* Texte de chargement */}
      <p className="mt-4 text-gray-600 text-sm font-medium">{message}</p>
    </div>
  );
};

export default Loader;
