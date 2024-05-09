// 09/05/2024 12:36
// reaphsoft-workman
// github.com/kahlflekzy

import {showAlert} from "../../utils/alert";

export function deleteModel(resolve, link, token, itemIndex = 0, modelData = null, setModelData= null) {
        fetch(link,{
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then(res => {
                if (!res.ok){
                    resolve({ status: false, resp: `Error while deleting User.\n${res.statusText}` });
                }
                return res.json();
            }
        ).then(data => {
            resolve(data);
            if (data.status && setModelData !== null){
                const data0 = modelData.data;
                data0.splice(itemIndex, 1);
                setModelData({pages: modelData.pages, data: data0});
            }
        }).catch(reason => {
            resolve({ status: false, resp: reason.message });
        })
}

export function savePhoto(token, code, email, selectedImage, disableFunction) {
    disableFunction(true);
    const postData = new FormData();
    postData.append("photo", selectedImage);
    fetch(`http://localhost:3001/admin/change/photo/${code}/${email}/`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
        body: postData,
    }).then( r => {
        if (!r.ok){
            showAlert(3, `Error while making request, please contact the system administrators. ${r.statusText}`, 'Error');
            return;
        }
        return r.json();
    }).then(value => {
        if (!value.status){
            showAlert(3, value.resp, 'Error');
            disableFunction(false);
        }else {
            showAlert(1, 'Changed photo successfully', 'Success');
        }
    }).catch(reason => {
        showAlert(3, reason.message, 'Error');
        disableFunction(false);
    });
}