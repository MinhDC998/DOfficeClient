// import {Button, Form, InputGroup, Spinner} from "@themesberg/react-bootstrap";
// import React, {useEffect, useState} from "react";
// import {useDispatch, useSelector} from "react-redux";
// import comingDispatchActions from "../../../actions/comingDispatchActions";
// import userActions from "../../../actions/userActions";
// import {useHistory} from "react-router-dom";
// import {toast} from "react-toastify";

// const AddComingDispatch = () => {

//     const [submiting, setSubmiting] = useState(false);

//     const [ input, setInput ] = React.useState({
//         documentNumber: '',
//         releaseDepartmentId: '',
//         signBy: '',
//         signDate: '',
//         arrivalDate: '',
//         documentTypeId: '',
//         totalPage: '',
//         securityLevel: '',
//         urgencyLevel: '',
//         effectiveDate: '',
//         expirationDate: '',
//         storageLocationId: '',
//         mainContent: '',
//         receiverId: '',
//         attachments: [],
//     });

//     const [error, setError] = React.useState({})

//     const dispatch = useDispatch();
//     const history = useHistory();

//     const {documentTypes} = useSelector((state) => state.documentType);
//     const {storageLocations} = useSelector((state) => state.storageLocation);
//     const {releaseDepartments} = useSelector((state) => state.releaseDepartment);
//     const {users} = useSelector((state) => state.user);

//     useEffect(() => {
//         dispatch(comingDispatchActions.getAllDocumentType());
//         dispatch(comingDispatchActions.getAllStorageLocation());
//         dispatch(comingDispatchActions.getAllReleaseDepartment());
//         dispatch(userActions.getAllUser());
//     }, []);

//     const onChange = (e) => {
//         const name = e.target.name;
//         const value = e.target.value;
//         console.log(name, '  ', value);

//         if (name !== 'attachments') {
//             setInput({ ...input, [name]: value });
//         } else {
//             setInput({ ...input, [name]: e.target.files });
//         }

//     }

//     const onSubmit = (e) => {
//         e.preventDefault();
//         // console.log(input);
//         const errorData = {};
//         let isValid = true;
//         if (!input.mainContent) {
//             errorData.mainContent = 'Khong duoc de trong noi dung';
//             isValid = false;
//         }

//         if (!isValid) {
//             setError(errorData);
//             toast.error("Loiiiiiii");
//             return;
//         }
//         setError({});
//         // submit...
//         setSubmiting(true);
//         const formData = new FormData();
//         Object.keys(input).forEach((key) => {
//             console.log(input[key]);
//             if (key === 'attachments') {
//                 for (let i = 0; i < input[key].length; i++) {
//                     formData.append(`${key}[${i}]`, input[key][i]);
//                 }
//             } else {
//                 formData.append(key, input[key]);
//             }
//         });
//         dispatch(comingDispatchActions.createDispatchByForm(formData))
//             .then(() => {
//                 toast.success("success");
//                 history.push("/coming-dispatch");
//                 setSubmiting(false);
//             })
//             .catch((err) => {
//                 console.log(err);
//                 toast.error("error");
//                 setSubmiting(false);
//             });
//     }

//     const back = () => {
//         // window.location.href = '/coming-dispatch';
//         history.push("/coming-dispatch");
//     }

//     return (
//         <>

//             <Form className="mt-4" onSubmit={onSubmit}>
//                 {submiting &&
//                 <div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,0.5)', position: 'absolute', top: 0, left: 0 }}>
//                     <span style={{ position: 'absolute', transform: 'translate(-50%,-50%)', left: '50%', top: '50%' }} >
//                         <Spinner animation="border" role="status">
//                             <span className="visually-hidden">Loading...</span>
//                         </Spinner>
//                     </span>
//                 </div>
//                 }
                
