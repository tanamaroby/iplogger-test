import React, { PropsWithChildren } from "react";

interface DisclaimerComponentProps extends PropsWithChildren {}

const DisclaimerComponent: React.FC<DisclaimerComponentProps> = ({
  children,
}) => {
  return (
    <div className="container flex flex-col p-4 gap-2 items-center justify-center text-center border border-muted rounded-lg">
      <p className="text-red-500 uppercase font-semibold">Disclaimer</p>
      <p className="text-sm">{children}</p>
    </div>
  );
};

export default DisclaimerComponent;
