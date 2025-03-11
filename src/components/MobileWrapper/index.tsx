import { FC, JSX } from "react";

const MobileWrapper: FC<{ children: JSX.Element | JSX.Element[] }> = ({
  children,
}) => {
  return <div className="max-w-md w-screen min-h-screen h-fit bg-white">{children}</div>;
};

export default MobileWrapper;
