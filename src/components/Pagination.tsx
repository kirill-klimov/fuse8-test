import ChevronRightSvg from '../assets/chevron-right.svg';
import ChevronLeftSvg from '../assets/chevron-left.svg';

interface IProps {
  pagesTotal: number;
  currentPage: number;
  onChange: (page: number) => void;
}

export default function Pagination(props: IProps) {
  const {pagesTotal, currentPage, onChange} = props

  const items = Array.from(new Array(pagesTotal).fill(null)).map((_, i) => {
    const page = i + 1
    const active = page === currentPage
    return (
      <div
      key={i}
      role="button"
      onClick={() => onChange(page)} 
      className={`w-8 h-8 grid place-items-center font-mont mr-1 hover:bg-neutral-200
      ${active ? 'border-indigo-500 text-white bg-indigo-500 hover:!bg-indigo-400' : ''}`}>{page}</div>
    )
  })

  function Dots() {
    return (
      <div role="button"
      className={`w-8 h-8 grid place-items-center rounded-full text-gray-500 mr-1`}>{`...`}</div>
    )
  }

  function handlePrev() {
    if (currentPage !== 1) onChange(currentPage - 1)
  }

  function handleNext() {
    if (currentPage < pagesTotal) onChange(currentPage + 1)
  }

  return (
    <div className='flex select-none'>
      <div
      role="button"
      onClick={handlePrev} 
      className={`w-8 h-8 grid place-items-center mr-1 hover:bg-neutral-200`}>
        <ChevronLeftSvg className="h-4 w-4 stroke-indigo-500 stroke-[2px]" />
      </div>
      {
          pagesTotal < 8 ?
          items
          :
          currentPage < 4 ?
          <>
          {
              items.map((item, i) => {
                  if (i < 5) return item
              })
          }
          <Dots />
          { items[pagesTotal-1] }
          </>
          : (pagesTotal - currentPage) < 4 ?
          <>
          { items[0] }
          <Dots />
          {
              items.map((item, i) => {
                  const last6 = pagesTotal - 6
                  if (i > last6) return item
              })
          }
          </>
          :
          <>
          { items[0] }
          <Dots />

          {items[currentPage-2]}
          {items[currentPage-1]}
          {items[currentPage]}

          <Dots />
          { items[pagesTotal-1] }
          </>
      }
      <div
      role="button"
      onClick={handleNext} 
      className={`w-8 h-8 grid place-items-center mr-1 hover:bg-neutral-200`}>
        <ChevronRightSvg className="h-4 w-4 stroke-indigo-500 stroke-[2px]" />
      </div>
    </div>
  )
}