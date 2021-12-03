import './quill.css';
import 'react-quill/dist/quill.snow.css';

import axios from 'axios';
import React, { FormEventHandler, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom';

import Tags from '../components/Tags';
import { Note } from '../models/Note';

const NoteEditor: React.FC = () => {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [tags, setTags] = useState<string[]>([]);
	const navigate = useNavigate();
	const { noteId } = useParams();

	const handleSubmit: FormEventHandler = async (event) => {
		event.preventDefault();
		const token = localStorage.getItem('token');
		await axios.post(
			'http://localhost:8000/me/notes',
			{ title, body, tags },
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		navigate('/');
	};

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			navigate('/login');
		} else if (noteId !== undefined) {
			axios
				.get<Note>('http://localhost:8000/notes/' + noteId, {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((resp) => {
					const note = resp.data;
					setTitle(note.title);
					setBody(note.body);
					setTags(note.tags);
				});
		}
	}, [noteId]);

	return (
		<Container
			className="vstack justify-content-center align-items-center"
			fluid="lg"
		>
			<Form className="gap-3" onSubmit={handleSubmit}>
				<Form.Control
					className="my-3"
					as="input"
					placeholder="Title"
					style={{ maxWidth: '300px' }}
					onChange={(event) => setTitle(event.target.value)}
					value={title}
				/>

				<ReactQuill
					className="my-3"
					theme="snow"
					placeholder={'Body'}
					value={body}
					onChange={setBody}
					style={{ minWidth: '800px' }}
				/>

				<Tags tags={tags} onChange={setTags} />
				<Button className="my-3" type="submit">
					Save
				</Button>
			</Form>
		</Container>
	);
};

export default NoteEditor;
