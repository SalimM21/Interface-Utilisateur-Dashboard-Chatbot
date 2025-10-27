// 🧭 Barre supérieure du Dashboard : logo, navigation, langue, profil utilisateur

import React, { useState } from "react";
import { Globe, UserCircle2, Menu, X } from "lucide-react";

const Header = ({ onLanguageChange }) => {
  const [lang, setLang] = useState("fr");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLangChange = (e) => {
    const newLang = e.target.value;
    setLang(newLang);
    onLanguageChange(newLang);
  };

  return (
    <header className="w-full bg-white shadow-md flex items-center justify-between px-6 py-3 sticky top-0 z-50">
      {/* === Logo & Titre === */}
      <div className="flex items-center gap-3">
        <img
          src="/assets/logo.png"
          alt="Logo"
          className="w-10 h-10 object-contain"
        />
        <h1 className="text-xl font-bold text-gray-800">
          Fraud & Scoring Dashboard
        </h1>
      </div>

      {/* === Navigation Desktop === */}
      <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
        <a href="/dashboard" className="hover:text-blue-600 transition">
          Tableau de bord
        </a>
        <a href="/alerts" className="hover:text-blue-600 transition">
          Alertes
        </a>
        <a href="/reports" className="hover:text-blue-600 transition">
          Rapports
        </a>
        <a href="/chatbot" className="hover:text-blue-600 transition">
          Chatbot
        </a>
      </nav>

      {/* === Actions === */}
      <div className="flex items-center gap-4">
        {/* Sélecteur de langue */}
        <div className="flex items-center gap-2 border rounded-md px-2 py-1">
          <Globe size={18} className="text-gray-500" />
          <select
            value={lang}
            onChange={handleLangChange}
            className="text-gray-700 bg-transparent outline-none"
          >
            <option value="fr">FR</option>
            <option value="en">EN</option>
          </select>
        </div>

        {/* Profil utilisateur */}
        <UserCircle2
          size={28}
          className="text-gray-600 hover:text-blue-600 cursor-pointer transition"
        />

        {/* Bouton menu mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-600 hover:text-blue-600"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* === Menu mobile === */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg border-t flex flex-col md:hidden">
          <a
            href="/dashboard"
            className="p-3 border-b hover:bg-gray-100 text-gray-700"
          >
            Tableau de bord
          </a>
          <a
            href="/alerts"
            className="p-3 border-b hover:bg-gray-100 text-gray-700"
          >
            Alertes
          </a>
          <a
            href="/reports"
            className="p-3 border-b hover:bg-gray-100 text-gray-700"
          >
            Rapports
          </a>
          <a
            href="/chatbot"
            className="p-3 hover:bg-gray-100 text-gray-700"
          >
            Chatbot
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
