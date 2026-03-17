import { useState } from "react";
import { CheckIcon } from "lucide-react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";

interface Subscription {
  id: number;
  user: string;
  plan: string;
  amount: string;
}

export interface EditSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscription: Subscription | null;
}

export const EditSubscriptionModal = ({
  isOpen,
  onClose,
  subscription,
}: EditSubscriptionModalProps) => {
  const [selectedPlan, setSelectedPlan] = useState<"Basic" | "Pro">(
    (subscription?.plan as "Basic" | "Pro") || "Pro",
  );
  const [applyTiming, setApplyTiming] = useState<"immediate" | "next">(
    "immediate",
  );
  const [discount, setDiscount] = useState("");
  const [discountType, setDiscountType] = useState<"%" | "$">("%");
  const [trialDays, setTrialDays] = useState("");
  const [reason, setReason] = useState("");

  const basePrice = selectedPlan === "Pro" ? 49 : 19;
  const discountAmount = discount
    ? discountType === "%"
      ? (basePrice * parseFloat(discount)) / 100
      : parseFloat(discount)
    : 0;
  const adjustedPrice = Math.max(0, basePrice - discountAmount);

  if (!subscription) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit Subscription — ${subscription.user}`}
      footer={
        <div className="flex gap-3">
          <Button variant="secondary" onClick={onClose} fullWidth>
            Cancel
          </Button>
          <Button
            onClick={onClose}
            icon={<CheckIcon className="w-4 h-4" />}
            fullWidth
          >
            Save & Log Change
          </Button>
        </div>
      }
    >
      <div className="space-y-5">
        {/* Plan Selector */}
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-3">
            Select Plan
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(["Basic", "Pro"] as const).map((plan) => (
              <button
                key={plan}
                onClick={() => setSelectedPlan(plan)}
                className={`
                  p-4 rounded-xl border-2 text-left transition-all
                  ${
                    selectedPlan === plan
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 hover:border-slate-300"
                  }
                `}
              >
                <p className="font-semibold text-slate-800">{plan} Plan</p>
                <p className="text-sm text-blue-600 font-medium">
                  {plan === "Pro" ? "$49/mo" : "$19/mo"}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {plan === "Pro"
                    ? "All features included"
                    : "Essential features"}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Apply Timing */}
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-3">
            Apply Change
          </label>
          <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
            {(["immediate", "next"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setApplyTiming(t)}
                className={`
                  flex-1 py-2 rounded-md text-sm font-medium transition-colors
                  ${
                    applyTiming === t
                      ? "bg-white text-slate-800 shadow-sm"
                      : "text-slate-500"
                  }
                `}
              >
                {t === "immediate" ? "Immediately" : "Next Billing Cycle"}
              </button>
            ))}
          </div>
        </div>

        {/* Discount */}
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-2">
            Discount
          </label>
          <div className="flex gap-2">
            <Input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="0"
            />
            <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
              {(["%", "$"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setDiscountType(t)}
                  className={`
                    px-3 py-1 rounded-md text-sm font-medium transition-colors
                    ${
                      discountType === t
                        ? "bg-white text-slate-800 shadow-sm"
                        : "text-slate-500"
                    }
                  `}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Extend Trial */}
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-2">
            Extend Free Trial (days)
          </label>
          <Input
            type="number"
            value={trialDays}
            onChange={(e) => setTrialDays(e.target.value)}
            placeholder="0"
          />
        </div>

        {/* Reason */}
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-2">
            Reason for Change
          </label>
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Describe the reason for this change..."
            rows={3}
          />
        </div>

        {/* Price Preview */}
        <div className="bg-slate-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Current Price</span>
            <span className="text-sm font-semibold text-slate-800">
              {subscription.amount}/mo
            </span>
          </div>
          {discount && (
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Discount</span>
              <span className="text-sm font-semibold text-red-600">
                -${discountAmount.toFixed(2)}
              </span>
            </div>
          )}
          <div className="flex items-center justify-between pt-2 border-t border-slate-200">
            <span className="text-sm font-semibold text-slate-700">
              Adjusted Price
            </span>
            <span className="text-lg font-bold text-blue-600">
              ${adjustedPrice.toFixed(2)}/mo
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};
