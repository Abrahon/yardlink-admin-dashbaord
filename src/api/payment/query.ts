import { ExportFormat, PaymentsParams } from "@/types/payments";
import { useMutation, useQuery } from "@tanstack/react-query";
import { exportPayments, getPaymentKPIs, getPayments } from "./api";

export const useGetPayments = (
  params: PaymentsParams,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["payments", params],
    queryFn: () => getPayments(params),
    enabled: options?.enabled,
  });
};

export const useExportPayments = () => {
  return useMutation({
    mutationFn: ({
      params,
      format,
    }: {
      params: Omit<PaymentsParams, "page" | "page_size">;
      format: ExportFormat;
    }) => exportPayments(params, format),
  });
};

export const useGetPaymentKPIs = () => {
  return useQuery({
    queryKey: ["payment-kpis"],
    queryFn: getPaymentKPIs,
  });
};