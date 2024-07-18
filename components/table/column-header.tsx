import { ArrowUpDown } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Column, SortDirection } from "@tanstack/react-table";
import { Appointment } from "@/appwrite/types";

type ColumnHeaderProps = {
  column: Column<Appointment, unknown>;
  title: string;
  sortDirection?: SortDirection;
};

const ColumnHeader = ({ column, title, sortDirection = "asc" }: ColumnHeaderProps) => {
  const onSort = () => column.toggleSorting(column.getIsSorted() === sortDirection);

  return (
    <Button variant="ghost" onClick={onSort}>
      {title}
      <ArrowUpDown className="ml-2 size-4" />
    </Button>
  );
};

export default ColumnHeader;
