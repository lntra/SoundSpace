interface PlaceholderPropsProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
  size?: string;
  dark?: boolean;
}

const PlaceholderProps = ({
  dark,
  title,
  children,
  className,
  size,
  ...props
}: PlaceholderPropsProps) => {
  let defaultSizeStyle = `min-h-full`;

  if (size != null) {
    defaultSizeStyle = size;
  }

  return (
    <div
      className={`${defaultSizeStyle} ${
        dark ? "bg-gray-950 text-white" : "bg-white text-black"
      } rounded-[20px] border-[1px] border-sp-purpleBright2 p-3 ${className}`}
      {...props}
    >
      {title && (
        <div
          className={`flex-col justify-around p-3 align-middle ${
            dark ? "bg-gray-950 text-white" : "bg-white text-black"
          }
 font-Lato w-[100%] border-b-[1px] border-solid border-sp-purpleBright2 text-[24px] font-bold`}
        >
          {title}
        </div>
      )}
      <div className={className}>{children}</div>
    </div>
  );
};

export default PlaceholderProps;
