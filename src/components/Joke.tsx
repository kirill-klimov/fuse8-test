import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { formatDateStr } from "../helpers/utils";
import { JokeItem } from "../types/api-response";

interface IProps extends JokeItem {
  index: number;
}

export default function Joke(props: IProps) {

  const ref = useRef<null | HTMLDivElement>(null);
  const [shortenId, setShortenId] = useState(false);

  useEffect(() => {
    const callback = () => {
      if (!ref.current) return;
      const width = ref.current.offsetWidth;
      setShortenId(width < 410);
    }

    window.addEventListener('resize', callback);

    return () => {
      window.removeEventListener('resize', callback);
    };
  }, [])

  return (
    <div 
    ref={ref} 
    style={{ animationDelay: `${props.index * 0.028}s`}}
    className={`grow border joke ${props.value.length > 200 ? 'joke-big' : 'joke-small'}`}>
      <a href={props.url} target="_blank">
        <div className="joke-content">
          <p className={`text-lg word-wrap ${props.value.length > 200 ? 'mb-16' : 'mb-6'}`}>{props.value}</p>
          <div className={`flex flex-wrap lg:mb-2 mt-auto ${props.categories.length === 0 ? 'hidden' : 'flex'}`}>
            {
              props.categories.map((item, i) => {
                return (
                  <span
                  className="text-indigo-500 mr-1 font-medium" 
                  key={i + item}>#{item}</span>
                );
              })
            }
          </div>
          <div className="text-gray-500 text-sm lg:text-base font-mont flex justify-between gap-2">
            <span className="shrink-0">{shortenId ? props.id.slice(0, 7) + '...' : props.id}</span>
            <span className="shrink-0">{formatDateStr(props.updated_at)}</span>
          </div>
        </div>
      </a>
    </div>
  );
}