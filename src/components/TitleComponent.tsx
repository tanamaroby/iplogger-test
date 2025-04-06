import { FC, PropsWithChildren } from "react";

interface TitleComponent extends PropsWithChildren {
  description?: string;
}

const TitleComponent: FC<TitleComponent> = ({ children, description }) => {
  return (
    <div className="flex flex-col gap-1 items-center justify-center p-4 text-center">
      <p className="text-2xl font-bold uppercase">{children}</p>
      {description && <p className="text-muted">{description}</p>}
    </div>
  );
};

export default TitleComponent;
