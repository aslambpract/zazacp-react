import { useEffect, useState } from "react";
import { useParams } from "react-router";
import usePagination from "src/components/pagination/usePagination";
import useErrors from "src/hooks/useErrors";
import axiosInstance from "src/utils/axios";

const PassingStatus = {
  open: "Open",
  overdue: "Overdue",
  inprogress: "In Progress",
  resolved: "Resolved",
  closed: "Closed",
  responded: "Responded",
};

const useTicketList = () => {
  const [ticketList, setTicketList] = useState([]);
  const handleErrors = useErrors();
  const { count, onChange, page, seed, rowStart } = usePagination();
  const { type } = useParams();
  const fetchTicketList = async (page = 1) => {
    try {
      const { data } = await axiosInstance(
        `api/admin/support-tickets?page=${page}`,
        {
          params: {
            status: PassingStatus[type],
          },
        }
      );
      const { status, data: tickets } = data;
      if (status) {
        const { last_page, data: list, from } = tickets;
        seed(last_page, from);
        setTicketList(list);
      } else {
        setTicketList([]);
      }
    } catch (err) {
      handleErrors(err);
    }
  };

  useEffect(() => {
    fetchTicketList(page);
  }, [page, type]);

  return { ticketList, fetchTicketList, count, onChange, page, rowStart };
};

export default useTicketList;
