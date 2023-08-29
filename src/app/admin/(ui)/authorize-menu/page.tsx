"use client";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useQuery } from "@tanstack/react-query";
import { GetApplicationService } from "@/services/ApplicationService";
import { Box, Button } from "@mui/material";
import AddAuthRoleDialog from "@/components/CustomDialog/AuthorizationMenu/SetRole";

export default function ControlledAccordions() {
  const applicationServices = useQuery({
    queryKey: ["ApplicationServices"],
    queryFn: GetApplicationService,
  });
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [openRoleDialog, setOpenRoleDialog] = React.useState<boolean>(false);
  const [currentMenu, setCurrentMenu] = React.useState<{
    menu: string | null;
    code: string | null;
  }>({ menu: null, code: null });

  const handleSetRole = (menu: string, code: string) => {
    setCurrentMenu({ menu, code });
    setOpenRoleDialog(true);
  };

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      {applicationServices.data?.map((data, i) => (
        <Accordion
          expanded={expanded === data.name}
          onChange={handleChange(data.name)}
          key={i}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              {data.name}
            </Typography>
          </AccordionSummary>
          <hr style={{ color: "inherit", opacity: ".3" }} />

          <AccordionDetails>
            {data.actions?.map((actions, i) => (
              <>
                <Box key={i} sx={{ marginLeft: "2rem" }}>
                  <Button
                    variant="contained"
                    onClick={() => handleSetRole(data.name, actions.code)}
                  >
                    Rol Ata
                  </Button>
                  <Typography sx={{ display: "inline", marginLeft: "1rem" }}>
                    {data.name} - {actions.code}
                  </Typography>
                </Box>
                <hr style={{ color: "inherit", opacity: ".3" }} />
              </>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
      <AddAuthRoleDialog
        isOpen={openRoleDialog}
        setIsOpen={setOpenRoleDialog}
        onOk={() => {}}
        authorizeMenuId={"232"}
        currentMenu={currentMenu}
      />
    </div>
  );
}
