import React from 'react';
import { ActivityTimeline } from './ActivityTimeline';

export interface ActivityTabProps {
  timeline: Array<{
    type: string;
    date: string;
    description: string;
    status: string;
    icon: string;
  }>;
}

export const ActivityTab = ({ timeline }: ActivityTabProps) => {
  return (
    <div>
      <h4 className="font-semibold text-slate-800 mb-6">Activity Timeline</h4>
      <ActivityTimeline items={timeline} />
    </div>
  );
};