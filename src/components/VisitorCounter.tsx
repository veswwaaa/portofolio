import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

interface VisitorCounterProps {
  className?: string;
  variant?: 'badge' | 'footer' | 'minimal' | 'number-only';
}

const COUNTER_KEY = 'veswwaaa_portfolio_visits';
const HIT_ENDPOINT = `https://countapi.mileshilliard.com/api/v1/hit/${COUNTER_KEY}`;
const GET_ENDPOINT = `https://countapi.mileshilliard.com/api/v1/get/${COUNTER_KEY}`;

export const VisitorCounter: React.FC<VisitorCounterProps> = ({
  className = "",
  variant = 'badge'
}) => {
  const [views, setViews] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const hasVisited = sessionStorage.getItem('has_counted_visit');
        const endpoint = hasVisited ? GET_ENDPOINT : HIT_ENDPOINT;

        const res = await fetch(endpoint);
        if (!res.ok) throw new Error('Failed to fetch count');

        const data = await res.json();
        const count = typeof data.value === 'number' ? data.value : parseInt(data.value, 10);

        if (!isNaN(count)) {
          setViews(count);
          localStorage.setItem('cached_visitor_count', count.toString());
          if (!hasVisited) {
            sessionStorage.setItem('has_counted_visit', 'true');
          }
        }
      } catch (err) {
        console.warn('Visitor counter offline or blocked, using cache fallback:', err);
        const cached = localStorage.getItem('cached_visitor_count');
        if (cached) {
          setViews(parseInt(cached, 10));
        } else {
          setViews(1);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchViews();
  }, []);

  const formattedCount = views !== null ? views.toLocaleString() : "—";

  if (variant === 'number-only') {
    return (
      <span className={className}>
        {isLoading ? "..." : `${formattedCount}+`}
      </span>
    );
  }

  if (variant === 'minimal') {
    return (
      <span className={`inline-flex items-center gap-1.5 font-mono text-xs ${className}`}>
        <Eye size={12} className="text-accent-theme" />
        <span>{isLoading ? "..." : formattedCount} views</span>
      </span>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 border border-brutal bg-brutal font-mono text-xs uppercase tracking-wider text-brutal ${className}`}>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-theme opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-theme"></span>
        </span>
        <Eye size={13} className="text-brutal-muted" />
        <span className="text-brutal-muted">Total Kunjungan:</span>
        <span className="font-bold text-accent-theme">
          {isLoading ? "Memuat..." : `${formattedCount} Akses`}
        </span>
      </div>
    );
  }

  // default 'badge'
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 border border-brutal bg-brutal font-mono text-[11px] sm:text-xs uppercase tracking-wider text-brutal ${className}`}
      title="Jumlah pengunjung yang telah mengakses portofolio ini"
    >
      <Eye size={13} className="text-accent-theme" />
      <span className="text-brutal-muted">Akses Web:</span>
      <span className="font-bold text-brutal">
        {isLoading ? "..." : `${formattedCount} org`}
      </span>
    </div>
  );
};
