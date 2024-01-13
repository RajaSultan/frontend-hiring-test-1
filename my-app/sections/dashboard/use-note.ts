"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema, defaultValues } from "./schema";
import toast from "react-hot-toast";
import { useAddNoteMutation } from "@/services/dashboard/calls-api";
import React from "react";

export function useNote(tableData: any) {
  const [openModal, setOpenModal] = React.useState(false);
  //API HANDLERS
  const [postMutation, { isLoading }] = useAddNoteMutation();
  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = methods;

  async function onSubmit({ content }: any): Promise<any> {
    try {
      const { message } = await postMutation({
        body: {
          content,
        },
        params: {
          callId: tableData?.id,
        },
      }).unwrap();
      toast.success(message ?? "Note Added");
      setOpenModal(false);
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Error Occur");
    }
  }

  return {
    handleSubmit,
    onSubmit,
    methods,
    openModal,
    setOpenModal,
    isLoading,
  };
}