//                 <Form.Group className="mb-3">
//                     <Form.Label>Số văn bản</Form.Label>
//                     <Form.Control type="text" placeholder="Số văn bản" name="documentNumber" onChange={onChange}/>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                     <Form.Label>Nơi ban hành</Form.Label>
//                     <Form.Select name="releaseDepartmentId" onChange={onChange}>
//                         <option>---Chọn nơi ban hành---</option>
//                         {releaseDepartments.map((v, i) => (<option key={i} value={v.id}>{v.departmentName}</option>))}
//                     </Form.Select>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                     <Form.Label>Người ký</Form.Label>
//                     <Form.Control type="text" placeholder="Người ký" name="signBy" onChange={onChange}/>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                     <Form.Label>Ngày ký</Form.Label>
//                     <Form.Control type="date" placeholder="Ngày ký" name="signDate" onChange={onChange}/>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                     <Form.Label>Ngày đến</Form.Label>
//                     <Form.Control type="date" placeholder="Ngày đến" name="arrivalDate" onChange={onChange}/>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                     <Form.Label>Loại văn bản</Form.Label>
//                     <Form.Select name="documentTypeId" onChange={onChange}>
//                         <option>---Chọn loại văn bản---</option>
//                         {documentTypes.map((v, i) => (<option key={i} value={v.id}>{v.typeName}</option>))}
//                     </Form.Select>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                     <Form.Label>Số trang</Form.Label>
//                     <Form.Control type="text" placeholder="Số trang" name="totalPage" onChange={onChange}/>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                     <Form.Label>Mức độ bảo mật</Form.Label>
//                     <Form.Select name="securityLevel" onChange={onChange}>
//                         <option>---Mức độ bảo mật---</option>
//                         <option value="1">Bình thường</option>
//                         <option value="2">Cao</option>
//                     </Form.Select>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                     <Form.Label>Mức độ khẩn cấp</Form.Label>
//                     <Form.Select name="urgencyLevel" onChange={onChange}>
//                         <option>---Mức độ khẩn cấp---</option>
//                         <option value="1">Bình thường</option>
//                         <option value="2">Cao</option>
//                     </Form.Select>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                     <Form.Label>Ngày hiệu lực</Form.Label>
//                     <Form.Control type="date" placeholder="Ngày hiệu lực" name="effectiveDate" onChange={onChange}/>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                     <Form.Label>Ngày hết hiệu lực</Form.Label>
//                     <Form.Control type="date" placeholder="Ngày hết hiệu lực" name="expirationDate" onChange={onChange}/>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                     <Form.Label>Vị trí lưu trữ</Form.Label>
//                     <Form.Select name="storageLocationId" onChange={onChange}>
//                         <option>---Chọn vị trí lưu trữ---</option>
//                         {storageLocations.map((v, i) => (<option key={i} value={v.id}> {v.locationName} </option>))}
//                     </Form.Select>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                     <Form.Label>Trích yếu</Form.Label>
//                     <Form.Control type="text" placeholder="Nhập nội dung" name="mainContent" onChange={onChange}/>
//                     {error.mainContent && <span>{error.mainContent}</span>}
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                     <Form.Label>Người nhận</Form.Label>
//                     <Form.Select name="receiverId" onChange={onChange}>
//                         <option>---Chọn người nhận---</option>
//                         {users.map((v, i) => (<option key={i} value={v.userEntity.id}>{v.userEntity.fullName}</option>))}
//                     </Form.Select>
//                 </Form.Group>

//                 <Form.Group controlId="formFileMultiple" className="mb-3">
//                     <Form.Label>Tệp đính kèm</Form.Label>
//                     <Form.Control type="file" multiple name="attachments" onChange={onChange} />
//                 </Form.Group>

//                 <Button variant="primary" type="submit" className="w-100">
//                     Lưu lại
//                 </Button>

//             </Form>
//             <Button variant="primary" className="w-100" onClick={back}>
//                 Quay lại
//             </Button>
//         </>
//     );
// }

// export default AddComingDispatch;