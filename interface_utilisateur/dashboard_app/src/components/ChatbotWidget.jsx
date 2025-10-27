import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * -----------------
 * Intégration du chatbot (Rasa / Botpress)
 * Composant flottant avec iframe configurable
 *
 * Props :
 *  - botUrl : URL publique du chatbot hébergé (ex: "http://localhost:8080/webchat" ou Botpress Cloud)
 *  - title : titre affiché dans le widget
 */
const ChatbotWidget = ({
  botUrl = "http://localhost:8080/webchat",
  title = "Assistant Virtuel",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Bouton flottant d'ouverture */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        className={`fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl ${
          isOpen ? "hidden" : ""
        }`}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Fenêtre du chatbot */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white border rounded-2xl shadow-2xl flex flex-col"
          >
            {/* En-tête */}
            <div className="flex items-center justify-between bg-blue-600 text-white px-4 py-2 rounded-t-2xl">
              <h3 className="font-semibold">{title}</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-blue-700 p-1 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenu Chatbot (iframe) */}
            <iframe
              src={botUrl}
              title="Chatbot"
              className="w-full h-full rounded-b-2xl"
              style={{ border: "none" }}
              allow="microphone"
            ></iframe>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;
