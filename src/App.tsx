import { useEffect, useRef, useState } from "react";
import Joke from "./components/Joke";
import { useQuery } from "react-query";
import { getCurrentRange, getJokes } from "./helpers/utils";
import Spinner from "./components/Spinner";
import Pagination from "./components/Pagination";
import XSvg from './assets/x.svg';

export default function App() {

  const [query, setQuery] = useState('');
  const { isLoading, data, isError } = useQuery({
    queryKey: ['jokes', query], 
    queryFn: getJokes,
  });

  const offset = 50;
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [query]);

  return (
    <div className="py-20 px-6">
      <div className="flex flex-col items-center mb-6">
        <div className="w-full max-w-lg pl-6 font-mont mb-2 h-[1rem]">
          {
            0 === query.length || query.length >= 3 ? <></> :
            <span className="text-sm text-indigo-500 h-[1rem] jump-in">At least 3 characters!</span>
          }
        </div>
        <div className="relative w-full max-w-lg">
          <input
          autoFocus={true}
          onChange={e => setQuery(e.target.value)}
          value={query}
          placeholder="Search jokes..."
          className="search-input mb-4" 
          type="text" />
          {
            query.length === 0 ? <></> :
            <div
            onClick={_ => setQuery('')} 
            className="p-1 absolute right-2 top-[15%] hover:bg-indigo-100 rounded-full cursor-pointer">
              <XSvg className='h-6 w-6 stroke-indigo-500' />
            </div>
          }
        </div>
        {
          isLoading || query.length === 0 || isError || query.length < 3 ? <></> :
          <div className="w-full max-w-lg">
            <p className=" pl-5 font-mont text-sm">
              Found jokes: {data?.total}
              { (data?.total || 0) < offset ? <></> : ` [${offset} per page]` }
            </p>
            { 
              (data?.total || 0) < offset ? <></> :
              <div className="flex justify-center mt-6">
                <Pagination 
                currentPage={page} 
                onChange={p => setPage(p)} 
                pagesTotal={Math.ceil((data?.total || offset) / offset)} />
              </div> 
            }
            {
              data?.result.length !== 0 || query.length < 3 ? <></> :
              <div className="w-full flex flex-col items-center my-20 gap-3">
                <img src="chuck.gif" alt="Chuck Norris" />
                <span className="font-mont">Try better!</span>
              </div> 
            }
          </div> 
        }
      </div>
      <div className="mx-auto w-full max-w-7xl flex flex-wrap gap-6">
        {
          isLoading || isError ? 
          <div className="w-full flex justify-center">
            { !isLoading ? <></> : <Spinner /> }
            { !isError ? <></> : <span>There was an error fetching jokes</span> }
          </div>
          :
          !data || data?.result?.length === 0 ? <></> :
          data?.result.slice(...getCurrentRange(page, offset))
          .map((item, i) => <Joke index={i} key={item.id} {...item} />)
        }
      </div>
    </div>
  );
}