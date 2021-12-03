import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import { useNavigate } from 'react-router-dom';

import { Note } from '../models/Note';
import { groupBy } from '../services/utils';
import NoteMonth from './NoteMonth';

const NoteListing: React.FC = () => {
	const navigate = useNavigate();
	const [notes, setNotes] = useState<Note[]>([]);

	const onDelete = (noteId: number) =>
		setNotes(notes.filter((note) => note.id !== noteId));

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			navigate('/login');
		} else {
			axios
				.get<Note[]>('http://localhost:8000/me/notes', {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((resp) => setNotes(resp.data));
		}
	}, []);

	const noteByMonth = groupBy(notes, (note) => note.timestamp.substring(0, 7));
	const noteMonthElem = [];
	for (const [month, noteMonth] of noteByMonth) {
		noteMonthElem.push(
			<NoteMonth
				month={month}
				notes={noteMonth}
				key={month}
				onDelete={onDelete}
			/>
		);
	}
	return (
		<Container fluid="lg">
			<Stack className="my-3" direction="horizontal" gap={3}>
				<Button onClick={() => navigate('/edit')}>
					<span className="bi bi-plus" />
					New note
				</Button>
				<Button onClick={() => navigate('/search')}>Advanced search</Button>
				<Form className="ms-auto d-flex" action="/search">
					<Form.Control required placeholder="Search" name="query" />
					<Button className="bi bi-search" type="submit" />
				</Form>
			</Stack>
			{noteMonthElem}
		</Container>
	);
};

export default NoteListing;
