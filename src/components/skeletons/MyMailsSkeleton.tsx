import { TableCell, TableRow } from "../ui/table";

const MyMailsSkeleton = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
          </TableCell>
          <TableCell>
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
          </TableCell>
          <TableCell>
            <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
          </TableCell>
          <TableCell>
            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse float-right"></div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default MyMailsSkeleton;
