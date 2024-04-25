import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return ( 

        <aside id="rightsidebar" className="right-sidebar">
            
            <div className="tab-content">
                <div className="tab-pane active" id="setting">
                    <div className="slim_scroll">
                        
                        
                        
                    </div>
                </div>
                <div className="tab-pane right_chat" id="chat">
                    <div className="slim_scroll">
                        <div className="card">
                            <ul className="list-unstyled">
                                
                               
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
     );
}
 
export default Sidebar;