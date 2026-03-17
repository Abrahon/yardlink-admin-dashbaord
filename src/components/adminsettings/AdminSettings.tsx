'use client';

import React, { useState } from 'react';
import {  DownloadIcon, SaveIcon, LockIcon } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
// import { AccountSettings } from '@/components/settings/AccountSettings';
// import { PermissionsTable } from '@/components/settings/PermissionsTable';
// import { AuditLogTable } from '@/components/tables/AuditLogTable';
import { Button } from '@/components/ui/Button';
import { SearchInput } from '@/components/ui/SearchInput';
import { auditLogs, initialManagerPerms, initialSupportPerms, permissions } from '../data/settings';
import { AuditLogTable } from '../tables/AuditLogTable';
import { AccountSettings } from '../settings/AccountSettings';
import { PermissionsTable } from '../settings/PermissionTable';
// import { auditLogs, permissions, initialManagerPerms, initialSupportPerms } from '@/data/settings';

export const AdminSettings = () => {
  const [twoFactor, setTwoFactor] = useState(false);
  const [adminName, setAdminName] = useState('Admin User');
  const [adminEmail, setAdminEmail] = useState('admin@yardlink.com');
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [auditSearch, setAuditSearch] = useState('');
  const [managerPerms, setManagerPerms] = useState(initialManagerPerms);
  const [supportPerms, setSupportPerms] = useState(initialSupportPerms);

  const filteredLogs = auditLogs.filter(
    (log) =>
      log.admin.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.action.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.target.toLowerCase().includes(auditSearch.toLowerCase())
  );

  // const handleExport = (format: string) => {
  //   console.log(`Exporting audit log as ${format}`);
  // };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Admin Settings"
        description="Manage account, permissions, and view audit logs"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Settings */}
        <AccountSettings
          adminName={adminName}
          adminEmail={adminEmail}
          currentPw={currentPw}
          newPw={newPw}
          confirmPw={confirmPw}
          twoFactor={twoFactor}
          onNameChange={setAdminName}
          onEmailChange={setAdminEmail}
          onCurrentPwChange={setCurrentPw}
          onNewPwChange={setNewPw}
          onConfirmPwChange={setConfirmPw}
          onTwoFactorChange={setTwoFactor}
        />

        {/* Roles & Permissions */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-6 flex items-center gap-2">
            <LockIcon className="w-5 h-5 text-blue-600" />
            Roles & Permissions
          </h3>
          <PermissionsTable
            permissions={permissions}
            managerPerms={managerPerms}
            supportPerms={supportPerms}
            onManagerChange={setManagerPerms}
            onSupportChange={setSupportPerms}
          />
          <div className="mt-4 pt-4 border-t border-slate-100">
            <Button icon={<SaveIcon className="w-4 h-4" />}>Save Permissions</Button>
          </div>
        </div>
      </div>

      {/* Audit Log */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-800">Audit Log</h3>
          <Button variant="secondary" icon={<DownloadIcon className="w-4 h-4" />}>
            Export Log
          </Button>
        </div>
        <div className="mb-4">
          <SearchInput
            value={auditSearch}
            onChange={(e) => setAuditSearch(e.target.value)}
            onClear={() => setAuditSearch('')}
            placeholder="Search audit log..."
          />
        </div>
        <AuditLogTable logs={filteredLogs} />
      </div>
    </div>
  );
};