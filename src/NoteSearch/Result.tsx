import axios from 'axios';
import * as qs from 'qs';
import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import { useNavigate } from 'react-router-dom';

import NoteCard from '../components/NoteCard';
import { Note } from '../models/Note';

const Result: React.FC<{ searchParams: URLSearchParams }> = ({
	searchParams,
}) => {
	const navigate = useNavigate();
	const [notes, setNotes] = useState<Note[] | undefined>();
	const onDelete = (noteId: number) =>
		setNotes(notes?.filter((note) => note.id !== noteId));

	useEffect(() => {
		const params = {
			...Object.fromEntries(searchParams),
			tags: searchParams.getAll('tags'),
		};
		const token = localStorage.getItem('token');
		if (!token) {
			navigate('/login');
		} else {
			axios
				.get<Note[]>('http://localhost:8000/me/notes', {
					params: params,
					paramsSerializer: (params) =>
						qs.stringify(params, { arrayFormat: 'repeat' }),
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((resp) => setNotes(resp.data));
		}
	}, [navigate, searchParams]);

	return notes !== undefined ? (
		notes.length > 0 ? (
			<Container fluid="lg">
				<Row className="g-3" md={2}>
					{notes.map((note) => (
						<Col key={note.id}>
							<NoteCard {...note} onDelete={onDelete} />
						</Col>
					))}
				</Row>
			</Container>
		) : (
			<Stack className="justify-content-center align-items-center flex-fill">
				<h1>No note found</h1>
			</Stack>
		)
	) : (
		<></>
	);
};

export default Result;
