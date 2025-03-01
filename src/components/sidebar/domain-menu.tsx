import Link from "next/link";
import Image from "next/image";

type Domain = {
    id: string;
    name: string;
    icon: string | null;
};

type Props = {
    domains: Domain[] | null | undefined;
};

const DomainMenu = ({ domains }: Props) => {
    return (
        <div className="flex flex-col gap-2">
            {domains?.map((domain) => (
                <Link
                    key={domain.id}
                    href={`/domains/${domain.id}`}
                    className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded"
                >
                    {domain.icon && (
                        <Image
                            src={domain.icon}
                            alt={domain.name}
                            width={24}
                            height={24}
                            className="rounded"
                        />
                    )}
                    <span className="text-sm">{domain.name}</span>
                </Link>
            ))}
        </div>
    );
};

export default DomainMenu;