import React from 'react'
import s from './Pagination.module.scss'
// import ReactPaginate from "react-paginate";
import { useNavigate, useParams } from 'react-router-dom';

import Paginations from "react-js-pagination";

type PaginationProps = {
  postsLength: Number,
  navigatePath:String
}

const Pagination: React.FC<PaginationProps> = ({ postsLength, navigatePath }) => {
  const {page} = useParams()
  const navigate = useNavigate()

  const handlePageClick = (pageNumber:any) => {
    // const newOffset = ((pageNumber - 1) * 2) % Number(postsLength);
    navigate(`${navigatePath}/${pageNumber}`)
  };

  
  return (
    <>
      {/* <ReactPaginate
        pageCount={pageCount}
        onPageChange={handlePageClick}
        // pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        nextLabel="Туда >"
        previousLabel="< Сюда"
        containerClassName={s.pagination}
        pageLinkClassName={s.pagination__item}
        activeLinkClassName={s.pagination__item_selected}
        previousClassName={s.pagination__prev}
        nextClassName={s.pagination__next}
        // disabledClassName={s.pagination__dis}
        breakLinkClassName={s.pagination__break}
        previousLinkClassName={s.pagination__controlos}
        nextLinkClassName={s.pagination__controlos}
      /> */}
      <Paginations
        activePage={Number(page)}
        itemsCountPerPage={8}
        totalItemsCount={Number(postsLength)}
        pageRangeDisplayed={3}
        onChange={handlePageClick}
        prevPageText="< Сюда"
        nextPageText="Туда >"
        hideFirstLastPages={true}
        innerClass={s.pagination}
        linkClass={s.pagination__item}
        activeLinkClass={s.pagination__item_active}
        activeClass={s.pagination__item_selected}
        linkClassPrev={s.pagination__controlos}
        linkClassNext={s.pagination__controlos}
      />
    </>
  )
}

export default Pagination