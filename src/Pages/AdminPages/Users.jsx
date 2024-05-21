import {
  MRT_GlobalFilterTextField,
  MRT_ShowHideColumnsButton,
  MRT_TablePagination,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
  MRT_ToolbarAlertBanner,
  useMaterialReactTable,
  MRT_TableContainer,
  MRT_ActionMenuItem,
} from "material-react-table";
import { IconButton, Box, Button, Typography, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv"; //or use your library of choice here
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Delete, Edit } from "@mui/icons-material";
import Navbar from "../../Components/Navbar";
import AdminSideBar from "../../Components/AdminSideBar";
import { useEffect, useState } from "react";

const handleExportData = () => {
  const csv = generateCsv(csvConfig)(data);
  download(csvConfig)(csv);
};

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const data: Person[] = [
  {
    name: {
      firstName: "John",
      lastName: "Doe",
    },
    address: "261 Erdman Ford",
    city: "East Daphne",
    state: "Kentucky",
  },
  {
    name: {
      firstName: "Jane",
      lastName: "Doe",
    },
    address: "769 Dominic Grove",
    city: "Columbus",
    state: "Ohio",
  },
  {
    name: {
      firstName: "Joe",
      lastName: "Doe",
    },
    address: "566 Brakus Inlet",
    city: "South Linda",
    state: "West Virginia",
  },
  {
    name: {
      firstName: "Kevin",
      lastName: "Vandy",
    },
    address: "722 Emie Stream",
    city: "Lincoln",
    state: "Nebraska",
  },
  {
    name: {
      firstName: "Joshua",
      lastName: "Rolluffs",
    },
    address: "32188 Larkin Turnpike",
    city: "Omaha",
    state: "Nebraska",
  },
  {
    name: {
      firstName: "John",
      lastName: "Doe",
    },
    address: "261 Erdman Ford",
    city: "East Daphne",
    state: "Kentucky",
  },
  {
    name: {
      firstName: "Jane",
      lastName: "Doe",
    },
    address: "769 Dominic Grove",
    city: "Columbus",
    state: "Ohio",
  },
  {
    name: {
      firstName: "Joe",
      lastName: "Doe",
    },
    address: "566 Brakus Inlet",
    city: "South Linda",
    state: "West Virginia",
  },
  {
    name: {
      firstName: "Kevin",
      lastName: "Vandy",
    },
    address: "722 Emie Stream",
    city: "Lincoln",
    state: "Nebraska",
  },
  {
    name: {
      firstName: "Joshua",
      lastName: "Rolluffs",
    },
    address: "32188 Larkin Turnpike",
    city: "Omaha",
    state: "Nebraska",
  },
  {
    name: {
      firstName: "John",
      lastName: "Doe",
    },
    address: "261 Erdman Ford",
    city: "East Daphne",
    state: "Kentucky",
  },
  {
    name: {
      firstName: "Jane",
      lastName: "Doe",
    },
    address: "769 Dominic Grove",
    city: "Columbus",
    state: "Ohio",
  },
  {
    name: {
      firstName: "Joe",
      lastName: "Doe",
    },
    address: "566 Brakus Inlet",
    city: "South Linda",
    state: "West Virginia",
  },
  {
    name: {
      firstName: "Kevin",
      lastName: "Vandy",
    },
    address: "722 Emie Stream",
    city: "Lincoln",
    state: "Nebraska",
  },
  {
    name: {
      firstName: "Joshua",
      lastName: "Rolluffs",
    },
    address: "32188 Larkin Turnpike",
    city: "Omaha",
    state: "Nebraska",
  },
  {
    name: {
      firstName: "John",
      lastName: "Doe",
    },
    address: "261 Erdman Ford",
    city: "East Daphne",
    state: "Kentucky",
  },
  {
    name: {
      firstName: "Jane",
      lastName: "Doe",
    },
    address: "769 Dominic Grove",
    city: "Columbus",
    state: "Ohio",
  },
  {
    name: {
      firstName: "Joe",
      lastName: "Doe",
    },
    address: "566 Brakus Inlet",
    city: "South Linda",
    state: "West Virginia",
  },
  {
    name: {
      firstName: "Kevin",
      lastName: "Vandy",
    },
    address: "722 Emie Stream",
    city: "Lincoln",
    state: "Nebraska",
  },
  {
    name: {
      firstName: "Joshua",
      lastName: "Rolluffs",
    },
    address: "32188 Larkin Turnpike",
    city: "Omaha",
    state: "Nebraska",
  },
];



