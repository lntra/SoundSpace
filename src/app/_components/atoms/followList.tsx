import placeholder from "../../_components/assets/placeholder.png";
import Image from "next/image";

interface FollowListProps {
  src?: string;
  name: string;
}

const FollowListDEFAULT = ({ src, ...props }: FollowListProps) => {
  props.name = "@Community_X";

  return (
    <div className="min-h-max w-full flex-col gap-4 font-bold text-textNav">
      <div className="flex items-center border-b-[1px] border-solid border-sp-purpleBright2 p-2">
        {src && (
          <Image src={src} alt="Community Image" width={36} height={36} />
        )}
        {!src && (
          <>
            <div className="mr-2 h-[36px] w-[36px] overflow-hidden rounded-full border-[1px] border-solid border-sp-purpleBright2">
              <Image
                src={placeholder}
                alt="Community Image Placeholder"
                width={36}
                height={36}
                className="object-fit h-full w-full"
              />
            </div>
            <div>
              <p className="font-normal">{props.name}</p>
            </div>
          </>
        )}
      </div>
      <div className="flex items-center border-b-[1px] border-solid border-sp-purpleBright2 p-2">
        {src && (
          <Image src={src} alt="Community Image" width={36} height={36} />
        )}
        {!src && (
          <>
            <div className="mr-2 h-[36px] w-[36px] overflow-hidden rounded-full border-[1px] border-solid border-sp-purpleBright2">
              <Image
                src={placeholder}
                alt="Community Image Placeholder"
                width={36}
                height={36}
                className="object-fit h-full w-full"
              />
            </div>
            <div>
              <p className="font-normal">{props.name}</p>
            </div>
          </>
        )}
      </div>
      <div className="flex items-center border-b-[1px] border-solid border-sp-purpleBright2 p-2">
        {src && (
          <Image src={src} alt="Community Image" width={36} height={36} />
        )}
        {!src && (
          <>
            <div className="mr-2 h-[36px] w-[36px] overflow-hidden rounded-full border-[1px] border-solid border-sp-purpleBright2">
              <Image
                src={placeholder}
                alt="Community Image Placeholder"
                width={36}
                height={36}
                className="object-fit h-full w-full"
              />
            </div>
            <div>
              <p className="font-normal">{props.name}</p>
            </div>
          </>
        )}
      </div>
      <div className="flex items-center border-b-[1px] border-solid border-sp-purpleBright2 p-2">
        {src && (
          <Image src={src} alt="Community Image" width={36} height={36} />
        )}
        {!src && (
          <>
            <div className="mr-2 h-[36px] w-[36px] overflow-hidden rounded-full border-[1px] border-solid border-sp-purpleBright2">
              <Image
                src={placeholder}
                alt="Community Image Placeholder"
                width={36}
                height={36}
                className="object-fit h-full w-full"
              />
            </div>
            <div>
              <p className="font-normal">{props.name}</p>
            </div>
          </>
        )}
      </div>
      <div className="flex items-center border-b-[1px] border-solid border-sp-purpleBright2 p-2">
        {src && (
          <Image src={src} alt="Community Image" width={36} height={36} />
        )}
        {!src && (
          <>
            <div className="mr-2 h-[36px] w-[36px] overflow-hidden rounded-full border-[1px] border-solid border-sp-purpleBright2">
              <Image
                src={placeholder}
                alt="Community Image Placeholder"
                width={36}
                height={36}
                className="object-fit h-full w-full"
              />
            </div>
            <div>
              <p className="font-normal">{props.name}</p>
            </div>
          </>
        )}
      </div>
      <div className="flex items-center border-b-[1px] border-solid border-sp-purpleBright2 p-2">
        {src && (
          <Image src={src} alt="Community Image" width={36} height={36} />
        )}
        {!src && (
          <>
            <div className="mr-2 h-[36px] w-[36px] overflow-hidden rounded-full border-[1px] border-solid border-sp-purpleBright2">
              <Image
                src={placeholder}
                alt="Community Image Placeholder"
                width={36}
                height={36}
                className="object-fit h-full w-full"
              />
            </div>
            <div>
              <p className="font-normal">{props.name}</p>
            </div>
          </>
        )}
      </div>
      <div className="flex items-center border-b-[1px] border-solid border-sp-purpleBright2 p-2">
        {src && (
          <Image src={src} alt="Community Image" width={36} height={36} />
        )}
        {!src && (
          <>
            <div className="mr-2 h-[36px] w-[36px] overflow-hidden rounded-full border-[1px] border-solid border-sp-purpleBright2">
              <Image
                src={placeholder}
                alt="Community Image Placeholder"
                width={36}
                height={36}
                className="object-fit h-full w-full"
              />
            </div>
            <div>
              <p className="font-normal">{props.name}</p>
            </div>
          </>
        )}
      </div>
      <div className="flex items-center border-b-[1px] border-solid border-sp-purpleBright2 p-2">
        {src && (
          <Image src={src} alt="Community Image" width={36} height={36} />
        )}
        {!src && (
          <>
            <div className="mr-2 h-[36px] w-[36px] overflow-hidden rounded-full border-[1px] border-solid border-sp-purpleBright2">
              <Image
                src={placeholder}
                alt="Community Image Placeholder"
                width={36}
                height={36}
                className="object-fit h-full w-full"
              />
            </div>
            <div>
              <p className="font-normal">{props.name}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FollowListDEFAULT;
