import { DashboardColumns } from '@/pages/dashboard';
import type { Column } from '../interface';
export const TableHeader = ({
  columns,
}: {
  columns: { name: string; key: string }[];
}) => {
  const renderName = (name:string) => {
    if(name === DashboardColumns.TRAVEL){
      return <span>{name.split(' ')[0]} {name.split(' ')[1]}<br/>{name.split(' ')[2]}</span>
    } 
    if (name === DashboardColumns.REMOTE) {
      return <span>{name.split(' ')[0]}<br/>{name.split(' ')[1]}</span>
    }
    if(name === DashboardColumns.UNION_MEMBERSHIP){
      return <span>{name.split(' ')[0]}<br/>{name.split(' ')[1]}</span>
    }
    else return name
  }
      
  return (
    <thead>
      <tr>
        {columns.map(({ name, key }: Column) => (
          <th
            key={key}
            scope="col"
            className="px-6 py-4 text-dark text-left  border-primaryBlue border-b-2 whitespace-wrap w-auto overflow-x-hidden"
          >
            {renderName(name)}
          </th>
        ))}
      </tr>
    </thead>
  );
};