const Example = () => {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 992);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 992);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const columns = [
    {
      accessorKey: "name.firstName",
      header: "First Name",
    },
    {
      accessorKey: "name.lastName",
      header: "Last Name",
    },
    {
      accessorKey: "city",
      header: "ORGANIZATION",
    },
    {
      accessorKey: "address",
      header: "EMAIL",
      Cell: ({ renderedCellValue, row }) => (
        <Link
          className="text-blue-500"
          to={`/superAdmin/vehiclesInfo/:reg_no/${row.original.address}`}
        >
          {renderedCellValue}
        </Link>
      ),
    },
    {
      accessorKey: "state",
      header: "TELEPHONE",
      Cell: ({ renderedCellValue, row }) => (
        <Link
          className="text-blue-500"
          to={`/superAdmin/vehiclesInfo/:reg_no/${row.original.state}`}
        >
          {renderedCellValue}
        </Link>
      ),
    },
    {
      accessorKey: "salary",
      header: "TAGS",
    },
  ];
  
  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    enableRowActions: true,
    initialState: { density: "compact", showGlobalFilter: true },

    renderRowActionMenuItems: ({ row }) => [
      <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
        icon={<Edit />}
        key="edit"
        label="Edit"
        onClick={() => console.info("Edit")}
        table={table}
      />,
      <MRT_ActionMenuItem
        icon={<Delete />}
        key="delete"
        label="Delete"
        onClick={() => console.info("Delete")}
        table={table}
      />,
    ],
  });

  return (
    <div className="block lg:flex xl:flex 2xl:flex h-[100vh]">
      {isWideScreen ? (
        <AdminSideBar className="position-fixed start-0 top-0 w-16 h-[100vh]" />
      ) : (
        <Navbar className="" />
      )}
      <div className="w-full overflow-y-scroll h-[100vh]">
        <Box sx={{ padding: "24px" }}>
          {/* Our Custom External Top Toolbar */}
          <Box
            sx={(theme) => ({
              display: "flex",
              backgroundColor: "inherit",
              borderRadius: "4px",
              flexDirection: "row",
              gap: "16px",
              justifyContent: "space-between",
              padding: "24px 16px",
              "@media max-width: 768px": {
                flexDirection: "column",
              },
            })}
          >
            <Box
              sx={(theme) => ({
                display: "flex",
                backgroundColor: "inherit",
                borderRadius: "4px",
                flexDirection: "row",
                gap: "14px",
                justifyContent: "space-between",
                padding: " 0px",
                "@media max-width: 768px": {
                  flexDirection: "column",
                },
              })}
            >
              <Typography
                sx={(theme) => ({
                  fontSize: "20px",
                  fontWeight: "semi-bold",
                  textAlign: "center",
                })}
              >
                <FontAwesomeIcon icon={faCircleUser} /> {"USERS"}
              </Typography>
              <button
                className="border p-2 text-sm text-white  hover"
                style={{ backgroundColor: "#00A176" }}
                onClick={() => {
                  alert("Add User");
                }}
              >
                <FontAwesomeIcon icon={faUsers} /> Send Invite Link
              </button>
              <Link
                className="border p-2 text-sm hover:bg-gray-200"
                to="/adduser"
              >
                <FontAwesomeIcon icon={faUserPlus} /> Add a User
              </Link>
              <MRT_GlobalFilterTextField table={table} />
            </Box>
            <Button
              //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
              onClick={handleExportData}
              startIcon={<FileDownloadIcon />}
            >
              Export All Data
            </Button>
          </Box>
          {/* The MRT Table with no toolbars built-in */}
          <MRT_TableContainer table={table} />
        </Box>
      </div>
    </div>
  );
};

export default Example;
