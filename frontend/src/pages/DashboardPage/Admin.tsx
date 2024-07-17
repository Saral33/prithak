import { getAdminDataService } from '@/api/services/userService';
import { useQuery } from 'react-query';

const Admin = () => {
  const { data, isLoading } = useQuery({
    queryKey: 'admin',
    queryFn: () => getAdminDataService().then((res) => res.data),
  });
  return (
    <div className="w-full p-8">
      <div className="max-w-[1100px] w-full mx-auto">
        <h1 className="md:text-4xl">Total Counts</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white shadow-lg">
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2">User Count</h2>
                <p>{data?.data?.userCount}</p>
              </div>
            </div>
            <div className="bg-white shadow-lg">
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2">Task Count</h2>
                <p>{data?.data?.taskCount}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
