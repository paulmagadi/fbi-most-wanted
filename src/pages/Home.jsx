import React, { useEffect, useState } from 'react';
import { getAllMostWanted } from '../api/fbi';
import { Link } from 'react-router-dom';

const ITEMS_PER_PAGE = 12;

const Home = () => {
  const [allFugitives, setAllFugitives] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true);
      const data = await getAllMostWanted();
      setAllFugitives(data);
      setFiltered(data);
      setIsLoading(false);
    };

    fetchAll();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const results = allFugitives.filter(person =>
      person.title.toLowerCase().includes(term) ||
      (person.description && person.description.toLowerCase().includes(term))
    );
    setFiltered(results);
    setPage(1); // reset to first page when search changes
  }, [searchTerm, allFugitives]);

  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const handleNext = () => setPage(prev => Math.min(prev + 1, totalPages));
  const handlePrev = () => setPage(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center text-red-700">FBI Most Wanted</h1>

      <div className="max-w-xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search by name or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {isLoading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {paginated.length === 0 ? (
              <div className="text-center text-gray-600 col-span-full">No results found.</div>
            ) : (
              paginated.map(person => (
                <Link
                  key={person.uid}
                  to={`/details/${person.uid}`}
                  className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition block"
                >
                  <img
                    src={person.images[0]?.original || 'https://via.placeholder.com/150'}
                    alt={person.title}
                    className="h-48 w-full object-cover rounded"
                  />
                  <h2 className="mt-4 text-lg font-semibold">{person.title}</h2>
                  <p className="text-sm text-gray-700 line-clamp-3">{person.description}</p>
                  <span className="text-blue-600 inline-block mt-2">View Details →</span>
                </Link>
              ))
            )}
          </div>

          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-700 font-semibold">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={page >= totalPages}
              className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
