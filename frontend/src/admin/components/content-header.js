// 07/05/2024 12:52
// reaphsoft-workman
// github.com/kahlflekzy

import React from "react";

export function ContentHeader({heading, current}) {
    return (
        <div className="block-header">
            <div className="row">
                <div className="col-lg-7 col-md-6 col-sm-12">
                    <h2 className="pb-3">{heading}</h2>
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/admin/">
                            <i className="zmdi zmdi-home me-2"></i>Reaphsoft Workman</a>
                        </li>
                        <li className="breadcrumb-item active">{current}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}