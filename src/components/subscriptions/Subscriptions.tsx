'use client';

import React, { useState } from 'react';
import { EditIcon } from 'lucide-react';
// import { PageHeader } from '@/components/layout/PageHeader';
import { KpiCard } from '@/components/cards/KpiCard';
// import { SubscriptionsTable } from '@/components/tables/SubscriptionsTable';
// import { EditSubscriptionModal } from '@/components/modals/EditSubscriptionModal';
// import { ManagePlansModal } from '@/components/modals/ManagePlansModal';
import { Button } from '@/components/ui/Button';
import { subscriptions, summaryCards } from '../data/subscription';
import { SubscriptionsTable } from '../tables/SubscriptionTable';
import { EditSubscriptionModal } from '../modal/EditSubscriptionModal';
import { ManagePlansModal } from '../modal/ManagePlansModal';
// import { summaryCards, subscriptions } from '@/data/subscriptions';

export const Subscriptions = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [editModal, setEditModal] = useState<typeof subscriptions[0] | null>(null);
  const [managePlansModal, setManagePlansModal] = useState(false);

  const filteredSubs =
    activeFilter === 'all' || activeFilter === 'revenue'
      ? subscriptions
      : subscriptions.filter((s) => s.plan === activeFilter || s.status === activeFilter);

  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {summaryCards.map((card) => (
          <KpiCard
            key={card.filter}
            label={card.label}
            value={card.value}
            onClick={() => setActiveFilter(card.filter)}
            // className={activeFilter === card.filter ? 'border-blue-400 ring-2 ring-blue-100' : ''}
          />
        ))}
      </div>

      {/* Table Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-800">
          {activeFilter === 'all' ? 'All Subscriptions' : `Filtered: ${activeFilter}`}
          <span className="ml-2 text-sm font-normal text-slate-500">({filteredSubs.length} results)</span>
        </h3>
        <Button variant="secondary" icon={<EditIcon className="w-4 h-4" />} onClick={() => setManagePlansModal(true)}>
          Manage Plans
        </Button>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <SubscriptionsTable subscriptions={filteredSubs} onEdit={setEditModal} />
      </div>

      {/* Modals */}
      <EditSubscriptionModal
        isOpen={!!editModal}
        onClose={() => setEditModal(null)}
        subscription={editModal}
      />

      <ManagePlansModal
        isOpen={managePlansModal}
        onClose={() => setManagePlansModal(false)}
      />
    </div>
  );
};