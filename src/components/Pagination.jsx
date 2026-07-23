import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function Pagination({ currentPage = 1, totalPages = 1, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '32px' }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn btn-outline btn-sm btn-icon"
        style={{ opacity: currentPage === 1 ? 0.4 : 1 }}
      >
        <FiChevronLeft />
      </button>

      {[...Array(totalPages)].map((_, i) => {
        const pageNum = i + 1;
        const isActive = pageNum === currentPage;
        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline'}`}
            style={{ minWidth: '38px', padding: '8px' }}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn btn-outline btn-sm btn-icon"
        style={{ opacity: currentPage === totalPages ? 0.4 : 1 }}
      >
        <FiChevronRight />
      </button>
    </div>
  );
}
