import React, { useEffect, useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { getAllCustomers } from "../../services/customers";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateLocation } from "../../features/nonFunctional/nonFunctionalSlice";
import {
  updateAllCustomers,
  updateRefundStatusCache,
} from "../../features/room/roomSlice";
import {
  cancelBooking,
  confirmPostpaidBooking,
  getRefundStatus,
} from "../../services/booking";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "./Customers.css";

dayjs.extend(customParseFormat);

const Customers = () => {
  const roomRedux = useSelector((state) => state.roomReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchBookingId, setSearchBookingId] = useState("");

  async function fetchAllCustomers() {
    const data = await getAllCustomers();
    const refundCache = roomRedux.refundStatusCache;

    const finalArr = await Promise.all(
      data.map(async (item, i) => {
        let refundStatus = "N/A";
        const bookingId = item.bookingNumber;

        if (
          item?.status?.toLowerCase() === "cancelled" &&
          item?.paymentType?.toLowerCase() !== "postpaid"
        ) {
          if (refundCache[bookingId]) {
            refundStatus = refundCache[bookingId];
          } else {
            try {
              const refundRes = await getRefundStatus(bookingId);
              refundStatus = refundRes?.data?.refundStatus || "N/A";
              dispatch(
                updateRefundStatusCache({ bookingId, status: refundStatus })
              );
            } catch {
              refundStatus = "N/A";
            }
          }
        }

        return {
          id: i,
          index: i + 1,
          name: item.user.name,
          email: item.user.email,
          mobile: item.user.contactNumber,
          roomNumber: item.rooms?.map((i) => i.roomNumber).join(", "),
          roomType: [...new Set(item.rooms?.map((i) => i.roomType))].join(", "),
          checkIn: item.checkInDate,
          checkOut: item.checkOutDate,
          bookingStatus: item.status,
          paymentStatus:
            item.paymentType?.toLowerCase() === "postpaid" &&
            !item.paymentStatus
              ? "PENDING"
              : item.paymentStatus ?? "-",
          bookingType: item.paymentType,
          bookingNumber: bookingId,
          bookingSource: item.bookingSource,
          amountPaid:
            item.paymentStatus?.toLowerCase() === "paid"
              ? item.totalAmount
              : "-",
          refundStatus,
          noOfAdults: item.noOfAdults,
          noOfChilds: item.noOfChildrens,
          rooms: item.rooms,
        };
      })
    );

    dispatch(updateAllCustomers(finalArr));
  }

  useEffect(() => {
    fetchAllCustomers();
    dispatch(updateLocation(window.location.pathname));
  }, []);

  const handleCancelBooking = async (bookingNumber) => {
    try {
      const response = await cancelBooking(bookingNumber);
      if (response.status === 200) {
        toast.success("Booking cancelled successfully.");
        fetchAllCustomers();
      } else {
        toast.error(
          response?.message || response?.error || "Please try again later."
        );
      }
    } catch (error) {
      toast.error("Unable to cancel stay. Please try again later.");
    }
  };

  const handlePostpaidBooking = async (bookingNumber) => {
    try {
      const response = await confirmPostpaidBooking(bookingNumber);
      if (response.status === 200) {
        toast.success("Booking confirmed successfully.");
        fetchAllCustomers();
      } else {
        toast.error(
          response?.message || response?.error || "Please try again later."
        );
      }
    } catch (error) {
      toast.error("Unable to confirm stay. Please try again later.");
    }
  };

  const columns = [
    { field: "index", headerName: "#", width: 50 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "roomNumber", headerName: "Room No", width: 100 },
    { field: "roomType", headerName: "Room Type", width: 150 },
    { field: "bookingStatus", headerName: "Booking Status", width: 150 },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 150,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            color:
              params.value === "PAID"
                ? "green"
                : params.value === "PENDING"
                ? "orange"
                : "gray",
            fontWeight: "bold",
            marginTop: "15px",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    { field: "bookingType", headerName: "Booking Type", width: 150 },
    { field: "bookingNumber", headerName: "Booking ID", width: 150 },
    {
      field: "refundStatus",
      headerName: "Refund Status",
      width: 150,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            color:
              params?.value?.toLowerCase() === "processed"
                ? "green"
                : params?.value?.toLowerCase() === "pending"
                ? "orange"
                : "gray",
            fontWeight: "bold",
            marginTop: "15px",
          }}
        >
          {params.value?.toUpperCase()}
        </Typography>
      ),
    },
    { field: "checkIn", headerName: "Check In", width: 150 },
    { field: "checkOut", headerName: "Check Out", width: 150 },
    { field: "amountPaid", headerName: "Amount Paid", width: 150 },

    {
      field: "action",
      headerName: "Actions",
      width: 300,
      renderCell: (params) => {
        const today = dayjs().startOf("day");
        const now = dayjs();
        const checkInDate = dayjs(params.row.checkIn, "DD/MM/YYYY").startOf(
          "day"
        );
        const checkOutDate = dayjs(params.row.checkOut, "DD/MM/YYYY").startOf(
          "day"
        );
        const checkoutDeadline = checkOutDate.hour(12);

        const isCancelled =
          params?.row?.bookingStatus?.toLowerCase() === "cancelled";
        const isPostpaid = params.row.bookingType?.toLowerCase() === "postpaid";
        const isPrepaid = params.row.bookingType?.toLowerCase() === "prepaid";
        const isOffline =
          params.row.bookingType?.toLowerCase() === "offline" ||
          params.row.bookingSource?.toLowerCase() !== "own";
        const isPastCheckout = today.isAfter(checkOutDate);
        const isBeforeOrOnCheckIn =
          today.isSame(checkInDate) || today.isBefore(checkInDate);
        const isBeforeCheckIn = today.isBefore(checkInDate);
        const isBeforeCheckoutDeadline = now.isBefore(checkoutDeadline);
        const isPaymentPaid =
          !params.row.paymentStatus ||
          params.row.paymentStatus?.toLowerCase() === "pending"
            ? false
            : true;
        const isTripOngoing =
          now.isAfter(checkInDate) && now.isBefore(checkOutDate);

        if (isCancelled) return null;
        if (isPastCheckout) return null;
        // if (isOffline) return null;

        return (
          <>
            {
              // isBeforeCheckoutDeadline && (
              //   <Button
              //     variant="contained"
              //     color="primary"
              //     onClick={() =>
              //       navigate(`/customer-detail/${params.row.bookingNumber}`)
              //     }
              //   >
              //     Edit
              //   </Button>
              // )
            }
            {
              // isBeforeCheckIn && !isPaymentPaid &&
              !isPaymentPaid && !isTripOngoing && (
                <Button
                  variant="contained"
                  color="error"
                  sx={{ marginLeft: "5px" }}
                  onClick={() => handleCancelBooking(params.row.bookingNumber)}
                >
                  Cancel
                </Button>
              )
            }
            {(isPostpaid || isOffline) &&
              isBeforeOrOnCheckIn &&
              !isPaymentPaid &&
              !isTripOngoing &&
              !isPrepaid && (
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ marginLeft: "5px" }}
                  onClick={() =>
                    handlePostpaidBooking(params.row.bookingNumber)
                  }
                >
                  Confirm
                </Button>
              )}
          </>
        );
      },
    },
    // {
    //   field: "action",
    //   headerName: "Actions",
    //   width: 300,
    //   renderCell: (params) => {
    //     const today = dayjs().startOf("day");
    //     const checkInDate = dayjs(params.row.checkIn, "DD/MM/YYYY").startOf(
    //       "day"
    //     );
    //     const checkOutDate = dayjs(params.row.checkOut, "DD/MM/YYYY").startOf(
    //       "day"
    //     );

    //     const isCancelled =
    //       params?.row?.bookingStatus?.toLowerCase() === "cancelled";
    //     const isPostpaid = params.row.bookingType?.toLowerCase() === "postpaid";
    //     const isPastCheckout = today.isAfter(checkOutDate);
    //     const isBeforeOrOnCheckIn =
    //       today.isSame(checkInDate) || today.isBefore(checkInDate);

    //     if (isCancelled || isPastCheckout) return null;
    //     return (
    //       <>
    //         <Button
    //           variant="contained"
    //           color="primary"
    //           onClick={() =>
    //             navigate(`/customer-detail/${params.row.bookingNumber}`)
    //           }
    //         >
    //           Edit
    //         </Button>
    //         <Button
    //           variant="contained"
    //           color="error"
    //           sx={{ marginLeft: "5px" }}
    //           onClick={() => handleCancelBooking(params.row.bookingNumber)}
    //         >
    //           Cancel
    //         </Button>
    //         {isPostpaid && isBeforeOrOnCheckIn && (
    //           <Button
    //             variant="contained"
    //             color="secondary"
    //             sx={{ marginLeft: "5px" }}
    //             onClick={() => handlePostpaidBooking(params.row.bookingNumber)}
    //           >
    //             Confirm
    //           </Button>
    //         )}
    //       </>
    //     );
    //   },
    // },
  ];

  const filteredRows = roomRedux.allCustomers.filter((customer) =>
    customer?.bookingNumber
      ?.toString()
      .toLowerCase()
      .includes(searchBookingId?.toLowerCase())
  );

  const handleExportToExcel = () => {
    const exportData = roomRedux.allCustomers.map(({ id, ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "customers.xlsx");
  };

  return (
    <>
      <Box style={{ maxWidth: "90%", margin: "20px auto 0" }}>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            style={{
              color: "var(--sage)",
              fontSize: "25px",
              fontWeight: "bolder",
            }}
          >
            All Customers
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              label="Search by Booking ID"
              variant="outlined"
              size="small"
              value={searchBookingId}
              onChange={(e) => setSearchBookingId(e.target.value)}
              sx={{
                backgroundColor: "#fff",
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#fff",
                  "& fieldset": {
                    borderColor: "var(--sage)",
                  },
                  "&:hover fieldset": {
                    borderColor: "var(--sage)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--sage)",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "var(--sage)",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "var(--sage)",
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleExportToExcel}
              sx={{
                marginLeft: "10px",
                height: "40px",
                backgroundColor: "var(--sage)",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "var(--sage)",
                  opacity: 0.9,
                },
              }}
            >
              Export to Excel
            </Button>
          </Box>
        </Box>
        <Paper
          sx={{ width: "100%", height: 500, marginTop: "20px", boxShadow: 3 }}
        >
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSizeOptions={[10, 50, 100]}
            getRowClassName={(params) =>
              params.row.bookingStatus?.toLowerCase() === "cancelled"
                ? "cancelled-row"
                : ""
            }
            sx={{ border: 0 }}
          />
        </Paper>
      </Box>
    </>
  );
};

export default Customers;
