import React from "react";

const Skill = () => {
    return (  
        <section className="content">
            <div className="body_scroll">
                <div className="block-header">
                    <div className="row">
                        <div className="col-lg-7 col-md-6 col-sm-12">
                            <h2>Worker List</h2>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="">
                                    <i className="zmdi zmdi-home"></i> Reaphsoft Workman Portal</a>
                                </li>
                                <li className="breadcrumb-item">Registered Worker</li>
                                <li className="breadcrumb-item active">Worker List</li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row clearfix">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="table-responsive">
                                    <table className="table table-hover product_item_list c_table theme-color mb-0">
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Workman Name</th>
                                                <th data-breakpoints="sm xs">Address</th>
                                                <th data-breakpoints="xs">Skilled</th>
                                                <th data-breakpoints="sm xs md">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><img src="../adminAssets/images/ecommerce/1.png" width="48" alt="Product img"/></td>
                                                <td><h5>Foluke Foluke</h5></td>
                                                <td><span className="text-muted">No 17, Estate Street, Poly Road</span></td>
                                                <td>Painter</td>
                                                <td>
                                                    <a href="javascript:void(0);" className="btn btn-default waves-effect waves-float btn-sm waves-green"><i className="zmdi zmdi-edit"></i></a>
                                                    <a href="javascript:void(0);" className="btn btn-default waves-effect waves-float btn-sm waves-red"><i className="zmdi zmdi-delete"></i></a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><img src="../adminAssets/images/ecommerce/1.png" width="48" alt="Product img" /></td>
                                                <td><h5>Foluke Foluke</h5></td>
                                                <td><span className="text-muted">No 17, Estate Street, Poly Road</span></td>
                                                <td>Painter</td>
                                                <td>
                                                    <a href="javascript:void(0);" className="btn btn-default waves-effect waves-float btn-sm waves-green"><i className="zmdi zmdi-edit"></i></a>
                                                    <a href="javascript:void(0);" className="btn btn-default waves-effect waves-float btn-sm waves-red"><i className="zmdi zmdi-delete"></i></a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><img src="../adminAssets/images/ecommerce/1.png" width="48" alt="Product img" /></td>
                                                <td><h5>Foluke Foluke</h5></td>
                                                <td><span className="text-muted">No 17, Estate Street, Poly Road</span></td>
                                                <td>Painter</td>
                                                <td>
                                                    <a href="javascript:void(0);" className="btn btn-default waves-effect waves-float btn-sm waves-green"><i className="zmdi zmdi-edit"></i></a>
                                                    <a href="javascript:void(0);" className="btn btn-default waves-effect waves-float btn-sm waves-red"><i className="zmdi zmdi-delete"></i></a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><img src="../adminAssets/images/ecommerce/1.png" width="48" alt="Product img" /></td>
                                                <td><h5>Foluke Foluke</h5></td>
                                                <td><span className="text-muted">No 17, Estate Street, Poly Road</span></td>
                                                <td>Painter</td>
                                                <td>
                                                    <a href="javascript:void(0);" className="btn btn-default waves-effect waves-float btn-sm waves-green"><i className="zmdi zmdi-edit"></i></a>
                                                    <a href="javascript:void(0);" className="btn btn-default waves-effect waves-float btn-sm waves-red"><i className="zmdi zmdi-delete"></i></a>
                                                </td>
                                            </tr>
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="card">
                                <div className="body">
                                    <ul className="pagination pagination-primary m-b-0">
                                        <li className="page-item"><a className="page-link" href="javascript:void(0);"><i className="zmdi zmdi-arrow-left"></i></a></li>
                                        <li className="page-item active"><a className="page-link" href="javascript:void(0);">1</a></li>
                                        <li className="page-item"><a className="page-link" href="javascript:void(0);">2</a></li>
                                        <li className="page-item"><a className="page-link" href="javascript:void(0);">3</a></li>
                                        <li className="page-item"><a className="page-link" href="javascript:void(0);">4</a></li>
                                        <li className="page-item"><a className="page-link" href="javascript:void(0);"><i className="zmdi zmdi-arrow-right"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default Skill;