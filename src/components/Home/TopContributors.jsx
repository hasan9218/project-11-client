import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const TopContributors = () => {

  const { data: contributors = [] } = useQuery({
    queryKey: ['topContributors'],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/top-contributors`
      );
      return res.data;
    }
  });

  return (
    <div className="bg-primary text-white p-8 mb-16">
      <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">

        {/* LEFT */}
        <div>
          <h2 className="text-3xl font-bold mb-2">
            Top Contributors of the Week
          </h2>
          <p className="text-sm opacity-90">
            Creators who shared the most valuable lessons.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-4">
          {contributors.map(user => (
            <div
              key={user.email}
              className="bg-white text-gray-800 rounded-xl p-3 flex items-center gap-4 shadow"
            >
              <img
                src={user.image}
                alt={user.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default TopContributors;
