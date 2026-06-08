import { useState } from "react";
import {
  EditIcon,
  CopyIcon,
  UsersIcon,
  Trash2Icon,
  PlusIcon,
  CheckIcon,
  XIcon,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { toast } from "@/components/ui/Toast";
import { useGetPlans, useUpdatePlan } from "@/api/subscription";
import { Plan } from "@/types/subscription";

export interface ManagePlansModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PlanForm {
  name: string;
  description: string;
  price: string;
  discount: string;
}

export const ManagePlansModal = ({
  isOpen,
  onClose,
}: ManagePlansModalProps) => {
  const { data: plansData, isLoading } = useGetPlans();
  const updatePlan = useUpdatePlan();
  const plans = plansData?.results ?? [];

  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<PlanForm>({
    name: "",
    description: "",
    price: "",
    discount: "",
  });

  const startEdit = (plan: Plan) => {
    setEditingId(plan.id);
    setForm({
      name: plan.name,
      description: plan.description,
      price: plan.price,
      discount: plan.discount,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleSave = (id: number) => {
    updatePlan.mutate(
      { id, payload: form },
      {
        onSuccess: () => {
          setEditingId(null);
          toast.success("Plan updated successfully");
        },
        onError: () => {
          toast.error("Failed to update plan");
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Manage Plans" size="lg">
      <div className="space-y-4">
        {isLoading && (
          <p className="text-sm text-slate-500 text-center py-4">
            Loading plans...
          </p>
        )}
        {!isLoading && plans.length === 0 && (
          <p className="text-sm text-slate-500 text-center py-4">
            No plans found.
          </p>
        )}
        {plans.map((plan) => (
          <div key={plan.id} className="border border-slate-200 rounded-xl p-5">
            {editingId === plan.id ? (
              <div className="space-y-3">
                <Input
                  label="Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                />
                <Textarea
                  label="Description"
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Price"
                    value={form.price}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, price: e.target.value }))
                    }
                  />
                  <Input
                    label="Discount"
                    value={form.discount}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, discount: e.target.value }))
                    }
                  />
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={<XIcon className="w-4 h-4" />}
                    onClick={cancelEdit}
                    disabled={updatePlan.isPending}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<CheckIcon className="w-4 h-4" />}
                    onClick={() => handleSave(plan.id)}
                    disabled={updatePlan.isPending}
                  >
                    {updatePlan.isPending ? "Saving..." : "Save"}
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-slate-800">
                      {plan.name}
                    </h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-blue-600 font-bold">
                        ${plan.final_price}
                      </span>
                      <span className="text-sm text-slate-500">
                        {plan.duration}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                      onClick={() => startEdit(plan)}
                    >
                      <EditIcon className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 text-slate-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Duplicate"
                    >
                      <CopyIcon className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 text-slate-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      title="Assign to Users"
                    >
                      <UsersIcon className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2Icon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {plan.features.map((f, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2 text-sm text-slate-600"
                    >
                      <CheckIcon className="w-3.5 h-3.5 text-green-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}
        <button className="w-full border-2 border-dashed border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-500 hover:text-blue-600 px-4 py-4 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
          <PlusIcon className="w-4 h-4" />
          Add New Plan
        </button>
      </div>
    </Modal>
  );
};
