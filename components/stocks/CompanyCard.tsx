import Link from 'next/link';
import { Building2, Users, Calendar } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import { Badge } from '@/components/ui';
import type { Company } from '@/lib/types';

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Link
      href={`/stocks/${company.symbol}`}
      className="block p-5 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-all hover:shadow-lg group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-white group-hover:text-emerald-500 transition-colors">
              {company.symbol}
            </h3>
            <Badge variant={company.is_active ? 'success' : 'default'}>
              {company.is_active ? 'Active' : 'Inactive'}
            </Badge>
          </div>
          <p className="text-sm text-zinc-400 line-clamp-1">{company.name}</p>
        </div>
      </div>

      <p className="text-sm text-zinc-500 line-clamp-2 mb-4">
        {company.description}
      </p>

      <div className="flex items-center gap-4 text-xs text-zinc-500">
        <div className="flex items-center gap-1">
          <Building2 className="w-3.5 h-3.5" />
          <span>{company.sector}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5" />
          <span>{formatNumber(company.employees)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          <span>{company.founded_year}</span>
        </div>
      </div>
    </Link>
  );
}
