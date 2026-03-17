import {
  EditIcon,
  CopyIcon,
  UsersIcon,
  Trash2Icon,
  PlusIcon,
  CheckIcon,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { plans } from "../data/subscription";

export interface ManagePlansModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManagePlansModal = ({
  isOpen,
  onClose,
}: ManagePlansModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Manage Plans" size="lg">
      <div className="space-y-4">
        {plans.map((plan, i) => (
          <div key={i} className="border border-slate-200 rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-slate-800">{plan.name}</h4>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-blue-600 font-bold">{plan.price}</span>
                  <span className="text-sm text-slate-500">
                    {plan.duration}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit"
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
