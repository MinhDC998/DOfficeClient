import React, {useState} from 'react';
import {Button, Form, Modal, Spinner} from '@themesberg/react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import comingDispatchActions from '../../../actions/comingDispatchActions';
import {toast} from 'react-toastify';
import outGoingDispatchActions from "../../../actions/outGoingDispatchActions";

const AddViewerToDispatchModal = (props) => {
	const dispatch = useDispatch();
	const [input, setInput] = useState({
		userId: '',
	});
	const [error, setError] = useState({
		userId: '',
	});
	const [submitting, setSubmitting] = useState(false);

	const { users } = useSelector(state => state.user);
	const { outGoingDispatchDetail } = useSelector(state => state.outGoingDispatch);

	const handleClose = () => {
		props.onClose();
	};

	const onChange = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const errorMsg = {
			userId: '',
		};
		let isValid = true;

		if (!input.userId) {
			isValid = false;
			errorMsg.userId = 'Không được để trống người theo dõi';
		}
		if (!isValid) {
			setError(errorMsg);
			return;
		}
		// submit
		setSubmitting(true);
		setError({
			userId: '',
		});
		const data = {
			...input,
			officialDispatchId: outGoingDispatchDetail?.outGoingDispatchResultNewDTO?.id,
		};

		dispatch(outGoingDispatchActions.addViewerToDispatch(data))
			.then(() => {
				dispatch(comingDispatchActions.getDispatchStream(data.officialDispatchId));
				dispatch(outGoingDispatchActions.getOutGoingDispatchById(data.officialDispatchId));
				setInput({
					userId: '',
				});
				setSubmitting(false);
				toast.success('Thêm người theo dõi thành công', { autoClose: 3000, hideProgressBar : true });
				props.onClose();
			})
			.catch(() => {
				setSubmitting(false);
				toast.error('Đã có lỗi xảy ra, vui lòng thử lại', { autoClose: 3000, hideProgressBar : true });
			});
	};

	return (
		<Modal show={props.show} onHide={handleClose}>
			<Form onSubmit={handleSubmit}>
				<Modal.Header closeButton>
					<Modal.Title>Thêm người theo dõi</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3">
						<Form.Label>Người theo dõi</Form.Label>
						<Form.Select
							name="userId"
							onChange={onChange}
							value={input.userId}
						>
							<option>---Chọn người theo dõi---</option>
							{
								users
									.map((v, i) => (<option key={i} value={v.userEntity.id}>{v.userEntity.fullName}</option>))
							}
						</Form.Select>
						{error.userId && <span style={{ color: 'red' }}>{error.userId}</span>}
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button type="button" variant="secondary" onClick={handleClose}>
						Hủy
					</Button>
					<Button type="submit" variant="primary" disabled={submitting}>
						{
							submitting &&
							<Spinner
								animation="border"
								role="status"
								size="sm">
							</Spinner>
						}
						Thêm
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

export default AddViewerToDispatchModal;