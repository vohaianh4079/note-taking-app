import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import { useNavigate } from 'react-router-dom';

import { Note } from '../models/Note';

function makeDateString(dateString: string): string {
	return moment.utc(dateString).local().format('YYYY-MM-DD hh:mm:ss');
}

const NoteDelete: React.FC<{ id: number; onDelete: (noteId: number) => any }> =
	({ id, onDelete }) => {
		const [show, setShow] = useState(false);
		const handleDelete = async () => {
			axios
				.delete('http://localhost:8000/notes/' + id)
				.then(() => onDelete(id));
		};
		return (
			<>
				<Button
					variant="outline-danger"
					className="bi bi-trash-fill"
					onClick={() => setShow(true)}
				/>
				<Modal show={show} animation={false} centered>
					<Modal.Body>
						<p>Are you sure want to delete this note?</p>
						<Row>
							<Col className="d-flex justify-content-center">
								<Button variant="danger" onClick={handleDelete}>
									Yes, I{'\u2019'}m sure
								</Button>
							</Col>
							<Col className="d-flex justify-content-center">
								<Button variant="secondary" onClick={() => setShow(false)}>
									No
								</Button>
							</Col>
						</Row>
					</Modal.Body>
				</Modal>
			</>
		);
	};

const NoteCard: React.FC<Note & { onDelete: (noteId: number) => any }> = (
	props
) => {
	const navigate = useNavigate();
	return (
		<Card>
			<Stack as={Card.Header} gap={3} direction="horizontal">
				<Card.Title className="flex-fill">{props.title}</Card.Title>
				<span className="text-muted">{makeDateString(props.timestamp)}</span>
				<Button
					variant="outline-primary"
					onClick={() => navigate('/edit/' + props.id)}
					className="bi bi-pencil-fill"
				/>
				<NoteDelete {...props} onDelete={props.onDelete} />
			</Stack>
			<Card.Body>
				<Stack direction="horizontal" gap={3}>
					{props.tags.map((tag) => (
						<Button onClick={() => navigate('/search?tags=' + tag)}>
							{tag}
						</Button>
					))}
				</Stack>
				<div dangerouslySetInnerHTML={{ __html: props.body }} />
			</Card.Body>
		</Card>
	);
};

export default NoteCard;
