// 07/05/2024 10:24
// reaphsoft-workman
// github.com/kahlflekzy

import {Button, Form, Image, InputGroup} from "react-bootstrap";
import fp29332702_7495554 from "./fp29332702_7495554.jpg";
import React from "react";
import {BACKEND_DOMAIN} from "../../utils/konstants";

export function ImageComponent(selectedImage, user, setSelectedImage, setDisableSavePhoto, savePhoto, disableSavePhoto) {
    return <div className="text-center my-3">
        {
            selectedImage === null ?
                <>
                    <Image
                        src={user.photoURL === '' ? fp29332702_7495554 : `${BACKEND_DOMAIN}/${user.photoURL}`}/>
                    <p className="mt-3">Current Photo: {user.photoURL === '' ? 'None' : user.photoURL}</p>
                </>
                :
                <>
                    <Image src={URL.createObjectURL(selectedImage)} alt="selected"/>
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