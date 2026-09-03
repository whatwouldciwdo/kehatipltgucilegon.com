import React from 'react';
import { notFound } from 'next/navigation';
import { REPORTS_DATA } from '@/data/kehati-data';
import YearlyReportClient from '@/components/laporan/YearlyReportClient';

export function generateStaticParams() {
  return Object.keys(REPORTS_DATA).map((tahun) => ({
    tahun,
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

  if (isNaN(yearNum) || !REPORTS_DATA[yearNum]) {
    notFound();
  }

  return <YearlyReportClient yearNum={yearNum} />;
}
