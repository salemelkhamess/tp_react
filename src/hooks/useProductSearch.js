import { useState, useEffect } from 'react';

const useProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // Produits filtrés
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); // Terme de recherche

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.daaif.net/products?delay=1000&page=${page}`);
      if (!response.ok) throw new Error('Erreur réseau');
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(data.totalPages); // Supposons que l'API retourne le nombre total de pages
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filtrer les produits en fonction du terme de recherche
  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter(product =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // Si aucun terme de recherche, afficher tous les produits
    }
  }, [searchTerm, products]);

  // Recharger les produits
  const reloadProducts = () => {
    fetchProducts(currentPage);
  };

  // Aller à la page suivante
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      fetchProducts(currentPage + 1);
    }
  };

  // Aller à la page précédente
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      fetchProducts(currentPage - 1);
    }
  };

  // Mettre à jour le terme de recherche
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Charger les produits au montage du composant ou lors du changement de page
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  return {
    products: filteredProducts, // Retourner les produits filtrés
    loading,
    error,
    reloadProducts,
    currentPage,
    totalPages,
    nextPage,
    previousPage,
    handleSearch // Retourner la fonction pour gérer la recherche
  };
};

export default useProductSearch;