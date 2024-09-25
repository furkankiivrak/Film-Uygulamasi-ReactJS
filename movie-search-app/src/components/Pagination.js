import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage, endPage;

    if (totalPages <= 6) {
      // Toplam sayfa sayısı 6 veya daha az ise tüm sayfaları göster
      startPage = 1;
      endPage = totalPages;
    } else {
      // Toplam sayfa sayısı 6'dan fazla ise
      startPage = Math.max(1, currentPage - 2);
      endPage = Math.min(totalPages, currentPage + 2);

      if (startPage === 1) {
        endPage = 6;
      } else if (endPage === totalPages) {
        startPage = totalPages - 5;
      }
    }

    // Sayfa numaralarını oluştur
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <ul className="pagination">
        {startPage > 1 && <li onClick={() => handlePageClick(1)}>1</li>}
        {startPage > 2 && <li>...</li>}
        {pageNumbers.map((page) => (
          <li
            key={page}
            className={page === currentPage ? 'active' : ''}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </li>
        ))}
        {endPage < totalPages - 1 && <li>...</li>}
        {endPage < totalPages && <li onClick={() => handlePageClick(totalPages)}>{totalPages}</li>}
      </ul>
    );
  };

  return <div>{renderPageNumbers()}</div>;
};

export default Pagination;
