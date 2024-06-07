// 07/05/2024 10:24
// reaphsoft-workman
// github.com/kahlflekzy

import {Button, Form, Image, InputGroup} from "react-bootstrap";
import default_profile_image from '../../components/i/145857007_307ce493-b254-4b2d-8ba4-d12c080d6651.jpg'
import React from "react";
import {BACKEND_DOMAIN} from "../../utils/konstants";

export function ImageComponent(selectedImage, user, setSelectedImage, setDisableSavePhoto, savePhoto, disableSavePhoto) {
    const imageWidth = 200;
    return <div className="text-center my-3">
        {
            selectedImage === null ?
                <>
                    <Image
                        width={imageWidth}
                        src={user.photoURL === '' ? default_profile_image : `${BACKEND_DOMAIN}/${user.photoURL}`}/>
                    <p className="mt-3">Current Photo: {user.photoURL === '' ? 'None' : user.photoURL}</p>
                </>
                :
                <>
                    <Image
                        width={imageWidth}
                        src={URL.createObjectURL(selectedImage)} alt="selected"/>
                    <p className="mt-3">Current Photo: {selectedImage.name}</p>
                </>
        }
        <InputGroup className="col-10 offset-1">
            <Form.Control type="file" accept="image/*" className="" style={{margin: '5px 0', paddingTop: '7.5px'}}
                          onChange={
                              (e) => {
                                  if (e.target.files[0]) {
                                      setSelectedImage(e.target.files[0]);
                                      setDisableSavePhoto(false);
                                  }
                              }
                          }/>
            <Button variant="outline-primary" onClick={savePhoto} disabled={disableSavePhoto}>Save</Button>
        </InputGroup>
    </div>;
}