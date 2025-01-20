import React, { createContext, useState, useContext } from 'react';

// Traductions disponibles
const translations = {
    en: {
        searchPlaceholder: 'Search for a product...',
        loading: 'Loading...',
        error: 'Error:',
        price: 'Price:',
        previous: 'Previous',
        next: 'Next',
        page: 'Page',
        of: 'of',
    },
    fr: {
        searchPlaceholder: 'Rechercher un produit...',
        loading: 'Chargement...',
        error: 'Erreur :',
        price: 'Prix :',
        previous: 'Précédent',
        next: 'Suivant',
        page: 'Page',
        of: 'sur',
    },
};

// Créer le contexte
export const LanguageContext = createContext();

// Provider pour le contexte
export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('fr'); // Langue par défaut : français

    const translate = (key) => translations[language][key] || key;

    return (
        <LanguageContext.Provider value={{ language, setLanguage, translate }}>
            {children}
        </LanguageContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte
export const useLanguage = () => useContext(LanguageContext);