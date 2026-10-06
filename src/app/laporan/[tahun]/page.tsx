import React from 'react';
import { notFound } from 'next/navigation';
import { OVERVIEW_YEARS } from '@/data/kehati-data';
import { getReportByYear } from '@/lib/supabase/kehati';
import YearlyReportClient from '@/components/laporan/YearlyReportClient';

export function generateStaticParams() {
  return OVERVIEW_YEARS.map((tahun) => ({
    tahun: String(tahun),
  }));
}

interface ReportPageProps {
  params: Promise<{
    tahun: string;
  }>;
}

export default async function YearlyReportPage({ params }: ReportPageProps) {
  const resolvedParams = await params;
  const yearNum = parseInt(resolvedParams.tahun, 10);

  if (isNaN(yearNum)) {
    notFound();
  }

  const [reportData, prevReportData] = await Promise.all([
    getReportByYear(yearNum),
    getReportByYear(yearNum - 1)
  ]);

  if (!reportData) {
    notFound();
  }

  return (
    <YearlyReportClient 
      yearNum={yearNum} 
      initialReportData={reportData} 
      initialPrevReportData={prevReportData ?? undefined} 
    />
  );
}
