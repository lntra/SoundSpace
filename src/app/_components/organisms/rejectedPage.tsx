import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";

const RejectedPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
      bgcolor="rgba(0, 0, 0, 0.5)"
      position="fixed"
      top={0}
      left={0}
      zIndex={9999}
    >
      <Stack
        sx={{ color: "grey.100", width: "auto" }}
        spacing={2}
        direction="row"
      >
        <Alert variant="outlined" severity="error">
          <p className="text-red-400">Error: unvalid URL</p>
        </Alert>
      </Stack>
    </Box>
  );
};

export default RejectedPage;
