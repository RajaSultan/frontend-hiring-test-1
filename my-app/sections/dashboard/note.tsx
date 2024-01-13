import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { CustomModal } from "@/components/custom-modal";
import { FormProvider, RHFTextField } from "@/components/rhf";
import { useNote } from "./use-note";

export function AddNote({ tableData }: any): JSX.Element {
  const {
    handleSubmit,
    onSubmit,
    methods,
    openModal,
    setOpenModal,
    isLoading,
  } = useNote(tableData);

  const data = [
    { name: "Call Type", value: tableData?.call_type },
    { name: "Duration", value: tableData?.duration },
    { name: "From", value: tableData?.from },
    { name: "To", value: tableData?.to },
    { name: "Via", value: tableData?.via },
  ];

  const NoteDetails = () => {
    return (
      <Stack spacing={1.5}>
        {data.map((item) => (
          <Box
            key={item.name}
            sx={{
              display: "flex",
              gap: 5,
            }}
          >
            <Typography variant="body2" fontWeight={600}>
              {item?.name}:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "primary.main",
              }}
            >
              {item?.value}
            </Typography>
          </Box>
        ))}
      </Stack>
    );
  };

  return (
    <>
      <Button
        size="small"
        onClick={() => {
          setOpenModal(true);
        }}
        variant="contained"
        sx={{
          py: 0.5,
          px: 1,
          backgroundColor: "#7b73fa",
          textTransform: "unset",
        }}
      >
        Add Note
      </Button>
      {openModal && (
        <CustomModal
          onClose={() => {
            setOpenModal(false);
          }}
          rootSx={{
            maxWidth: 600,
          }}
          headerLabel="Add Notes"
          headerSubLabel={`Call Id: ${tableData?.id}`}
          closeButtonProps={{
            onClick: () => {
              setOpenModal(false);
            },
          }}
          isOpen={openModal}
        >
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container px={1}>
              <Divider />
              <Grid item container xs={12} rowGap={2} sx={{ py: 2 }}>
                <Grid xs={12}>
                  <NoteDetails />
                </Grid>
                <Grid item xs={12}>
                  <RHFTextField
                    name="content"
                    outerLabel="Note"
                    placeholder="Add Note"
                    multiline
                    rows={3}
                  />
                </Grid>
              </Grid>
              <Divider />
              <Grid xs={12} item>
                <LoadingButton
                  loading={isLoading}
                  variant="contained"
                  color="primary"
                  size="small"
                  type="submit"
                  fullWidth={true}
                  sx={{ backgroundColor: "#7b73fa", py: 1 }}
                >
                  Save
                </LoadingButton>
              </Grid>
            </Grid>
          </FormProvider>
        </CustomModal>
      )}
    </>
  );
}
