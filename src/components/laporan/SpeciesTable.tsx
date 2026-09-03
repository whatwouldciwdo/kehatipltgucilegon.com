'use client';

import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Shield, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { SpeciesItem } from '@/data/kehati-data';

interface SpeciesTableProps {
  titleId: string;
  titleEn: string;
  subtitleId: string;
  subtitleEn: string;
  speciesList: SpeciesItem[];
  year: number;
  type: 'flora' | 'fauna';
}

export default function SpeciesTable({
  titleId,
  titleEn,
  subtitleId,
  subtitleEn,
  speciesList,
  year,
  type
}: SpeciesTableProps) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIUCN, setFilterIUCN] = useState<string>('ALL');
  const [isExpanded, setIsExpanded] = useState(false);

  // Filtered list
  const filteredList = speciesList.filter((item) => {
    const matchesSearch = 
      item.localName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.scientificName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesIUCN = 
      filterIUCN === 'ALL' ||
      (filterIUCN === 'PROTECTED' && (item.isProtectedIndo || item.iucn === 'CR' || item.iucn === 'EN' || item.iucn === 'VU')) ||
      item.iucn === filterIUCN;

    return matchesSearch && matchesIUCN;
  });

  const displayedList = isExpanded ? filteredList : filteredList.slice(0, 12);

  const getIUCNBadge = (iucn?: string, isProtected?: boolean) => {
    if (iucn === 'CR') {
      return <span className="iucn-badge cr">CR • {t('Kritis', 'Critically Endangered')}</span>;
    }
    if (iucn === 'EN') {
      return <span className="iucn-badge en">EN • {t('Terancam', 'Endangered')}</span>;
    }
    if (iucn === 'VU') {
      return <span className="iucn-badge vu">VU • {t('Rentan', 'Vulnerable')}</span>;
    }
    if (iucn === 'NT') {
      return <span className="iucn-badge nt">NT • {t('Hampir Terancam', 'Near Threatened')}</span>;
    }
    if (isProtected) {
      return <span className="iucn-badge protected">P.106 • {t('Dilindungi', 'Protected')}</span>;
    }
    return <span className="iucn-badge lc">LC • {t('Risiko Rendah', 'Least Concern')}</span>;
  };

  return (
    <div className="species-table-card" id={type}>
      <div className="table-card-header">
        <div>
          <h3 className="table-title">{t(titleId, titleEn)}</h3>
          <p className="table-subtitle">{t(subtitleId, subtitleEn)}</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="table-controls">
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder={t('Cari nama tanaman / hewan...', 'Search species name...')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <select
            value={filterIUCN}
            onChange={(e) => setFilterIUCN(e.target.value)}
            className="filter-select"
            aria-label="Filter status IUCN"
          >
            <option value="ALL">{t('Semua Status', 'All Status')}</option>
            <option value="PROTECTED">{t('Spesies Dilindungi / Prioritas', 'Protected / Priority Species')}</option>
            <option value="EN">Endangered (EN)</option>
            <option value="VU">Vulnerable (VU)</option>
            <option value="NT">Near Threatened (NT)</option>
            <option value="LC">Least Concern (LC)</option>
          </select>
        </div>
      </div>

      {/* Table Content */}
      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>No</th>
              <th>{t('Nama Lokal', 'Local Name')}</th>
              <th>{t('Nama Ilmiah / Latin', 'Scientific Name')}</th>
              <th>{t('Status Konservasi', 'Conservation Status')}</th>
              <th style={{ textAlign: 'right' }}>{t(`Jumlah (${year})`, `Count (${year})`)}</th>
            </tr>
          </thead>
          <tbody>
            {displayedList.length > 0 ? (
              displayedList.map((item, idx) => {
                const count = item.history[year.toString()] || '-';
                return (
                  <tr key={idx}>
                    <td className="text-muted">{idx + 1}</td>
                    <td className="font-semibold text-dark">{item.localName}</td>
                    <td className="italic-latin">{item.scientificName}</td>
                    <td>{getIUCNBadge(item.iucn, item.isProtectedIndo)}</td>
                    <td className="text-right font-bold text-dark">
                      {typeof count === 'number' ? `${count.toLocaleString('id-ID')} ${item.unit}` : count}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="empty-message">
                  {t('Tidak ada data spesies yang cocok dengan pencarian.', 'No species found matching the filter.')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Expand / Collapse Button */}
      {filteredList.length > 12 && (
        <div className="table-footer-action">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="btn-expand"
          >
            <span>
              {isExpanded
                ? t('Tampilkan Lebih Sedikit', 'Show Fewer Species')
                : t(`Tampilkan Semua ${filteredList.length} Spesies`, `Show All ${filteredList.length} Species`)}
            </span>
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      )}

      <style jsx>{`
        .species-table-card {
          background-color: #ffffff;
          border-radius: 24px;
          border: 1px solid var(--border-light, rgba(18, 44, 30, 0.08));
          padding: 2.5rem;
          margin-bottom: 3.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
        }

        .table-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .table-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--bg-dark-green, #122c1e);
          margin-bottom: 0.35rem;
        }

        .table-subtitle {
          font-size: 0.95rem;
          color: var(--text-muted, #57655e);
          margin: 0;
        }

        .table-controls {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          color: #9ca3af;
        }

        .search-input {
          padding: 0.55rem 1rem 0.55rem 2.25rem;
          border-radius: 10px;
          border: 1px solid var(--border-light, rgba(18, 44, 30, 0.15));
          font-size: 0.875rem;
          outline: none;
          min-width: 220px;
          transition: border-color 0.2s ease;
          background-color: var(--bg-cream, #faf9f6);
        }

        .search-input:focus {
          border-color: var(--primary-green, #2d6a4f);
          background-color: #ffffff;
        }

        .filter-select {
          padding: 0.55rem 1rem;
          border-radius: 10px;
          border: 1px solid var(--border-light, rgba(18, 44, 30, 0.15));
          font-size: 0.875rem;
          background-color: var(--bg-cream, #faf9f6);
          color: var(--text-dark, #1b2621);
          outline: none;
          cursor: pointer;
        }

        .table-responsive {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .custom-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.95rem;
        }

        .custom-table th {
          background-color: var(--bg-cream, #faf9f6);
          color: var(--bg-dark-green, #122c1e);
          font-weight: 700;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          padding: 1rem 1.25rem;
          border-bottom: 2px solid var(--border-light, rgba(18, 44, 30, 0.1));
        }

        .custom-table td {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--border-light, rgba(18, 44, 30, 0.06));
        }

        .custom-table tr:hover td {
          background-color: rgba(45, 106, 79, 0.03);
        }

        .italic-latin {
          font-style: italic;
          color: #4b5563;
        }

        .text-dark {
          color: var(--bg-dark-green, #122c1e);
        }

        .font-semibold {
          font-weight: 600;
        }

        .font-bold {
          font-weight: 700;
        }

        .text-right {
          text-align: right;
        }

        .text-muted {
          color: var(--text-muted, #57655e);
        }

        :global(.iucn-badge) {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.2rem 0.55rem;
          border-radius: 6px;
          letter-spacing: 0.02em;
        }

        :global(.iucn-badge.cr) {
          background-color: #fee2e2;
          color: #991b1b;
          border: 1px solid #f87171;
        }

        :global(.iucn-badge.en) {
          background-color: #ffedd5;
          color: #c2410c;
          border: 1px solid #fb923c;
        }

        :global(.iucn-badge.vu) {
          background-color: #fef3c7;
          color: #b45309;
          border: 1px solid #fcd34d;
        }

        :global(.iucn-badge.nt) {
          background-color: #fef9c3;
          color: #854d0e;
        }

        :global(.iucn-badge.lc) {
          background-color: #dcfce7;
          color: #166534;
        }

        :global(.iucn-badge.protected) {
          background-color: #ede9fe;
          color: #5b21b6;
          border: 1px solid #c4b5fd;
        }

        .empty-message {
          text-align: center;
          padding: 2.5rem !important;
          color: var(--text-muted, #57655e);
          font-style: italic;
        }

        .table-footer-action {
          display: flex;
          justify-content: center;
          margin-top: 1.5rem;
        }

        .btn-expand {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: var(--bg-cream, #faf9f6);
          color: var(--bg-dark-green, #122c1e);
          border: 1px solid var(--border-light, rgba(18, 44, 30, 0.12));
          padding: 0.65rem 1.5rem;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-expand:hover {
          background-color: var(--bg-dark-green, #122c1e);
          color: #ffffff;
          border-color: var(--bg-dark-green, #122c1e);
        }

        @media (max-width: 768px) {
          .species-table-card {
            padding: 1.75rem 1.25rem;
          }
          
          .search-input {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
