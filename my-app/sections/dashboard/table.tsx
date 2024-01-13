"use client";
import { useState } from "react";
import { Box } from "@mui/material";
import { AddNote } from "./note";
import { useGetAllCallsQuery } from "@/services/dashboard/calls-api";
import { CustomTable } from "@/components/custom-table";
import { TableHeader } from "@/components/table-components";
import { CustomChip } from "@/components/custom-chip";

const tableHeader: any = [
  {
    type: "select",
    FieldProps: {
      name: "status",
      label: "Status",
    },
    options: [
      { label: "All", value: "all" },
      { label: "Archived", value: "archived" },
      { label: "UnArchived", value: "unArchived" },
    ],
  },
];

export function CallsTable(): JSX.Element {
  const [params, setParams] = useState<any>({
    limit: 10,
    page: 1,
    offset: 0,
  });

  function getVariant(status: boolean): any {
    if (status) {
      return "archived";
    } else {
      return "unArchived";
    }
  }
  const [otherParams, setOtherParams] = useState<any>();

  // API HANDLERS FOR CALL LIST
  const { data, isError, isFetching, isLoading, isSuccess } =
    useGetAllCallsQuery({
      params: {
        limit: params.limit,
        offset: params.offset,
        ...otherParams,
      },
    });

  function getCallTypeColor(callType: string): string {
    switch (callType) {
      case "missed":
        return "error.main";
      case "answered":
        return "success.main";
      default:
        return "primary.main";
    }
  }

  function getFormattedDuration(duration: number): string {
    const minutes = Math.floor(duration / 60);
    const seconds = duration - minutes * 60;

    return `${minutes}-Minutes ${seconds}-Seconds`;
  }

  const columns = [
    {
      accessorFn: (row: any) => row.call_type ?? "-",
      id: "callType",
      cell: (info: any) => (
        <Box sx={{ color: getCallTypeColor(info.getValue()) }}>
          {info.getValue() ?? "-"}
        </Box>
      ),
      header: () => <span>Call Type</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.direction ?? "-",
      id: "direction",
      cell: (info: any) => <Box>{info.getValue() ?? "-"}</Box>,
      header: () => <span>Direction</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.duration ?? "-",
      id: "duration",
      cell: (info: any) => (
        <>
          <Box>{getFormattedDuration(info.getValue())}</Box>
          <Box sx={{ color: "#7b73fa" }}>{`${info.getValue()} seconds`}</Box>
        </>
      ),
      header: () => <span>Duration</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.from ?? "-",
      id: "from",
      cell: (info: any) => info.getValue(),
      header: () => <span>From</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.to ?? "-",
      id: "to",
      cell: (info: any) => info.getValue(),
      header: () => <span>To</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.via ?? "-",
      id: "via",
      cell: (info: any) => info.getValue(),
      header: () => <span>Via</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.created_at ?? "-",
      id: "created_at",
      cell: (info: any) => new Date(info.getValue()).toLocaleDateString(),
      header: () => <span>Created At</span>,
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row.is_archived,
      id: "status",
      cell: (info: any) => (
        <Box sx={{ cursor: "pointer" }}>
          <CustomChip
            variant={getVariant(info.getValue())}
            ChipProps={{
              label: info.getValue() ? "Archived" : "UnArchived",
            }}
          />
        </Box>
      ),
      header: () => <span>Status</span>,
    },
    {
      accessorFn: (row: any) => row.a_id,
      id: "Actions",
      cell: (info: any) => (
        <Box>
          <AddNote tableData={info.row.original} />
        </Box>
      ),
      header: () => <span>Actions</span>,
    },
  ];

  return (
    <Box>
      <Box mb={2}>
        <TableHeader
          onChanged={(e) => {
            setOtherParams(e);
          }}
          tableHeaderData={tableHeader}
        />
      </Box>
      <CustomTable
        data={data?.nodes}
        columns={columns}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isSuccess={isSuccess}
        isPagination
        showSerialNo
        totalCount={data?.totalCount}
        totalPages={Math.ceil(data?.totalCount / params?.limit)}
        currentPage={params?.page}
        limit={params?.limit}
        onPageChange={(onPageData: any) => {
          setParams({
            ...params,
            page: onPageData,
            offset: (onPageData - 1) * 10,
          });
        }}
      />
    </Box>
  );
}
