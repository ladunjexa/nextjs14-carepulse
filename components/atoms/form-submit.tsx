import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

type FormSubmitProps = {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
};

const FormSubmit = ({ isLoading, className, children }: FormSubmitProps) => {
  return (
    <Button type="submit" disabled={isLoading} className={className ?? "shad-primary-btn w-full"}>
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src="/assets/icons/loader.svg"
            width={24}
            height={24}
            alt="loader"
            className="animate-spin"
          />{" "}
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default FormSubmit;
