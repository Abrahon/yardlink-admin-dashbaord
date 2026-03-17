import React, { useState } from "react";
import {
  ShieldIcon,
  SaveIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
} from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Toggle } from "@/components/ui/Toggle";

export interface AccountSettingsProps {
  adminName: string;
  adminEmail: string;
  currentPw: string;
  newPw: string;
  confirmPw: string;
  twoFactor: boolean;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onCurrentPwChange: (value: string) => void;
  onNewPwChange: (value: string) => void;
  onConfirmPwChange: (value: string) => void;
  onTwoFactorChange: (value: boolean) => void;
}

export const AccountSettings = ({
  adminName,
  adminEmail,
  currentPw,
  newPw,
  confirmPw,
  twoFactor,
  onNameChange,
  onEmailChange,
  onCurrentPwChange,
  onNewPwChange,
  onConfirmPwChange,
  onTwoFactorChange,
}: AccountSettingsProps) => {
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100 space-y-6">
      <h3 className="font-semibold text-slate-800 flex items-center gap-2">
        <ShieldIcon className="w-5 h-5 text-blue-600" />
        Account Settings
      </h3>

      {/* Profile */}
      <div>
        <h4 className="text-sm font-semibold text-slate-700 mb-3">
          Profile Information
        </h4>
        <div className="space-y-3">
          <Input
            label="Full Name"
            value={adminName}
            onChange={(e) => onNameChange(e.target.value)}
          />
          <Input
            label="Email Address"
            type="email"
            value={adminEmail}
            onChange={(e) => onEmailChange(e.target.value)}
          />
          <Button icon={<SaveIcon className="w-4 h-4" />}>Save Changes</Button>
        </div>
      </div>

      {/* Change Password */}
      <div className="border-t border-slate-100 pt-6">
        <h4 className="text-sm font-semibold text-slate-700 mb-3">
          Change Password
        </h4>
        <div className="space-y-3">
          <div className="relative">
            <Input
              label="Current Password"
              type={showCurrentPw ? "text" : "password"}
              value={currentPw}
              onChange={(e) => onCurrentPwChange(e.target.value)}
              placeholder="Enter current password"
              icon={
                <button
                  onClick={() => setShowCurrentPw(!showCurrentPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showCurrentPw ? (
                    <EyeOffIcon className="w-4 h-4" />
                  ) : (
                    <EyeIcon className="w-4 h-4" />
                  )}
                </button>
              }
              iconPosition="right"
            />
          </div>
          <div className="relative">
            <Input
              label="New Password"
              type={showNewPw ? "text" : "password"}
              value={newPw}
              onChange={(e) => onNewPwChange(e.target.value)}
              placeholder="Enter new password"
              icon={
                <button
                  onClick={() => setShowNewPw(!showNewPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showNewPw ? (
                    <EyeOffIcon className="w-4 h-4" />
                  ) : (
                    <EyeIcon className="w-4 h-4" />
                  )}
                </button>
              }
              iconPosition="right"
            />
          </div>
          <div className="relative">
            <Input
              label="Confirm New Password"
              type={showConfirmPw ? "text" : "password"}
              value={confirmPw}
              onChange={(e) => onConfirmPwChange(e.target.value)}
              placeholder="Confirm new password"
              icon={
                <button
                  onClick={() => setShowConfirmPw(!showConfirmPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPw ? (
                    <EyeOffIcon className="w-4 h-4" />
                  ) : (
                    <EyeIcon className="w-4 h-4" />
                  )}
                </button>
              }
              iconPosition="right"
            />
          </div>
          <Button icon={<LockIcon className="w-4 h-4" />}>
            Update Password
          </Button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="border-t border-slate-100 pt-6">
        <Toggle
          label="Two-Factor Authentication"
          description="Add extra security to your account"
          checked={twoFactor}
          onChange={onTwoFactorChange}
        />
        {twoFactor && (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700 font-medium">
              ✓ Two-factor authentication is enabled
            </p>
            <p className="text-xs text-blue-600 mt-0.5">
              Your account is protected with an additional security layer
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
