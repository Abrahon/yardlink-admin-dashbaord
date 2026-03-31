/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExportFormat, PaymentKPIsResponse, PaymentsParams, PaymentsResponse } from "@/types/payments";
import { axios } from "@/lib/axios";
export const getPayments = async (
  params: PaymentsParams
): Promise<PaymentsResponse> => {
  // Clean up params - remove empty values
  const cleanParams: Record<string, any> = {
    page: params.page,
    page_size: params.page_size,
  };

  if (params.role) cleanParams.role = params.role;
  if (params.type) cleanParams.type = params.type;
  if (params.search && params.search.trim() !== "")
    cleanParams.search = params.search.trim();
  if (params.start_date) cleanParams.start_date = params.start_date;
  if (params.end_date) cleanParams.end_date = params.end_date;
  if (params.invoice_start_date)
    cleanParams.invoice_start_date = params.invoice_start_date;
  if (params.invoice_end_date)
    cleanParams.invoice_end_date = params.invoice_end_date;
  if (params.subscription_start_date)
    cleanParams.subscription_start_date = params.subscription_start_date;
  if (params.subscription_end_date)
    cleanParams.subscription_end_date = params.subscription_end_date;

  const { data } = await axios.get<PaymentsResponse>(
    "/admin/stripe/payments/",
    {
      params: cleanParams,
    }
  );

  return data;
};

export const exportPayments = async (
  params: Omit<PaymentsParams, "page" | "page_size">,
  format: ExportFormat
): Promise<Blob> => {
  const cleanParams: Record<string, any> = {};

  if (params.role) cleanParams.role = params.role;
  if (params.type) cleanParams.type = params.type;
  if (params.search && params.search.trim() !== "")
    cleanParams.search = params.search.trim();
  if (params.start_date) cleanParams.start_date = params.start_date;
  if (params.end_date) cleanParams.end_date = params.end_date;
  if (params.invoice_start_date)
    cleanParams.invoice_start_date = params.invoice_start_date;
  if (params.invoice_end_date)
    cleanParams.invoice_end_date = params.invoice_end_date;
  if (params.subscription_start_date)
    cleanParams.subscription_start_date = params.subscription_start_date;
  if (params.subscription_end_date)
    cleanParams.subscription_end_date = params.subscription_end_date;

  cleanParams.download = format;

  const { data } = await axios.get("/admin/stripe/payments/", {
    params: cleanParams,
    responseType: "blob",
  });

  return data;
};

export const getPaymentKPIs = async (): Promise<PaymentKPIsResponse> => {
  const { data } = await axios.get<PaymentKPIsResponse>("admin/transactions/stats/");
  return data;
};