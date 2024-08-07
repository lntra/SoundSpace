import placeholder from "../../_components/assets/placeholder.png";
import Image from "next/image"

interface FollowListProps {
    src?: string;
    name: string;
}

const FollowList = ({src, ...props }: FollowListProps) => {

    props.name = "@Community_X"

    return (
        <div className="flex-col text-textNav font-bold gap-4 w-full min-h-max">
            <p className="mt-2 text-[14px]">FOLLOWING</p>
            <div className="flex p-2 items-center border-solid border-b-[1px] border-sp-purpleBright2">
                {src && 
                    <Image
                        src={src}
                        alt="Community Image"
                        width={36}
                        height={36}
                    />
                }
                {!src &&
                    <>
                        <div className="w-[36px] h-[36px] mr-2 rounded-full overflow-hidden border-solid border-[1px] border-sp-purpleBright2">
                            <Image
                                src={placeholder}
                                alt="Community Image Placeholder"
                                width={36}
                                height={36}
                                className="object-fit w-full h-full"
                            />
                        </div>
                        <div>
                            <p className="font-normal">{props.name}</p>
                        </div>
                    </>
                }
            </div>
            <div className="flex p-2 items-center border-solid border-b-[1px] border-sp-purpleBright2">
                {src && 
                    <Image
                        src={src}
                        alt="Community Image"
                        width={36}
                        height={36}
                    />
                }
                {!src &&
                    <>
                        <div className="w-[36px] h-[36px] mr-2 rounded-full overflow-hidden border-solid border-[1px] border-sp-purpleBright2">
                            <Image
                                src={placeholder}
                                alt="Community Image Placeholder"
                                width={36}
                                height={36}
                                className="object-fit w-full h-full"
                            />
                        </div>
                        <div>
                            <p className="font-normal">{props.name}</p>
                        </div>
                    </>
                }
            </div>
            <div className="flex p-2 items-center border-solid border-b-[1px] border-sp-purpleBright2">
                {src && 
                    <Image
                        src={src}
                        alt="Community Image"
                        width={36}
                        height={36}
                    />
                }
                {!src &&
                    <>
                        <div className="w-[36px] h-[36px] mr-2 rounded-full overflow-hidden border-solid border-[1px] border-sp-purpleBright2">
                            <Image
                                src={placeholder}
                                alt="Community Image Placeholder"
                                width={36}
                                height={36}
                                className="object-fit w-full h-full"
                            />
                        </div>
                        <div>
                            <p className="font-normal">{props.name}</p>
                        </div>
                    </>
                }
            </div>
            <div className="flex p-2 items-center border-solid border-b-[1px] border-sp-purpleBright2">
                {src && 
                    <Image
                        src={src}
                        alt="Community Image"
                        width={36}
                        height={36}
                    />
                }
                {!src &&
                    <>
                        <div className="w-[36px] h-[36px] mr-2 rounded-full overflow-hidden border-solid border-[1px] border-sp-purpleBright2">
                            <Image
                                src={placeholder}
                                alt="Community Image Placeholder"
                                width={36}
                                height={36}
                                className="object-fit w-full h-full"
                            />
                        </div>
                        <div>
                            <p className="font-normal">{props.name}</p>
                        </div>
                    </>
                }
            </div>
            <div className="flex p-2 items-center border-solid border-b-[1px] border-sp-purpleBright2">
                {src && 
                    <Image
                        src={src}
                        alt="Community Image"
                        width={36}
                        height={36}
                    />
                }
                {!src &&
                    <>
                        <div className="w-[36px] h-[36px] mr-2 rounded-full overflow-hidden border-solid border-[1px] border-sp-purpleBright2">
                            <Image
                                src={placeholder}
                                alt="Community Image Placeholder"
                                width={36}
                                height={36}
                                className="object-fit w-full h-full"
                            />
                        </div>
                        <div>
                            <p className="font-normal">{props.name}</p>
                        </div>
                    </>
                }
            </div>
            <div className="flex p-2 items-center border-solid border-b-[1px] border-sp-purpleBright2">
                {src && 
                    <Image
                        src={src}
                        alt="Community Image"
                        width={36}
                        height={36}
                    />
                }
                {!src &&
                    <>
                        <div className="w-[36px] h-[36px] mr-2 rounded-full overflow-hidden border-solid border-[1px] border-sp-purpleBright2">
                            <Image
                                src={placeholder}
                                alt="Community Image Placeholder"
                                width={36}
                                height={36}
                                className="object-fit w-full h-full"
                            />
                        </div>
                        <div>
                            <p className="font-normal">{props.name}</p>
                        </div>
                    </>
                }
            </div>
            
            
        </div>
    );
}

export default FollowList