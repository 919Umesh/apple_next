'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loading, ErrorDisplay } from '@/components/ui';
import { CompanyCard, SectorFilter } from '@/components/stocks';
import { useCompanies, useCompaniesBySector, useSearchCompanies } from '@/lib/hooks/useQueries';

function StocksContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  // Use different query based on context
  const allCompaniesQuery = useCompanies();
  const sectorQuery = useCompaniesBySector(selectedSector || '', 50, 0);
  const searchResult = useSearchCompanies(searchQuery);

  // Determine which data to show
  const isSearching = searchQuery.length > 0;
  const isSectorFiltered = selectedSector !== null;

  const { data, isLoading, error, refetch } = isSearching
    ? searchResult
    : isSectorFiltered
    ? sectorQuery
    : allCompaniesQuery;

  const companies = isSearching
    ? searchResult.data?.companies
    : isSectorFiltered
    ? sectorQuery.data?.companies
    : allCompaniesQuery.data?.companies;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          {isSearching ? `Search: "${searchQuery}"` : 'All Stocks'}
        </h1>
        <p className="text-zinc-400">
          Browse and explore companies listed on the exchange
        </p>
      </div>

      {/* Sector filter */}
      {!isSearching && (
        <SectorFilter selected={selectedSector} onSelect={setSelectedSector} />
      )}

      {/* Loading state */}
      {isLoading && <Loading message="Loading companies..." />}

      {/* Error state */}
      {error && (
        <ErrorDisplay
          message="Failed to load companies"
          onRetry={() => refetch()}
        />
      )}

      {/* Results */}
      {!isLoading && !error && (
        <>
          {companies && companies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {companies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-zinc-500">
                {isSearching
                  ? 'No companies found matching your search.'
                  : 'No companies available.'}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function StocksPage() {
  return (
    <Suspense fallback={<Loading message="Loading stocks..." />}>
      <StocksContent />
    </Suspense>
  );
}
