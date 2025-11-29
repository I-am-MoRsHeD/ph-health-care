import { Column } from "@/components/shared/ManagementTable";
import { ISpecialty } from "@/types/specilities.interface";
import Image from "next/image";


export const SpecialitiesColumns: Column<ISpecialty>[] = [
    {
        header: "Icon",
        accessor: (speciality) => (
            <Image
                src={speciality.icon}
                alt={speciality.title}
                width={40}
                height={40}
                className="rounded-full"
            />
        )
    },
    {
        header: 'Title',
        accessor: (speciality) => speciality.title
    }
];