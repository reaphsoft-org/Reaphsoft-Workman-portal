// 09/05/2024 12:36
// reaphsoft-workman
// github.com/kahlflekzy

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