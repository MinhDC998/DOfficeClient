import {Button, Form, InputGroup, Spinner} from "@themesberg/react-bootstrap";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import comingDispatchActions from "../../../actions/comingDispatchActions";
import userActions from "../../../actions/userActions";
import {useHistory, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import moment from "moment";
import {AiOutlineDelete, TiDelete} from "react-icons/all";
import utils from "../../../utils";
import {JAVA_DATE_FORMAT} from "../../../constants/app";
import outGoingDispatchActions from "../../../actions/outGoingDispatchActions";

const EditOutGoingDispatch = () => {

    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [submiting, setSubmiting] = useState(false);
    const [ input, setInput ] = React.useState({
        documentNumber: '',
        receiveAddress: '',
        signBy: '',
        signDate: '',
        effectiveDate: '',
        documentTypeId: '',
        totalPage: '',
        securityLevel: '',
        urgencyLevel: '',
        expirationDate: '',
        releaseDate: '',
        storageLocationId: '',
        mainContent: '',
        attachments: [],
    });

    const [error, setError] = React.useState({})
    const dispatch = useDispatch();
    const history = useHistory();
    const attachmentsRef = useRef(null);

    const {documentTypes} = useSelector((state) => state.documentType);
    const {storageLocations} = useSelector((state) => state.storageLocation);
    const {releaseDepartments} = useSelector((state) => state.releaseDepartment);
    const {users} = useSelector((state) => state.user);
    const {editingComingDispatch} = useSelector(state => state.comingDispatch);

    useEffect(() => {
        setLoading(true);

        Promise.all([
            dispatch(outGoingDispatchActions.getEditingOutGoingDispatchById(id)),
            dispatch(comingDispatchActions.getAllDocumentType()),
            dispatch(comingDispatchActions.getAllStorageLocation()),
            dispatch(comingDispatchActions.getAllReleaseDepartment()),
            dispatch(userActions.getAllUser()),
        ])
            .then(async result => {
                const outGoingDispatch = result[0]?.outGoingDispatchResultNewDTO ?? {};
                const inputData = {
                    documentNumber: outGoingDispatch.documentNumber,
                    receiveAddress: outGoingDispatch.receiveAddress,
                    signBy: outGoingDispatch.signBy,
                    signDate: moment(outGoingDispatch.signDate, JAVA_DATE_FORMAT).format('YYYY-MM-DD'),
                    effectiveDate: moment(outGoingDispatch.effectiveDate, JAVA_DATE_FORMAT).format('YYYY-MM-DD'),
                    documentTypeId: outGoingDispatch.documentType?.id,
                    totalPage: outGoingDispatch.totalPage,
                    securityLevel: outGoingDispatch.securityLevel,
                    urgencyLevel: outGoingDispatch.urgencyLevel,
                    expirationDate: moment(outGoingDispatch.expirationDate, JAVA_DATE_FORMAT).format('YYYY-MM-DD'),
                    releaseDate: moment(outGoingDispatch.releaseDate, JAVA_DATE_FORMAT).format('YYYY-MM-DD'),
                    storageLocationId: outGoingDispatch.storageLocation?.id,
                    mainContent: outGoingDispatch.mainContent,
                };
                const attachmentEntities = result[0]?.attachments ?? [];
                const attachmentFiles = new DataTransfer();
                const attachments = await Promise.all(attachmentEntities.map((item) => utils.getFileFromUrl(item.url)));
                attachments.forEach((item) => {
                    attachmentFiles.items.add(item);
                });
                inputData.attachments = attachmentFiles.files;
                setInput(inputData);
                setLoading(false);

                setTimeout(() => {
                    attachmentsRef.current.files = attachmentFiles.files;
                });
            });
    }, []);

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name !== 'attachments') {
            setInput({ ...input, [name]: value });
        } else {
            setInput({ ...input, [name]: e.target.files });
        }
    }

    const processUrlAttachment = (url) => {
        return `http://localhost:8091/api/uploads/${url}`;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const errorData = {};
        let isValid = true;
        if (!input.documentNumber) {
            errorData.documentNumber = 'Không được để trống số văn bản';
            isValid = false;
        }
        if (!input.documentTypeId) {
            errorData.documentTypeId = 'Không được để trống loại văn bản';
            isValid = false;
        }
        if (!input.mainContent) {
            errorData.mainContent = 'Không được để trống nội dung';
            isValid = false;
        }
        if (input.attachments.length <= 0) {
            errorData.attachments = 'Không được để trống tệp đính kèm';
            isValid = false;
        }
        if (!isValid) {
            setError(errorData);
            toast.error("Vui lòng điền đầy đủ các trường thông tin", { autoClose: 3000, hideProgressBar : true });
            return;
        }
        setError({});

        // console.log("hatq-result-submit =>", input)

        // submit...
        setSubmiting(true);
        const formData = new FormData();
        Object.keys(input).forEach((key) => {
            console.log(input[key]);
            if (key === 'attachments') {
                for (let i = 0; i < input[key].length; i++) {
                    formData.append(`${key}[${i}]`, input[key][i]);
                }
            } else {
                formData.append(key, input[key]);
            }
        });
        dispatch(outGoingDispatchActions.updateDispatchByForm(id, formData))
            .then(() => {
                toast.success("Cập nhật văn bản đến thành công", { autoClose: 3000, hideProgressBar : true });
                history.push(`/out-going-dispatch/${id}`);
                setSubmiting(false);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Đã xảy ra lỗi. Vui lòng liên hệ quản trị viên để được hỗ trợ", { autoClose: 3000, hideProgressBar : true });
                setSubmiting(false);
            });
    }

    const back = () => {
        history.push(`/out-going-dispatch/${id}`);
    }

    const deleteFileItem = (index) => {
        console.log(input.attachments)
        console.log(index.index)
    }

    // console.log(1111111333, input.attachments)
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Form className="mt-4" onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Số văn bản</Form.Label>
                    <Form.Control
                        value={input.documentNumber}
                        type="text"
                        placeholder="Số văn bản"
                        name="documentNumber"
                        onChange={onChange}/>
                    {error.documentNumber && <span style={{color: 'red'}}>{error.documentNumber}</span>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Nơi nhận</Form.Label>
                    <Form.Control
                        value={input.receiveAddress}
                        type="text"
                        placeholder="Nơi nhận"
                        name="receiveAddress"
                        onChange={onChange}/>
                    {error.documentNumber && <span style={{color: 'red'}}>{error.receiveAddress}</span>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Người ký</Form.Label>
                    <Form.Control type="text" placeholder="Người ký" name="signBy" onChange={onChange} value={input.signBy}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Ngày ký</Form.Label>
                    <Form.Control type="date" placeholder="Ngày ký" name="signDate"
                                  onChange={onChange}
                                  value={ input.signDate }/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Ngày hiệu lực</Form.Label>
                    <Form.Control type="date" placeholder="Ngày hiệu lực" name="effectiveDate"
                                  onChange={onChange}
                                  value={ moment(input.effectiveDate).format('YYYY-MM-DD') }/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Loại văn bản</Form.Label>
                    <Form.Select name="documentTypeId" onChange={onChange} value={input.documentTypeId}>
                        <option>---Chọn loại văn bản---</option>
                        {documentTypes.map((v, i) => (<option key={i} value={v.id}>{v.typeName}</option>))}
                    </Form.Select>
                    {error.documentTypeId && <span style={{color: 'red'}}>{error.documentTypeId}</span>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Số trang</Form.Label>
                    <Form.Control type="text" placeholder="Số trang" name="totalPage" onChange={onChange} value={input.totalPage}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Mức độ bảo mật</Form.Label>
                    <Form.Select name="securityLevel" onChange={onChange} value={input.securityLevel}>
                        <option>---Mức độ bảo mật---</option>
                        <option value="1">Bình thường</option>
                        <option value="2">Cao</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Mức độ khẩn cấp</Form.Label>
                    <Form.Select name="urgencyLevel" onChange={onChange} value={input.urgencyLevel}>
                        <option>---Mức độ khẩn cấp---</option>
                        <option value="1">Bình thường</option>
                        <option value="2">Cao</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Ngày hết hiệu lực</Form.Label>
                    <Form.Control type="date" placeholder="Ngày hết hiệu lực" name="expirationDate" onChange={onChange}
                                  value={ moment(input.expirationDate).format('YYYY-MM-DD') }
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Ngày phát hành</Form.Label>
                    <Form.Control type="date" placeholder="Ngày phát hành" name="releaseDate" onChange={onChange}
                                  value={ moment(input.releaseDate).format('YYYY-MM-DD') }
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Vị trí lưu trữ</Form.Label>
                    <Form.Select name="storageLocationId" onChange={onChange} value={input.storageLocationId}>
                        <option>---Chọn vị trí lưu trữ---</option>
                        {storageLocations.map((v, i) => (<option key={i} value={v.id}> {v.locationName} </option>))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Trích yếu</Form.Label>
                    <Form.Control type="text" placeholder="Nhập nội dung" name="mainContent" onChange={onChange} value={input.mainContent}/>
                    {error.mainContent && <span style={{color: 'red'}}>{error.mainContent}</span>}
                </Form.Group>

                <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Control
                        type="file"
                        multiple
                        name="attachments"
                        onChange={onChange} ref={attachmentsRef} style={{ display: 'none' }}/>
                    <Button variant="secondary" className="addAttachmentBtn" type="button" onClick={() => attachmentsRef.current.click()}>
                        Thêm tệp đính kèm
                    </Button>
                    {error.attachments && <span style={{color: 'red'}}>{error.attachments}</span>}
                    <Form.Label className="listAttachmentLabel">Danh sách tệp đính kèm</Form.Label>
                    <ul>
                        {input.attachments &&
                        Array.from(input.attachments).map((item, index) => (

                                <div className="attachmentItem" key={index}>
                                    <li>
                                        <a href={processUrlAttachment(item.name)} target="_blank" rel="noopener noreferrer">
                                            {item.name}
                                        </a>
                                    </li>
                                    <div data-index={index} onClick={() => deleteFileItem({index})}>
                                        <AiOutlineDelete  className="deleteFileIcon" size={25}/>
                                    </div>
                                </div>

                        ))}
                    </ul>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100" disabled={submiting}>
                    {
                        submiting &&
                        <Spinner
                            animation="border"
                            role="status"
                            size="sm">
                        </Spinner>
                    }
                    Lưu lại
                </Button>

            </Form>
            <Button style={{marginTop: '10px'}} variant="light" className="w-100" onClick={back}>
                Quay lại
            </Button>
        </>
    );
}

export default EditOutGoingDispatch;