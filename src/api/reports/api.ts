import { axios } from "@/lib/axios";
import { DashboardResponse } from "@/types/reports";

export interface DashboardParams {
  range?: "weekly" | "monthly" | "yearly" | "custom";
  start_date?: string;
  end_date?: string;
  export?: "csv" | "xlsx";
}

export const getDashboardReport = async (
  params: DashboardParams
): Promise<DashboardResponse> => {
  const { data } = await axios.get<DashboardResponse>(
    "/admin/report/dashboard/",
    {
      params,
    }
  );

  return data;
};

export const exportDashboardReport = async (params: DashboardParams) => {
  const response = await axios.get("/admin/report/dashboard/", {
    params,
    responseType: "blob",
  });

  const blob = new Blob([response.data]);
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `dashboard-report.${params.export}`;
  link.click();

  window.URL.revokeObjectURL(url);
};