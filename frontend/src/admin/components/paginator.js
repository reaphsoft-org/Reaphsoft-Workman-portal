// 07/05/2024 14:33
// reaphsoft-workman
// github.com/kahlflekzy

import {range} from "../../utils/range";
import React from "react";

export function Paginator({page, setPage, pages}) {
    return (
        <div className="card">
            <ul className="pagination pagination-primary my-3 justify-content-center">
                <li className={page > 1 ? "page-item" : `page-item disabled`}>
                    <button className='page-link' onClick={page <= 1 ? null : ()=> setPage(page - 1)}><i className="zmdi zmdi-arrow-left"></i></button></li>
                {
                   range(pages).map((item) =>
                        <li key={item} className={item === page ? "page-item active" : "page-item"}><button onClick={item === page ? null : ()=>{setPage(item)}} className="page-link">{item}</button></li>
                   )
                }
                <li className={page < pages ? "page-item" : `page-item disabled`}>
                    <button className="page-link"
                            onClick={ page < pages ? () => setPage(page + 1) : null}
                    >
                        <i className="zmdi zmdi-arrow-right"></i>
                    </button>
                </li>
            </ul>
        </div>
    );
}