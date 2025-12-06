import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pages = [];
  const maxPagesToShow = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-10 w-10"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      {startPage > 1 && (
        <>
          <Button
            variant="outline"
            onClick={() => onPageChange(1)}
            className="h-10 w-10"
          >
            1
          </Button>
          {startPage > 2 && (
            <span className="text-muted-foreground px-2">...</span>
          )}
        </>
      )}

      {pages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          onClick={() => onPageChange(page)}
          className="h-10 w-10"
        >
          {page}
        </Button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="text-muted-foreground px-2">...</span>
          )}
          <Button
            variant="outline"
            onClick={() => onPageChange(totalPages)}
            className="h-10 w-10"
          >
            {totalPages}
          </Button>
        </>
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-10 w-10"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default Pagination;
